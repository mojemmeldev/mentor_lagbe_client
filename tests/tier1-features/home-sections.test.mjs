/**
 * home-sections.test.mjs
 * Tier 1: Feature Coverage — Group 1.3
 * Tests T1-HOM-01 through T1-HOM-09: Modular Home Page Sections
 */

import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { readSource } from '../utils/build-helper.mjs';
import { inspectSource } from '../utils/dom-inspector.mjs';

describe('Tier 1: Modular Home Page Sections', () => {
  // T1-HOM-01: Minimal Hero Section with search dock and trust proof
  it('T1-HOM-01: should render minimal HeroSection with headline, search dock and social proof', () => {
    const heroSource = readSource('src/components/home/HeroSection.tsx');
    const inspector = inspectSource(heroSource);

    assert.ok(
      inspector.hasToken('handleHeroSearch') || inspector.hasToken('Search'),
      'HeroSection must feature search dock input'
    );
    assert.ok(
      inspector.hasToken('subjectQuery') || inspector.hasToken('Subject'),
      'HeroSection must feature subject filter controls'
    );
    assert.ok(
      inspector.hasToken('heroHeadline') || inspector.hasToken('More Than Tuition'),
      'HeroSection must feature the primary headline'
    );
    assert.ok(
      inspector.hasToken('hero-social') || inspector.hasToken('Trusted by') || inspector.hasToken('4.9/5'),
      'HeroSection must feature social proof'
    );
    assert.ok(
      !inspector.hasToken('SIAM_CONVERSATION') && !inspector.hasToken('heroChatShowcase'),
      'HeroSection should no longer include the WhatsApp chat simulator'
    );
  });

  // T1-HOM-02: Kinetic Marquee Ribbon & Trust Badges
  it('T1-HOM-02: should render verified perks and trust badges', () => {
    const heroSource = readSource('src/components/home/HeroSection.tsx');
    const ribbonSource = readSource('src/components/home/KineticRibbon.tsx');
    const trustSource = readSource('src/components/home/TrustPillars.tsx');
    const combined = `${heroSource}\n${ribbonSource}\n${trustSource}`;
    const inspector = inspectSource(combined);

    assert.ok(
      inspector.hasToken('100% Verified Tutors') ||
      inspector.hasToken('Verified Tutors') ||
      inspector.hasToken('100% ID Verified Teachers') ||
      inspector.hasToken('Verified Credentials'),
      'Hero and trust strip must display 100% Verified Tutors / ID credentials badge'
    );
    assert.ok(
      inspector.hasToken('Zero Initial Booking Fee') ||
      inspector.hasToken('Zero Commission') ||
      inspector.hasToken('0% Middleman Agency Cut') ||
      inspector.hasToken('Zero Agency Fees'),
      'Hero/ribbon must display Zero Booking Fee / 0% Commission benefit'
    );
    assert.ok(
      inspector.hasToken('Online & Offline Batches') ||
      inspector.hasToken('Both Online & In-Person') ||
      inspector.hasToken('Online & Dhaka Home Batches') ||
      inspector.hasToken('Online & Home'),
      'Hero/ribbon must display Online and Home learning options'
    );
  });

  // T1-HOM-03: Trust Pillars & Old vs MentorLagbe
  it('T1-HOM-03: should contrast direct mentorship against traditional agency media', () => {
    const benefitsSource = readSource('src/components/home/BenefitsTabs.tsx');
    const trustSource = readSource('src/components/home/TrustShield.tsx');
    const bInspector = inspectSource(benefitsSource);
    const tInspector = inspectSource(trustSource);

    assert.ok(
      bInspector.hasToken('Direct Application & Zero Middleman') ||
      bInspector.hasToken('Zero Commission Deduction'),
      'BenefitsTabs must contrast direct mentorship with zero agency middleman cut'
    );
    assert.ok(
      tInspector.hasToken('Authentic Mentors You and Your Parents Can Truly Rely On') ||
      tInspector.hasToken('Authentic Mentors You Can Truly Rely On') ||
      tInspector.hasToken('Trust & Verification Guarantee') ||
      tInspector.hasToken('Verified Academic Trust'),
      'TrustShield must declare strict authenticity and verification guarantees'
    );
  });

  // T1-HOM-04: Featured Batches & Filters
  it('T1-HOM-04: should fetch and render featured tuitions with BDT monthly pricing', () => {
    const featuredSource = readSource('src/components/home/FeaturedTuitions.tsx');
    const fInspector = inspectSource(featuredSource);

    assert.ok(
      fInspector.hasToken('FEATURED_BATCHES_DATA') ||
      fInspector.callsEndpoint('/tuitions/featured') ||
      fInspector.hasToken('/tuitions/featured'),
      'FeaturedTuitions must feature featured batches dataset or endpoint'
    );
    assert.ok(
      fInspector.hasToken('BatchApplyModal') ||
      fInspector.hasToken('TuitionCard') ||
      fInspector.hasImport('@/components/tuition/TuitionCard'),
      'FeaturedTuitions must render batch application cards with modal support'
    );
    assert.ok(
      fInspector.hasToken('BDT') || fInspector.hasToken('৳') || fInspector.hasToken('monthlyFee'),
      'FeaturedTuitions must format monthly tuition fee with BDT or ৳ currency'
    );
  });

  // T1-HOM-05: Why Choose Bridge Cards
  it('T1-HOM-05: should display dual Student and Tutor benefit pillars', () => {
    const benefitsSource = readSource('src/components/home/BenefitsTabs.tsx');
    const inspector = inspectSource(benefitsSource);

    assert.ok(inspector.hasToken('studentBenefits'), 'BenefitsTabs must declare student benefits');
    assert.ok(inspector.hasToken('tutorBenefits'), 'BenefitsTabs must declare tutor benefits');
    assert.ok(inspector.hasToken('100% Verified Tutors'), 'Student benefits must feature verified tutors');
    assert.ok(inspector.hasToken('Zero Commission Deduction'), 'Tutor benefits must feature zero commission deduction');
  });

  // T1-HOM-06: Subjects & Physics Orbs / Counters
  it('T1-HOM-06: should render core subjects and animated numeric counters', () => {
    const subjectsSource = readSource('src/components/home/SubjectsStats.tsx');
    const inspector = inspectSource(subjectsSource);

    assert.ok(inspector.hasToken('Mathematics'), 'SubjectsStats must include Mathematics');
    assert.ok(inspector.hasToken('Physics'), 'SubjectsStats must include Physics');
    assert.ok(inspector.hasToken('Chemistry'), 'SubjectsStats must include Chemistry');
    assert.ok(inspector.hasToken('Biology'), 'SubjectsStats must include Biology');
    assert.ok(inspector.hasToken('Programming'), 'SubjectsStats must include Programming');
    assert.ok(inspector.hasToken('English'), 'SubjectsStats must include English');
    assert.ok(inspector.hasToken('AnimatedCounter') || inspector.hasToken('count'), 'SubjectsStats must include animated numeric counters');
  });

  // T1-HOM-07: Learning Journey Roadmap
  it('T1-HOM-07: should render 4-step sequential learning journey roadmap (01-04)', () => {
    const roadmapSource = readSource('src/components/home/HowItWorksRoadmap.tsx');
    const inspector = inspectSource(roadmapSource);

    assert.ok(inspector.hasToken('01'), 'Roadmap must include step 01');
    assert.ok(inspector.hasToken('02'), 'Roadmap must include step 02');
    assert.ok(inspector.hasToken('03'), 'Roadmap must include step 03');
    assert.ok(inspector.hasToken('04'), 'Roadmap must include step 04');
    assert.ok(inspector.hasToken('Search & Match'), 'Step 01 title must be Search & Match');
    assert.ok(inspector.hasToken('Review Credentials'), 'Step 02 title must be Review Credentials');
    assert.ok(
      inspector.hasToken('Apply in 1-Click') || inspector.hasToken('Submit Application'),
      'Step 03 title must be Apply in 1-Click or Submit Application'
    );
    assert.ok(
      inspector.hasToken('Connect & Grow') || inspector.hasToken('Accelerate Learning'),
      'Step 04 title must be Connect & Grow or Accelerate Learning'
    );
  });

  // T1-HOM-08: Pricing, FAQ & Dual CTA
  it('T1-HOM-08: should render $10/$15 pricing comparison, FAQ accordion, and dual CTA banner', () => {
    const pricingSource = readSource('src/components/home/PricingComparison.tsx');
    const faqSource = readSource('src/components/home/FaqAccordion.tsx');
    const dualCtaSource = readSource('src/components/home/DualCtaBanner.tsx');

    const pInspector = inspectSource(pricingSource);
    const fInspector = inspectSource(faqSource);
    const dInspector = inspectSource(dualCtaSource);

    // Pricing checks: Tutor $15, Student $10
    assert.ok(pInspector.hasToken('$15'), 'PricingComparison must feature $15 Tutor plan');
    assert.ok(pInspector.hasToken('$10'), 'PricingComparison must feature $10 Student plan');

    // FAQ checks: Collapsible questions
    assert.ok(fInspector.hasToken('faqs'), 'FaqAccordion must declare faqs collection');
    assert.ok(fInspector.hasToken('How does MentorLagbe verify tutors?'), 'FAQ must include verification question');

    // Dual CTA banner checks: Links to tuitions and become-a-tutor
    assert.ok(dInspector.hasToken('/tuitions'), 'Dual CTA banner must link students to /tuitions');
    assert.ok(dInspector.hasToken('/become-a-tutor'), 'Dual CTA banner must link mentors to /become-a-tutor');
  });

  // T1-HOM-09: Testimonials & Community Voice (Feature 17)
  it('T1-HOM-09: should render testimonials with star ratings, quotes, and community voices', () => {
    const testimonialSource = readSource('src/components/home/Testimonials.tsx');
    const homePageSource = readSource('src/app/page.tsx');
    const inspector = inspectSource(testimonialSource);
    const homeInspector = inspectSource(homePageSource);

    assert.ok(
      homeInspector.hasImport('@/components/home/Testimonials', 'Testimonials') ||
      homeInspector.hasToken('<Testimonials'),
      'Home page must import and render Testimonials component'
    );
    assert.ok(
      inspector.hasToken('testimonials') || inspector.hasToken('quote'),
      'Testimonials must declare testimonials collection'
    );
    assert.ok(
      inspector.hasToken('Star') && inspector.hasToken('fill-current'),
      'Testimonials must render star rating indicators'
    );
    assert.ok(
      inspector.hasToken('Student') || inspector.hasToken('Candidate') || inspector.hasToken('Tanvir Rahman'),
      'Testimonials must include student voice'
    );
    assert.ok(
      inspector.hasToken('Tutor') || inspector.hasToken('Mentor') || inspector.hasToken('Dr. Nusrat Jahan'),
      'Testimonials must include mentor voice'
    );
    assert.ok(
      inspector.hasToken('Parent') || inspector.hasToken('Farzana Akter'),
      'Testimonials must include parent voice'
    );
  });
});
