/**
 * public-routes.test.mjs
 * Tier 1: Feature Coverage — Group 1.4
 * Tests T1-PUB-01 through T1-PUB-07: Public Discovery & Marketplace Routes
 */

import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { readSource } from '../utils/build-helper.mjs';
import { inspectSource } from '../utils/dom-inspector.mjs';

describe('Tier 1: Public Discovery & Marketplace Routes', () => {
  // T1-PUB-01: Tuitions Marketplace
  it('T1-PUB-01: should provide tuition search, filter controls, cards, and pagination', () => {
    const tuitionsSource = readSource('src/app/tuitions/page.tsx');
    const inspector = inspectSource(tuitionsSource);

    assert.ok(
      inspector.hasToken('BrowseTuitionsContent'),
      'Tuitions page must declare BrowseTuitionsContent component'
    );
    assert.ok(
      inspector.hasToken('searchParams') && inspector.hasToken('useSearchParams'),
      'Tuitions page must synchronize state with useSearchParams'
    );
    assert.ok(
      inspector.hasToken('subject') && inspector.hasToken('classLevel') && inspector.hasToken('mode'),
      'Tuitions page must support subject, classLevel, and mode filters'
    );
    assert.ok(
      inspector.hasToken('TuitionCard') || inspector.hasImport('@/components/tuition/TuitionCard'),
      'Tuitions page must render TuitionCard component'
    );
    assert.ok(
      inspector.hasToken('pagination') || inspector.hasToken('totalPages') || inspector.hasToken('ChevronLeft'),
      'Tuitions page must include pagination controls'
    );
  });

  // T1-PUB-02: Tuition Details Page
  it('T1-PUB-02: should display syllabus, tutor spotlight, reviews, and student apply modal', () => {
    const detailsSource = readSource('src/app/tuitions/[id]/page.tsx');
    const inspector = inspectSource(detailsSource);

    assert.ok(
      inspector.hasToken('use(params)') || inspector.hasToken('resolvedParams.id'),
      'Tuition details must resolve dynamic ID parameter'
    );
    assert.ok(
      inspector.callsEndpoint('/tuitions/${tuitionId}') || inspector.hasToken('/tuitions/'),
      'Tuition details must fetch tuition data by ID'
    );
    assert.ok(
      inspector.hasToken('studentPhone') && inspector.hasToken('preferredSchedule') && inspector.hasToken('studentNote'),
      'Apply modal must contain studentPhone, preferredSchedule, and studentNote fields'
    );
    assert.ok(
      inspector.callsEndpoint('/applications/apply'),
      'Apply modal must submit to /applications/apply'
    );
    assert.ok(
      inspector.hasToken('user?.role === \'student\'') || inspector.hasToken('user.role !== \'student\''),
      'Apply modal must restrict submission to student accounts'
    );
  });

  // T1-PUB-03: Tutors Directory
  it('T1-PUB-03: should render verified mentor cards, subject pills, and profile link', () => {
    const tutorsSource = readSource('src/app/tutors/page.tsx');
    const inspector = inspectSource(tutorsSource);

    assert.ok(
      inspector.hasToken('Search') || inspector.hasToken('search'),
      'Tutors directory must provide search input'
    );
    assert.ok(
      inspector.hasToken('subjects') || inspector.hasToken('selectedSubject'),
      'Tutors directory must support subject filtering'
    );
    assert.ok(
      inspector.hasToken('/tutors/') || inspector.hasToken('View Profile'),
      'Tutors cards must link to /tutors/[id]'
    );
    assert.ok(
      inspector.hasToken('Verified') || inspector.hasToken('CheckCircle2'),
      'Tutors directory must indicate verified status'
    );
  });

  // T1-PUB-04: Tutor Public Profile
  it('T1-PUB-04: should render tutor bio, credentials, and active batches grid', () => {
    const tutorProfileSource = readSource('src/app/tutors/[id]/page.tsx');
    const inspector = inspectSource(tutorProfileSource);

    assert.ok(
      inspector.hasToken('use(params)') || inspector.hasToken('resolvedParams.id'),
      'Tutor profile must resolve dynamic tutor ID'
    );
    assert.ok(
      inspector.hasToken('/tutors'),
      'Tutor profile must include back navigation to /tutors'
    );
    assert.ok(
      inspector.hasToken('TuitionCard') || inspector.hasToken('tuitions'),
      'Tutor profile must display tutor active tuition batches'
    );
  });

  // T1-PUB-05: Become a Tutor Page
  it('T1-PUB-05: should render onboarding perks, 4-step workflow, FAQ, and tutor signup CTA', () => {
    const becomeTutorSource = readSource('src/app/become-a-tutor/page.tsx');
    const inspector = inspectSource(becomeTutorSource);

    assert.ok(
      inspector.hasToken('perks') || inspector.hasToken('Zero Hidden Commission'),
      'Become a Tutor must list instructor perks'
    );
    assert.ok(
      inspector.hasToken('steps') || inspector.hasToken('Create Your Free Account') || inspector.hasToken('Post Your Tuition Offer'),
      'Become a Tutor must detail onboarding steps'
    );
    assert.ok(
      inspector.hasToken('/sign-up') || inspector.hasToken('/sign-up?role=tutor'),
      'Become a Tutor must provide CTA linking to tutor sign-up'
    );
  });

  // T1-PUB-06: How It Works & Contact Pages
  it('T1-PUB-06: should render dual how-it-works roadmap and complete contact support form', () => {
    const howItWorksSource = readSource('src/app/how-it-works/page.tsx');
    const contactSource = readSource('src/app/contact/page.tsx');

    const hInspector = inspectSource(howItWorksSource);
    const cInspector = inspectSource(contactSource);

    // How It Works checks
    assert.ok(
      hInspector.hasToken('studentSteps') || hInspector.hasToken('Find the Perfect Batch'),
      'How It Works must detail student roadmap'
    );
    assert.ok(
      hInspector.hasToken('tutorSteps') || hInspector.hasToken('Post Your Tuition Batch') || hInspector.hasToken('Sign Up as Mentor'),
      'How It Works must detail tutor roadmap'
    );

    // Contact Page checks
    assert.ok(
      cInspector.hasToken('name') && cInspector.hasToken('email') && cInspector.hasToken('message'),
      'Contact page must feature name, email, and message inputs'
    );
    assert.ok(
      cInspector.hasToken('support@mentorlagbe.com') || cInspector.hasToken('Mail'),
      'Contact page must display support email'
    );
  });

  // T1-PUB-07: Pricing Page Redesign
  it('T1-PUB-07: should render Pro Tutor ($15) & Pro Student ($10) cards with role purchase guards', () => {
    const pricingSource = readSource('src/app/pricing/page.tsx');
    const inspector = inspectSource(pricingSource);

    assert.ok(inspector.hasToken('$15'), 'Pricing page must display $15 for Pro Tutor');
    assert.ok(inspector.hasToken('$10'), 'Pricing page must display $10 for Pro Student');
    assert.ok(
      inspector.hasToken('user.role === \'student\' && planType !== \'pro_student\''),
      'Pricing page must guard students against purchasing tutor plan'
    );
    assert.ok(
      inspector.hasToken('user.role === \'tutor\' && planType !== \'pro_tutor\''),
      'Pricing page must guard tutors against purchasing student plan'
    );
    assert.ok(
      inspector.callsEndpoint('/payments/create-checkout-session') || inspector.hasToken('/payments/'),
      'Pricing page must post checkout session to /payments/create-checkout-session'
    );
  });
});
