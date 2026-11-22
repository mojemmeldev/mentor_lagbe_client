'use client';

import React from 'react';
import { useGsapScroll } from '@/hooks/useGsapScroll';
import {
  HeroSection,
  FeaturedTuitions,
  SubjectsStats,
  HowItWorksRoadmap,
  PricingComparison,
  Testimonials,
  FaqAccordion,
  BatchApplyModal,
} from '@/components/home';

export default function HomePage() {
  const containerRef = useGsapScroll();

  return (
    <main
      ref={containerRef}
      className="flex flex-col min-h-screen bg-cream dark:bg-[#081612] text-forest-900 dark:text-[#F5F2EB] selection:bg-brand-500 selection:text-white"
    >
      {/* 1. Hero / Banner */}
      <HeroSection />

      {/* 2. Featured Tuitions */}
      <FeaturedTuitions />

      {/* 3. Subjects & Stats */}
      <SubjectsStats />

      {/* 4. How It Works */}
      <HowItWorksRoadmap />

      {/* 5. Pricing */}
      <PricingComparison />

      {/* 6. Testimonials */}
      <Testimonials />

      {/* 7. FAQ */}
      <FaqAccordion />

      {/* Global Batch Application Modal */}
      <BatchApplyModal />
    </main>
  );
}
