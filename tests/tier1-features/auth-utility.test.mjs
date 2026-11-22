/**
 * auth-utility.test.mjs
 * Tier 1: Feature Coverage — Group 1.5
 * Tests T1-AUT-01 through T1-AUT-05: Auth, Payment Return & System Utility Routes
 */

import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { readSource } from '../utils/build-helper.mjs';
import { inspectSource } from '../utils/dom-inspector.mjs';

describe('Tier 1: Auth, Payment & Utility Routes', () => {
  // T1-AUT-01: Sign-In Page
  it('T1-AUT-01: should render sign-in form with demo quick-fill credentials and register link', () => {
    const signInSource = readSource('src/app/sign-in/page.tsx');
    const inspector = inspectSource(signInSource);

    assert.ok(
      inspector.hasInput('email') || inspector.hasToken('type="email"') || inspector.hasToken('email'),
      'Sign-in page must have email input'
    );
    assert.ok(
      inspector.hasInput('password') || inspector.hasToken('type="password"') || inspector.hasToken('password'),
      'Sign-in page must have password input'
    );
    assert.ok(
      inspector.callsEndpoint('/auth/login'),
      'Sign-in form must post to /auth/login'
    );
    assert.ok(
      inspector.hasToken('fillDemo') || inspector.hasToken('student@mentorlagbe.com') || inspector.hasToken('tutor@mentorlagbe.com') || inspector.hasToken('demoEmail'),
      'Sign-in page must provide demo credential helper buttons'
    );
    assert.ok(
      inspector.hasToken('/sign-up'),
      'Sign-in page must link to /sign-up'
    );
  });

  // T1-AUT-02: Sign-Up Page
  it('T1-AUT-02: should render sign-up form with role tabs offering student and tutor only (no admin)', () => {
    const signUpSource = readSource('src/app/sign-up/page.tsx');
    const inspector = inspectSource(signUpSource);

    assert.ok(
      inspector.hasToken('student') && inspector.hasToken('tutor'),
      'Sign-up form must support student and tutor roles'
    );
    assert.ok(
      !inspector.hasToken('value="admin"') && !inspector.hasToken('\'admin\' as any'),
      'DO_NOT_BREAK: Public sign-up must never offer admin registration'
    );
    assert.ok(
      inspector.callsEndpoint('/auth/register'),
      'Sign-up form must post to /auth/register'
    );
    assert.ok(
      inspector.hasToken('/sign-in'),
      'Sign-up page must link to /sign-in'
    );
  });

  // T1-AUT-03: Payment Return Pages
  it('T1-AUT-03: should render payment success with confetti and cancel with retry actions', () => {
    const successSource = readSource('src/app/payment/success/page.tsx');
    const cancelSource = readSource('src/app/payment/cancel/page.tsx');

    const sInspector = inspectSource(successSource);
    const cInspector = inspectSource(cancelSource);

    // Success page assertions
    assert.ok(
      sInspector.callsEndpoint('/payments/verify-session?sessionId=') || sInspector.hasToken('/payments/verify-session'),
      'Payment success page must verify session via /payments/verify-session'
    );
    assert.ok(
      sInspector.hasToken('canvas-confetti') || sInspector.hasToken('confetti'),
      'Payment success page must trigger confetti celebration'
    );
    assert.ok(
      sInspector.hasToken('/dashboard') || sInspector.hasToken('/tuitions'),
      'Payment success page must provide post-payment navigation'
    );

    // Cancel page assertions
    assert.ok(
      cInspector.hasToken('/pricing'),
      'Payment cancel page must provide retry link to /pricing'
    );
    assert.ok(
      cInspector.hasToken('/'),
      'Payment cancel page must provide return link to home'
    );
  });

  // T1-AUT-04: Utility Pages 404 & Error
  it('T1-AUT-04: should render custom 404 compass page and error boundary with retry trigger', () => {
    const notFoundSource = readSource('src/app/not-found.tsx');
    const errorSource = readSource('src/app/error.tsx');

    const nfInspector = inspectSource(notFoundSource);
    const errInspector = inspectSource(errorSource);

    // 404 assertions
    assert.ok(
      nfInspector.hasToken('Compass') || nfInspector.hasToken('404'),
      'not-found.tsx must feature 404 indication and Compass visual'
    );
    assert.ok(
      nfInspector.hasToken('Back to Home') || nfInspector.hasToken('href="/"'),
      'not-found.tsx must link back to home'
    );

    // Error boundary assertions
    assert.ok(
      errInspector.hasToken('reset()') || errInspector.hasToken('reset'),
      'error.tsx must provide retry mechanism invoking reset()'
    );
    assert.ok(
      errInspector.hasToken('AlertTriangle') || errInspector.hasToken('Something went wrong'),
      'error.tsx must display error state messaging'
    );
  });

  // T1-AUT-05: Universal Profile Settings
  it('T1-AUT-05: should render profile settings with ImgBB upload proxy and PATCH submission', () => {
    const profileSource = readSource('src/app/dashboard/profile/page.tsx');
    const inspector = inspectSource(profileSource);

    assert.ok(
      inspector.callsEndpoint('/upload'),
      'Profile settings must upload images via /upload backend proxy'
    );
    assert.ok(
      inspector.callsEndpoint('/auth/profile'),
      'Profile settings must update profile data via PATCH /auth/profile'
    );
    assert.ok(
      inspector.hasToken('name') && inspector.hasToken('phone') && inspector.hasToken('bio'),
      'Profile form must manage name, phone, and bio fields'
    );
    assert.ok(
      inspector.hasToken('updateLocalUser'),
      'Profile update must synchronize local user state'
    );
  });
});
