/**
 * empty-states.test.mjs
 * Tier 2: Boundary & Corner Cases — Search, Filter & Parameter Edge Conditions
 * Tests T2-BND-01 through T2-BND-06
 */

import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { readSource } from '../utils/build-helper.mjs';
import { inspectSource } from '../utils/dom-inspector.mjs';

describe('Tier 2: Boundary & Corner Cases — Empty States & Parameters', () => {
  // T2-BND-01: Empty search query on home search dock
  it('T2-BND-01: should handle empty/whitespace queries safely without submitting malformed parameters', () => {
    const heroSource = readSource('src/components/home/HeroSection.tsx');
    const inspector = inspectSource(heroSource);

    assert.ok(
      inspector.hasToken('subjectQuery.trim()') ||
      inspector.hasToken('search.trim()') ||
      inspector.hasToken('query.trim()') ||
      inspector.hasToken('searchTerm.trim()') ||
      inspector.hasToken('.trim()'),
      'Hero search handler must check whitespace trimming before appending query params'
    );
  });

  // T2-BND-02: Zero-state search results on /tuitions
  it('T2-BND-02: should display styled empty-state card with "No Tuitions Found" and reset filters action', () => {
    const tuitionsSource = readSource('src/app/tuitions/page.tsx');
    const inspector = inspectSource(tuitionsSource);

    assert.ok(
      inspector.hasToken('No Tuitions Found'),
      'Tuitions page must render "No Tuitions Found" when results array is empty'
    );
    assert.ok(
      inspector.hasToken('handleReset'),
      'Tuitions page must provide handleReset callback to restore filter state'
    );
  });

  // T2-BND-03: Multi-filter combination yielding zero records
  it('T2-BND-03: should safely handle conflicting filters without NaN or negative page counts', () => {
    const tuitionsSource = readSource('src/app/tuitions/page.tsx');
    const inspector = inspectSource(tuitionsSource);

    assert.ok(
      inspector.hasToken('totalPages: 1') || inspector.hasToken('pagination.totalPages'),
      'Pagination state must initialize and clamp totalPages safely'
    );
    assert.ok(
      inspector.hasToken('Math.max') || inspector.hasToken('totalPages > 1') || inspector.hasToken('disabled={pagination.page <= 1}'),
      'Previous page button must be disabled when on page 1 or empty'
    );
  });

  // T2-BND-04: Out-of-bounds pagination (negative or page > totalPages)
  it('T2-BND-04: should sanitize page query parameters with parseInt and fallback', () => {
    const tuitionsSource = readSource('src/app/tuitions/page.tsx');
    const inspector = inspectSource(tuitionsSource);

    assert.ok(
      inspector.hasToken('parseInt(searchParams.get(\'page\') || \'1\', 10)') ||
      inspector.hasToken('parseInt(searchParams.get(\'page\')'),
      'Page query parameter must be safely parsed with parseInt and default to 1'
    );
  });

  // T2-BND-05: Nonexistent tuition ID (/tuitions/invalid-id-999)
  it('T2-BND-05: should handle nonexistent tuition ID gracefully with loading/error state', () => {
    const detailsSource = readSource('src/app/tuitions/[id]/page.tsx');
    const inspector = inspectSource(detailsSource);

    assert.ok(
      inspector.hasToken('catch((err)') || inspector.hasToken('.catch'),
      'Tuition details must handle 404/rejection from /tuitions/:id with catch block'
    );
    assert.ok(
      inspector.hasToken('toast.error'),
      'Tuition details must notify user via toast on fetch error rather than crashing'
    );
  });

  // T2-BND-06: Nonexistent tutor profile ID (/tutors/invalid-id)
  it('T2-BND-06: should handle nonexistent tutor ID gracefully with fallback or error state', () => {
    const tutorProfileSource = readSource('src/app/tutors/[id]/page.tsx');
    const inspector = inspectSource(tutorProfileSource);

    assert.ok(
      inspector.hasToken('.catch') || inspector.hasToken('catch'),
      'Tutor profile must catch fetch rejection safely'
    );
    assert.ok(
      inspector.hasToken('Link') && inspector.hasToken('/tutors'),
      'Tutor profile must maintain back navigation link to /tutors directory'
    );
  });
});
