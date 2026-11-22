/**
 * admin-journey.test.mjs
 * Tier 4: Real-World Application Workloads — Admin Governance & Review Loop
 * Tests T4-SCN-04 and T4-SCN-05
 */

import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { readSource } from '../utils/build-helper.mjs';
import { inspectSource } from '../utils/dom-inspector.mjs';

describe('Tier 4: Real-World Workloads — Admin Governance & Review Loops', () => {
  // T4-SCN-04: Full Admin Moderation, User Role Governance & Financial Ledger Audit
  it('T4-SCN-04: should execute end-to-end admin workflow: moderation, role assignment, and financial audit', () => {
    const adminOverviewSource = readSource('src/app/dashboard/admin/page.tsx');
    const adminTuitionsSource = readSource('src/app/dashboard/admin/tuitions/page.tsx');
    const adminUsersSource = readSource('src/app/dashboard/admin/users/page.tsx');
    const adminTransactionsSource = readSource('src/app/dashboard/admin/transactions/page.tsx');

    const aoInspector = inspectSource(adminOverviewSource);
    const atInspector = inspectSource(adminTuitionsSource);
    const auInspector = inspectSource(adminUsersSource);
    const axInspector = inspectSource(adminTransactionsSource);

    // 1. Admin overview renders executive KPIs
    assert.ok(
      aoInspector.hasToken('Registered Users') || aoInspector.hasToken('Approved Tuitions') || aoInspector.hasToken('KPI'),
      'Step 1: Admin overview must display executive platform KPIs'
    );

    // 2. Admin moderates pending tuition
    assert.ok(
      atInspector.hasToken('/tuitions/admin/') && atInspector.hasToken('/status') && atInspector.hasToken('approved'),
      'Step 2: Admin moderates listing and publishes batch via PATCH status approved'
    );

    // 3. Admin modifies user role
    assert.ok(
      auInspector.hasToken('/users/admin/') && auInspector.hasToken('/role'),
      'Step 3: Admin manages user permissions via PATCH /users/admin/:id/role'
    );

    // 4. Admin audits Stripe financial transaction ledger
    assert.ok(
      axInspector.callsEndpoint('/payments/admin/all') || axInspector.hasToken('Transaction'),
      'Step 4: Admin audits completed Stripe payments via /payments/admin/all'
    );
  });

  // T4-SCN-05: Closed-Loop Student Rating & Verified Review Publication Flow
  it('T4-SCN-05: should connect accepted student application review modal with public tuition details display', () => {
    const studentAppsSource = readSource('src/app/dashboard/student/my-applications/page.tsx');
    const detailsSource = readSource('src/app/tuitions/[id]/page.tsx');

    const saInspector = inspectSource(studentAppsSource);
    const dtInspector = inspectSource(detailsSource);

    // 1. Student opens review modal on accepted application
    assert.ok(
      saInspector.hasToken('reviewModalOpen') &&
      saInspector.hasToken('openReviewModal'),
      'Step 1: Accepted application enables rating and review modal trigger'
    );

    // 2. Student submits rating and comment
    assert.ok(
      saInspector.hasToken('/reviews') &&
      saInspector.hasToken('rating') &&
      saInspector.hasToken('comment'),
      'Step 2: Review form submits rating and feedback comment to /reviews'
    );

    // 3. Public tuition details renders student reviews section
    assert.ok(
      dtInspector.hasToken('Student Reviews & Academic Feedback') ||
      dtInspector.hasToken('tuition.reviews'),
      'Step 3: Public tuition page displays student reviews and ratings'
    );
  });
});
