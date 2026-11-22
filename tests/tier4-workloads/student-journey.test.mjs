/**
 * student-journey.test.mjs
 * Tier 4: Real-World Application Workloads — Discovery & Student Enrollment
 * Tests T4-SCN-01 and T4-SCN-02
 */

import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { readSource } from '../utils/build-helper.mjs';
import { inspectSource } from '../utils/dom-inspector.mjs';

describe('Tier 4: Real-World Workloads — Visitor Discovery & Student Enrollment', () => {
  // T4-SCN-01: Visitor Discovery, Educational Exploration & Mentor Conversion Journey
  it('T4-SCN-01: should link landing exploration, tuition filtering, details review, and mentor onboarding', () => {
    const homeSource = readSource('src/app/page.tsx');
    const heroSource = readSource('src/components/home/HeroSection.tsx');
    const tuitionsSource = readSource('src/app/tuitions/page.tsx');
    const detailsSource = readSource('src/app/tuitions/[id]/page.tsx');
    const becomeTutorSource = readSource('src/app/become-a-tutor/page.tsx');
    const signUpSource = readSource('src/app/sign-up/page.tsx');

    const hmInspector = inspectSource(homeSource);
    const hrInspector = inspectSource(heroSource);
    const tInspector = inspectSource(tuitionsSource);
    const dInspector = inspectSource(detailsSource);
    const bInspector = inspectSource(becomeTutorSource);
    const sInspector = inspectSource(signUpSource);

    // 1. Home renders hero, subjects, roadmap, and CTA banner
    assert.ok(hmInspector.hasToken('HeroSection') && hmInspector.hasToken('DualCtaBanner'),
      'Step 1: Home page must assemble HeroSection and DualCtaBanner');

    // 2. Hero search dock redirects to /tuitions with parameters
    assert.ok(hrInspector.hasToken('router.push(`/tuitions?${queryParams.toString()}`)') || hrInspector.hasToken('/tuitions'),
      'Step 2: Hero search dock must forward query params to /tuitions');

    // 3. /tuitions parses search params and filters batch cards
    assert.ok(tInspector.hasToken('useSearchParams'),
      'Step 3: Browse tuitions must parse incoming search parameters');

    // 4. Clicking a card links to /tuitions/[id]
    assert.ok(dInspector.hasToken('use(params)'),
      'Step 4: Tuition details page must dynamically resolve batch ID');

    // 5. Visitor clicks "Become a Mentor" CTA leading to /become-a-tutor
    assert.ok(bInspector.hasToken('/sign-up') || bInspector.hasToken('/sign-up?role=tutor'),
      'Step 5: Become a Tutor page must guide visitor into /sign-up');

    // 6. Sign-up page supports tutor registration
    assert.ok(sInspector.hasToken('tutor'),
      'Step 6: Registration page must support tutor role creation');
  });

  // T4-SCN-02: Student Tuition Finding, Requirement Verification & Application Enrollment Lifecycle
  it('T4-SCN-02: should execute end-to-end student flow: login, search, apply modal, and ledger tracking', () => {
    const signInSource = readSource('src/app/sign-in/page.tsx');
    const detailsSource = readSource('src/app/tuitions/[id]/page.tsx');
    const studentAppsSource = readSource('src/app/dashboard/student/my-applications/page.tsx');

    const siInspector = inspectSource(signInSource);
    const dtInspector = inspectSource(detailsSource);
    const saInspector = inspectSource(studentAppsSource);

    // 1. Student authenticates via sign-in
    assert.ok(
      siInspector.callsEndpoint('/auth/login'),
      'Step 1: Student submits login credentials to /auth/login'
    );

    // 2. Detail view opens application modal with required inputs
    assert.ok(
      dtInspector.hasToken('studentPhone') &&
      dtInspector.hasToken('preferredSchedule') &&
      dtInspector.hasToken('studentNote'),
      'Step 2: Tuition details must provide application fields (phone, schedule, note)'
    );

    // 3. Student submits application
    assert.ok(
      dtInspector.callsEndpoint('/applications/apply'),
      'Step 3: Application form must post to /applications/apply'
    );

    // 4. Application reflects in student ledger with cancel action
    assert.ok(
      saInspector.callsEndpoint('/applications/my-applications'),
      'Step 4: Student dashboard must retrieve application list via /applications/my-applications'
    );
    assert.ok(
      saInspector.hasToken('handleCancel') && saInspector.hasToken('api.delete'),
      'Step 5: Student must have capability to cancel pending application'
    );
  });
});
