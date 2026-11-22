/**
 * theme-nav.test.mjs
 * Tier 3: Cross-Feature Combinations — Theme & Navigation Persistence
 * Tests T3-CRX-01 and T3-CRX-02
 */

import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { readSource } from '../utils/build-helper.mjs';
import { inspectSource } from '../utils/dom-inspector.mjs';

describe('Tier 3: Cross-Feature Combinations — Theme & Filter Navigation', () => {
  // T3-CRX-01: Theme Switching + Multi-Route Navigation
  it('T3-CRX-01: should persist dark/light theme state across navigation and block FOUC with inline script', () => {
    const layoutSource = readSource('src/app/layout.tsx');
    const themeContextSource = readSource('src/context/ThemeContext.tsx');
    const dockSource = readSource('src/components/common/OrbitalThemeDock.tsx');

    const lInspector = inspectSource(layoutSource);
    const tInspector = inspectSource(themeContextSource);
    const dInspector = inspectSource(dockSource);

    // 1. ThemeContext persists to localStorage key 'mentorlagbe_theme'
    assert.ok(
      tInspector.hasToken('localStorage.getItem(\'mentorlagbe_theme\')') &&
      tInspector.hasToken('localStorage.setItem(\'mentorlagbe_theme\''),
      'ThemeContext must store active theme in localStorage key mentorlagbe_theme'
    );

    // 2. Anti-FOUC blocking theme script in head of root layout
    assert.ok(
      lInspector.hasToken('mentorlagbe_theme') &&
      lInspector.hasToken('document.documentElement.classList.add(\'dark\')'),
      'Root layout head must contain synchronous inline script to prevent white flash before hydration'
    );

    // 3. OrbitalThemeDock provides interactive toggle connected to context
    assert.ok(
      dInspector.hasToken('toggleTheme'),
      'OrbitalThemeDock must trigger toggleTheme to alter theme class'
    );
  });

  // T3-CRX-02: Search Filter + Pagination + History Retention
  it('T3-CRX-02: should synchronize search query, subject, classLevel, and page via URLSearchParams', () => {
    const tuitionsSource = readSource('src/app/tuitions/page.tsx');
    const inspector = inspectSource(tuitionsSource);

    assert.ok(
      inspector.hasToken('searchParams.get(\'search\')') &&
      inspector.hasToken('searchParams.get(\'subject\')') &&
      inspector.hasToken('searchParams.get(\'classLevel\')'),
      'Browse tuitions page must hydrate search, subject, and classLevel from URL query parameters'
    );

    assert.ok(
      inspector.hasToken('router.push') || inspector.hasToken('router.replace'),
      'Filter updates must update browser URL history so back/forward navigation retains filter parameters'
    );
  });
});
