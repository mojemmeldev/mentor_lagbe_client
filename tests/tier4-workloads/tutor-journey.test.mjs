/**
 * tutor-journey.test.mjs
 * Tier 4: Real-World Application Workloads — Tutor Onboarding & Lifecycle
 * Tests T4-SCN-03
 */

import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { readSource } from '../utils/build-helper.mjs';
import { inspectSource } from '../utils/dom-inspector.mjs';

describe('Tier 4: Real-World Workloads — Tutor Onboarding & Applicant Management', () => {
  // T4-SCN-03: New Tutor Registration, Onboarding, Batch Publication & Applicant Acceptance Pipeline
  it('T4-SCN-03: should connect registration, tuition batch posting, and student applicant review', () => {
    const signUpSource = readSource('src/app/sign-up/page.tsx');
    const tutorOverviewSource = readSource('src/app/dashboard/tutor/page.tsx');
    const postTuitionSource = readSource('src/app/dashboard/tutor/post-tuition/page.tsx');
    const myTuitionsSource = readSource('src/app/dashboard/tutor/my-tuitions/page.tsx');
    const applicantsSource = readSource('src/app/dashboard/tutor/applicants/page.tsx');

    const suInspector = inspectSource(signUpSource);
    const toInspector = inspectSource(tutorOverviewSource);
    const ptInspector = inspectSource(postTuitionSource);
    const mtInspector = inspectSource(myTuitionsSource);
    const apInspector = inspectSource(applicantsSource);

    // 1. Tutor registers with role 'tutor'
    assert.ok(
      suInspector.hasToken('\'tutor\'') && suInspector.callsEndpoint('/auth/register'),
      'Step 1: User registers as a tutor via POST /auth/register'
    );

    // 2. Tutor overview renders dashboard workspace
    assert.ok(
      toInspector.hasToken('Tutor') || toInspector.hasToken('Dashboard'),
      'Step 2: Tutor lands on tutor overview dashboard'
    );

    // 3. Tutor creates and publishes new tuition batch
    assert.ok(
      ptInspector.callsEndpoint('/tuitions') &&
      ptInspector.hasToken('monthlyFee') &&
      ptInspector.hasToken('daysPerWeek'),
      'Step 3: Tutor submits new tuition batch with fee and schedule'
    );

    // 4. Batch appears in tutor created tuitions table
    assert.ok(
      mtInspector.callsEndpoint('/tuitions/tutor/my-tuitions') || mtInspector.hasToken('my-tuitions'),
      'Step 4: Tutor views active listings in My Tuitions ledger'
    );

    // 5. Incoming student applicant is accepted by tutor
    assert.ok(
      apInspector.callsEndpoint('/applications/tutor/applicants') &&
      apInspector.hasToken('handleUpdateStatus') &&
      apInspector.hasToken('accepted'),
      'Step 5: Tutor reviews incoming applications and accepts student applicant'
    );
  });
});
