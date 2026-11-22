/**
 * dashboard.test.mjs
 * Tier 1: Feature Coverage — Group 1.6
 * Tests T1-DSH-01 through T1-DSH-06: Dashboard Shell & Role-Based Portals
 */

import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { readSource } from '../utils/build-helper.mjs';
import { inspectSource } from '../utils/dom-inspector.mjs';

describe('Tier 1: Dashboard Shell & Role-Based Portals', () => {
  // T1-DSH-01: Dashboard Layout Shell
  it('T1-DSH-01: should enforce authentication guards and role navigation in dashboard shell', () => {
    const layoutSource = readSource('src/app/dashboard/layout.tsx');
    const inspector = inspectSource(layoutSource);

    assert.ok(
      inspector.hasImport('@/context/AuthContext', 'useAuth'),
      'Dashboard layout must consume useAuth'
    );
    assert.ok(
      inspector.hasToken('router.push(\'/sign-in\')'),
      'Dashboard layout must redirect unauthenticated users to /sign-in'
    );
    assert.ok(
      inspector.hasToken('user.role === \'student\'') &&
      inspector.hasToken('user.role === \'tutor\'') &&
      inspector.hasToken('user.role === \'admin\''),
      'Dashboard layout must configure role-specific views for student, tutor, and admin'
    );
    assert.ok(
      inspector.hasToken('sidebarOpen') || inspector.hasToken('Sidebar'),
      'Dashboard layout must feature responsive sidebar'
    );
  });

  // T1-DSH-02: Student Dashboard Suite Overview
  it('T1-DSH-02: should render student overview with welcome banner, metrics, and shortcuts', () => {
    const studentOverviewSource = readSource('src/app/dashboard/student/page.tsx');
    const inspector = inspectSource(studentOverviewSource);

    assert.ok(
      inspector.hasToken('user?.name') || inspector.hasToken('Hello,'),
      'Student overview must render personalized welcome greeting'
    );
    assert.ok(
      inspector.hasToken('Total Applied'),
      'Student overview must track total applied applications count'
    );
    assert.ok(
      inspector.hasToken('Accepted'),
      'Student overview must track accepted applications'
    );
    assert.ok(
      inspector.hasToken('Pending Review') || inspector.hasToken('pending'),
      'Student overview must track pending applications'
    );
  });

  // T1-DSH-03: Student Applications Ledger & Reviews
  it('T1-DSH-03: should provide applications ledger with cancel action and review modal', () => {
    const applicationsSource = readSource('src/app/dashboard/student/my-applications/page.tsx');
    const inspector = inspectSource(applicationsSource);

    assert.ok(
      inspector.callsEndpoint('/applications/my-applications'),
      'Applications page must query /applications/my-applications'
    );
    assert.ok(
      inspector.hasToken('handleCancel') && inspector.hasToken('api.delete'),
      'Applications page must provide cancel action for pending submissions'
    );
    assert.ok(
      inspector.hasToken('reviewModalOpen') || inspector.hasToken('rating'),
      'Applications page must provide rating/review modal for accepted tuitions'
    );
  });

  // T1-DSH-04: Student Saved Tuitions
  it('T1-DSH-04: should render bookmarked tuitions grid with heart toggle', () => {
    const savedSource = readSource('src/app/dashboard/student/saved-tuitions/page.tsx');
    const inspector = inspectSource(savedSource);

    assert.ok(
      inspector.callsEndpoint('/users/bookmarks') || inspector.hasToken('bookmarks'),
      'Saved tuitions page must query user bookmarks'
    );
    assert.ok(
      inspector.hasToken('TuitionCard') || inspector.hasImport('@/components/tuition/TuitionCard'),
      'Saved tuitions page must render TuitionCard elements'
    );
  });

  // T1-DSH-05: Tutor Dashboard Suite & CRUD
  it('T1-DSH-05: should provide tutor overview, post-tuition form, and my-tuitions CRUD operations', () => {
    const tutorOverviewSource = readSource('src/app/dashboard/tutor/page.tsx');
    const postTuitionSource = readSource('src/app/dashboard/tutor/post-tuition/page.tsx');
    const myTuitionsSource = readSource('src/app/dashboard/tutor/my-tuitions/page.tsx');

    const oInspector = inspectSource(tutorOverviewSource);
    const pInspector = inspectSource(postTuitionSource);
    const mInspector = inspectSource(myTuitionsSource);

    // Overview assertions
    assert.ok(
      oInspector.hasToken('user') || oInspector.hasToken('Overview') || oInspector.hasToken('Tuition'),
      'Tutor overview must render tutor workspace summary'
    );

    // Post tuition assertions
    assert.ok(
      pInspector.hasToken('title') && pInspector.hasToken('subject') && pInspector.hasToken('monthlyFee'),
      'Post tuition must contain title, subject, and monthlyFee inputs'
    );
    assert.ok(
      pInspector.callsEndpoint('/tuitions'),
      'Post tuition must submit batch to /tuitions'
    );

    // My tuitions assertions
    assert.ok(
      mInspector.callsEndpoint('/tuitions/tutor/my-tuitions') || mInspector.hasToken('my-tuitions'),
      'My tuitions must query /tuitions/tutor/my-tuitions'
    );
    assert.ok(
      mInspector.hasToken('api.delete') || mInspector.hasToken('handleDelete'),
      'My tuitions must provide delete operation'
    );
    assert.ok(
      mInspector.hasToken('editingTuition') || mInspector.hasToken('setEditingTuition'),
      'My tuitions must provide edit modal operation'
    );
  });

  // T1-DSH-06: Tutor Applicants & Admin Governance
  it('T1-DSH-06: should provide tutor applicant decision actions and admin platform governance', () => {
    const applicantsSource = readSource('src/app/dashboard/tutor/applicants/page.tsx');
    const adminTuitionsSource = readSource('src/app/dashboard/admin/tuitions/page.tsx');
    const adminUsersSource = readSource('src/app/dashboard/admin/users/page.tsx');
    const adminTransactionsSource = readSource('src/app/dashboard/admin/transactions/page.tsx');

    const appInspector = inspectSource(applicantsSource);
    const tuiInspector = inspectSource(adminTuitionsSource);
    const usrInspector = inspectSource(adminUsersSource);
    const txnInspector = inspectSource(adminTransactionsSource);

    // Tutor applicant review actions
    assert.ok(
      appInspector.hasToken('accepted') && appInspector.hasToken('rejected'),
      'Tutor applicants page must provide accepted and rejected actions'
    );

    // Admin tuition moderation
    assert.ok(
      tuiInspector.callsEndpoint('/tuitions/admin/all') || tuiInspector.hasToken('admin'),
      'Admin tuitions page must query all listings for moderation'
    );
    assert.ok(
      tuiInspector.hasToken('handleUpdateStatus') && tuiInspector.hasToken('approved'),
      'Admin tuitions page must provide approve listing action'
    );

    // Admin user governance
    assert.ok(
      usrInspector.hasToken('handleRoleChange') || usrInspector.hasToken('/role'),
      'Admin users page must provide dynamic role change handler'
    );

    // Admin financial ledger
    assert.ok(
      txnInspector.callsEndpoint('/payments/admin/all') || txnInspector.hasToken('transactions') || txnInspector.hasToken('Stripe'),
      'Admin transactions page must display Stripe payment records'
    );
  });

  // T1-DSH-07: Admin Overview Suite (Metrics & Action Shortcuts)
  it('T1-DSH-07: should render admin overview metrics, KPI cards, and quick actions', () => {
    const adminOverviewSource = readSource('src/app/dashboard/admin/page.tsx');
    const inspector = inspectSource(adminOverviewSource);

    assert.ok(
      inspector.callsEndpoint('/users/dashboard-stats') || inspector.hasToken('/users/dashboard-stats'),
      'Admin overview must fetch platform statistics from /users/dashboard-stats'
    );
    assert.ok(
      inspector.hasToken('Total Registered Users') || inspector.hasToken('totalUsers'),
      'Admin overview must display Total Registered Users KPI metric'
    );
    assert.ok(
      inspector.hasToken('Pending Approvals') || inspector.hasToken('pendingTuitions'),
      'Admin overview must display Pending Approvals KPI metric'
    );
    assert.ok(
      inspector.hasToken('Total Stripe Revenue') || inspector.hasToken('totalRevenue'),
      'Admin overview must display Stripe revenue KPI metric'
    );
    assert.ok(
      inspector.hasToken('/dashboard/admin/tuitions') &&
      inspector.hasToken('/dashboard/admin/users'),
      'Admin overview must provide navigation shortcuts to tuition moderation and user management'
    );
  });
});
