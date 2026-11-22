/**
 * role-session.test.mjs
 * Tier 3: Cross-Feature Combinations — Tri-Role Sessions, Deep Links & Profile Sync
 * Tests T3-CRX-03, T3-CRX-04, and T3-CRX-08
 */

import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { readSource } from '../utils/build-helper.mjs';
import { inspectSource } from '../utils/dom-inspector.mjs';

describe('Tier 3: Cross-Feature Combinations — Role Sessions & State Sync', () => {
  // T3-CRX-03: Tri-Role Session Switching & Layout Adaptation
  it('T3-CRX-03: should adapt Navbar and Dashboard layout dynamically based on authenticated role', () => {
    const navbarSource = readSource('src/components/common/Navbar.tsx');
    const layoutSource = readSource('src/app/dashboard/layout.tsx');
    const authSource = readSource('src/context/AuthContext.tsx');

    const nInspector = inspectSource(navbarSource);
    const lInspector = inspectSource(layoutSource);
    const aInspector = inspectSource(authSource);

    // Navbar routes dynamically according to role
    assert.ok(
      nInspector.hasToken('getDashboardLink') &&
      nInspector.hasToken('/dashboard/admin') &&
      nInspector.hasToken('/dashboard/tutor') &&
      nInspector.hasToken('/dashboard/student'),
      'Navbar must resolve dashboard entry point dynamically according to role'
    );

    // Dashboard layout configures role-specific navigation
    assert.ok(
      lInspector.hasToken('user.role === \'admin\'') &&
      lInspector.hasToken('user.role === \'tutor\'') &&
      lInspector.hasToken('user.role === \'student\''),
      'Dashboard layout must adapt navigation items for each role'
    );

    // Logout clears credentials cleanly
    assert.ok(
      aInspector.hasToken('localStorage.removeItem(\'mentorlagbe_token\')') &&
      aInspector.hasToken('localStorage.removeItem(\'mentorlagbe_user\')'),
      'AuthContext logout must clean up session state from localStorage'
    );
  });

  // T3-CRX-04: Deep-Linked Protected Route + Post-Login Redirect
  it('T3-CRX-04: should support deep-link destination redirection upon sign-in', () => {
    const signInSource = readSource('src/app/sign-in/page.tsx');
    const inspector = inspectSource(signInSource);

    assert.ok(
      inspector.hasToken('useRouter') || inspector.hasImport('next/navigation', 'useRouter'),
      'Sign-in page must consume useRouter to navigate post-login'
    );
    assert.ok(
      inspector.hasToken('router.push') || inspector.hasToken('router.replace'),
      'Sign-in page must redirect authenticated user to role or deep-linked portal'
    );
  });

  // T3-CRX-08: Profile Update + Global Header & Avatar Sync
  it('T3-CRX-08: should synchronize profile mutations with AuthContext and local user state', () => {
    const profileSource = readSource('src/app/dashboard/profile/page.tsx');
    const authSource = readSource('src/context/AuthContext.tsx');

    const pInspector = inspectSource(profileSource);
    const aInspector = inspectSource(authSource);

    assert.ok(
      pInspector.hasToken('updateLocalUser') && pInspector.callsEndpoint('/auth/profile'),
      'Profile settings must invoke updateLocalUser after successful PATCH /auth/profile'
    );
    assert.ok(
      aInspector.hasToken('updateLocalUser') && aInspector.hasToken('localStorage.setItem(\'mentorlagbe_user\''),
      'AuthContext updateLocalUser must update in-memory state and localStorage'
    );
  });
});
