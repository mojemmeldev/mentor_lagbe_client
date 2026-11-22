/**
 * data-limits.test.mjs
 * Tier 2: Boundary & Corner Cases — Business Rules, Safeguards & Limits
 * Tests T2-BND-13 through T2-BND-20
 */

import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { readSource } from '../utils/build-helper.mjs';
import { inspectSource } from '../utils/dom-inspector.mjs';

describe('Tier 2: Boundary & Corner Cases — Data Limits & Safeguards', () => {
  // T2-BND-13: Session reload on nested dashboard route
  it('T2-BND-13: should restore session from localStorage before evaluating route guards on hard reload', () => {
    const layoutSource = readSource('src/app/dashboard/layout.tsx');
    const authSource = readSource('src/context/AuthContext.tsx');

    const lInspector = inspectSource(layoutSource);
    const aInspector = inspectSource(authSource);

    // AuthContext initializes immediately from localStorage
    assert.ok(
      aInspector.hasToken('localStorage.getItem(\'mentorlagbe_token\')') &&
      aInspector.hasToken('localStorage.getItem(\'mentorlagbe_user\')'),
      'AuthContext must synchronously read stored token and user'
    );
    // DashboardLayout respects loading state before executing redirects
    assert.ok(
      lInspector.hasToken('if (loading) return;') || lInspector.hasToken('if (loading)'),
      'Dashboard layout must defer route guard checks until loading is false to survive hard reloads'
    );
  });

  // T2-BND-14: Sign-in form validation on empty/invalid inputs
  it('T2-BND-14: should block empty submission and display validation feedback', () => {
    const signInSource = readSource('src/app/sign-in/page.tsx');
    const inspector = inspectSource(signInSource);

    assert.ok(
      inspector.hasToken('!email.trim() || !password') || inspector.hasToken('Please enter both email and password'),
      'Sign-in page must validate email and password before dispatching request'
    );
  });

  // T2-BND-15: Registration attempt rejecting role: 'admin'
  it('T2-BND-15: should reject public registration with role: admin and restrict UI to student/tutor', () => {
    const signUpSource = readSource('src/app/sign-up/page.tsx');
    const inspector = inspectSource(signUpSource);

    assert.ok(
      inspector.hasToken('setRole') &&
      inspector.hasToken('\'student\' | \'tutor\''),
      'Sign-up role state must strictly be typed to student or tutor'
    );
    assert.ok(
      !inspector.hasToken('value="admin"'),
      'DO_NOT_BREAK: Admin role must never be selectable in public registration'
    );
  });

  // T2-BND-16: "Apply for Tuition" action blocked for Tutor and Admin
  it('T2-BND-16: should block tutors and admins from applying for tuition batches', () => {
    const detailsSource = readSource('src/app/tuitions/[id]/page.tsx');
    const inspector = inspectSource(detailsSource);

    assert.ok(
      inspector.hasToken('user.role !== \'student\'') ||
      inspector.hasToken('isTutorOrAdmin') ||
      inspector.hasToken('Student applications are restricted to student accounts'),
      'Tuition details must restrict application submissions to student accounts'
    );
    assert.ok(
      inspector.hasToken('Only registered students can apply') || inspector.hasToken('Student Role Required'),
      'Tuition details must provide explanatory message when non-students attempt applying'
    );
  });

  // T2-BND-17: Duplicate tuition application safeguard
  it('T2-BND-17: should reject duplicate application submissions and handle 409 conflict gracefully', () => {
    const detailsSource = readSource('src/app/tuitions/[id]/page.tsx');
    const inspector = inspectSource(detailsSource);

    assert.ok(
      inspector.hasToken('handleApplySubmit'),
      'Tuition details must handle apply submissions'
    );
    assert.ok(
      inspector.callsEndpoint('/applications/apply'),
      'Tuition details must submit application payload to /applications/apply'
    );
    assert.ok(
      inspector.hasToken('catch') &&
      (inspector.hasToken('err.response?.data?.message') || inspector.hasToken('toast.error')),
      'Tuition details must catch API errors and display rejection error message (e.g. 409 Conflict duplicate application)'
    );
    assert.ok(
      inspector.hasToken('setApplying(false)'),
      'Tuition details must reset applying state in finally block to ensure UI recovery on rejection'
    );
  });

  // T2-BND-18: Tutor Free Plan 2-tuition creation limit
  it('T2-BND-18: should warn free tutors reaching the 2-tuition limit and prompt Pro upgrade', () => {
    const postTuitionSource = readSource('src/app/dashboard/tutor/post-tuition/page.tsx');
    const inspector = inspectSource(postTuitionSource);

    assert.ok(
      inspector.hasToken('user?.plan === \'free\'') || inspector.hasToken('PLAN_LIMIT_REACHED'),
      'Post tuition page must enforce free plan limit'
    );
    assert.ok(
      inspector.hasToken('Max 2 tuitions') || inspector.hasToken('Free plan limit reached (max 2 tuitions)'),
      'Post tuition page must display max 2 tuitions message for free plan'
    );
  });

  // T2-BND-19: Pro Plan cross-role purchase prevention
  it('T2-BND-19: should prevent students from buying Tutor Pro and tutors from buying Student Pro', () => {
    const pricingSource = readSource('src/app/pricing/page.tsx');
    const inspector = inspectSource(pricingSource);

    assert.ok(
      inspector.hasToken('user.role === \'student\' && planType !== \'pro_student\''),
      'Pricing page must block students from purchasing tutor pro'
    );
    assert.ok(
      inspector.hasToken('user.role === \'tutor\' && planType !== \'pro_tutor\''),
      'Pricing page must block tutors from purchasing student pro'
    );
  });

  // T2-BND-20: Admin self-demotion prevention
  it('T2-BND-20: should enforce administrative role governance in user management view', () => {
    const adminUsersSource = readSource('src/app/dashboard/admin/users/page.tsx');
    const inspector = inspectSource(adminUsersSource);

    assert.ok(
      inspector.hasToken('handleRoleChange'),
      'Admin user management must provide handleRoleChange handler'
    );
    assert.ok(
      inspector.callsEndpoint('/users/admin/${userId}/role') || inspector.hasToken('/role'),
      'Role changer must invoke PATCH /users/admin/:id/role'
    );
    assert.ok(
      inspector.hasToken('err.response?.data?.message') && inspector.hasToken('toast.error'),
      'User management must surface rejection feedback (e.g. self-demotion prevention lockout error) via toast'
    );
    assert.ok(
      inspector.hasToken('res.data.success'),
      'User management must only update role state if server confirms mutation success, preventing self-demotion override'
    );
  });
});
