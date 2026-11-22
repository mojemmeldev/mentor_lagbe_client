/**
 * role-guards.test.mjs
 * Tier 2: Boundary & Corner Cases — Authentication, Authorization & Role Guards
 * Tests T2-BND-07 through T2-BND-12
 */

import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { readSource } from '../utils/build-helper.mjs';
import { inspectSource } from '../utils/dom-inspector.mjs';

describe('Tier 2: Boundary & Corner Cases — Role Guards & Token Resilience', () => {
  // T2-BND-07: Unauthenticated user accessing protected dashboard
  it('T2-BND-07: should redirect unauthenticated visitors from dashboard routes to /sign-in', () => {
    const layoutSource = readSource('src/app/dashboard/layout.tsx');
    const inspector = inspectSource(layoutSource);

    assert.ok(
      inspector.hasToken('if (!user)') && inspector.hasToken('router.push(\'/sign-in\')'),
      'Dashboard layout must redirect unauthenticated users to /sign-in'
    );
  });

  // T2-BND-08: Student attempting to access Tutor dashboard
  it('T2-BND-08: should guard and redirect students away from tutor portal routes', () => {
    const layoutSource = readSource('src/app/dashboard/layout.tsx');
    const inspector = inspectSource(layoutSource);

    assert.ok(
      inspector.hasToken('user.role === \'student\'') &&
      inspector.hasToken('pathname.startsWith(\'/dashboard/tutor\')') &&
      inspector.hasToken('router.replace(\'/dashboard/student\')'),
      'Students attempting to enter /dashboard/tutor must be redirected to /dashboard/student'
    );
  });

  // T2-BND-09: Tutor attempting to access Student dashboard
  it('T2-BND-09: should guard and redirect tutors away from student portal routes', () => {
    const layoutSource = readSource('src/app/dashboard/layout.tsx');
    const inspector = inspectSource(layoutSource);

    assert.ok(
      inspector.hasToken('user.role === \'tutor\'') &&
      inspector.hasToken('pathname.startsWith(\'/dashboard/student\')') &&
      inspector.hasToken('router.replace(\'/dashboard/tutor\')'),
      'Tutors attempting to enter /dashboard/student must be redirected to /dashboard/tutor'
    );
  });

  // T2-BND-10: Non-admin user attempting to access Admin dashboard
  it('T2-BND-10: should guard and redirect non-administrators away from admin portal routes', () => {
    const layoutSource = readSource('src/app/dashboard/layout.tsx');
    const inspector = inspectSource(layoutSource);

    assert.ok(
      inspector.hasToken('pathname.startsWith(\'/dashboard/admin\')') &&
      (inspector.hasToken('user.role !== \'admin\'') || inspector.hasToken('user.role === \'student\'')),
      'Non-admins visiting /dashboard/admin must be strictly redirected to their respective role dashboard'
    );
  });

  // T2-BND-11: Corrupted or malformed JWT token in localStorage
  it('T2-BND-11: should safely catch and handle corrupted tokens in localStorage without crash', () => {
    const authContextSource = readSource('src/context/AuthContext.tsx');
    const inspector = inspectSource(authContextSource);

    assert.ok(
      inspector.hasToken('try {') && inspector.hasToken('JSON.parse(storedUser)') && inspector.hasToken('catch (err)'),
      'AuthContext initialization must wrap localStorage parsing in try-catch to prevent corrupt token crashes'
    );
  });

  // T2-BND-12: Expired JWT token handling on 401 response
  it('T2-BND-12: should intercept 401 errors on protected routes, purge storage, and redirect to /sign-in', () => {
    const apiSource = readSource('src/lib/api.ts');
    const inspector = inspectSource(apiSource);

    assert.ok(
      inspector.hasToken('status === 401') || inspector.hasToken('error.response?.status === 401'),
      'api.ts interceptor must catch 401 Unauthorized responses'
    );
    assert.ok(
      inspector.hasToken('localStorage.removeItem(\'mentorlagbe_token\')') &&
      inspector.hasToken('localStorage.removeItem(\'mentorlagbe_user\')'),
      'api.ts 401 interceptor must clear auth credentials from localStorage'
    );
    assert.ok(
      inspector.hasToken('window.location.href = \'/sign-in\''),
      'api.ts 401 interceptor must redirect unauthenticated users to /sign-in'
    );
  });
});
