'use client';

import React from 'react';
import { XCircle, MinusCircle, HeartHandshake, CheckCircle2 } from 'lucide-react';

export const ComparisonSection: React.FC = () => {
  return (
    <section id="scrollCompareSection" className="py-20 bg-cream dark:bg-[#081612] border-t border-forest-900/10 dark:border-white/10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-brand-500 font-bold text-xs uppercase tracking-widest">
            Then vs. Now
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-forest-900 dark:text-[#F5F2EB] mt-2">
            Traditional Agencies vs. Direct Mentorship
          </h2>
          <p className="text-forest-800/75 dark:text-[#F5F2EB]/75 mt-2">
            See how a direct connection changes the whole learning experience.
          </p>
        </div>

        {/* 2-Card Comparison Grid */}
        <div className="grid md:grid-cols-2 gap-8 items-stretch">
          {/* Left Card: Typical Tuition Agencies */}
          <div
            id="compareOldCard"
            className="p-8 sm:p-10 rounded-[2.25rem] bg-white/60 dark:bg-[#0F241E]/60 border border-forest-900/10 dark:border-white/10 flex flex-col justify-between shadow-sm hover:shadow-card transition-shadow"
          >
            <div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-forest-900/10 dark:bg-white/10 text-forest-900/70 dark:text-white/70 text-xs font-bold uppercase mb-4">
                <XCircle className="w-3.5 h-3.5 text-forest-900/70 dark:text-white/70" />
                Typical Tuition Agencies
              </span>
              <h3 className="font-serif text-2xl font-bold text-forest-900 dark:text-white mb-4">
                Distant and Fee-Heavy
              </h3>
              <ul className="space-y-3.5 text-sm text-forest-800/75 dark:text-white/75">
                <li className="flex items-center gap-3">
                  <MinusCircle className="w-4 h-4 text-brand-500 shrink-0" />
                  <span>Agencies swallow 50–60% of first-month pay</span>
                </li>
                <li className="flex items-center gap-3">
                  <MinusCircle className="w-4 h-4 text-brand-500 shrink-0" />
                  <span>Unchecked IDs and inflated university claims</span>
                </li>
                <li className="flex items-center gap-3">
                  <MinusCircle className="w-4 h-4 text-brand-500 shrink-0" />
                  <span>Oversized batches with little personal attention</span>
                </li>
              </ul>
            </div>
            <div className="mt-8 pt-4 border-t border-forest-900/10 dark:border-white/10 text-xs font-bold text-forest-800/50 dark:text-white/50">
              Outcome: stress and weak follow-through
            </div>
          </div>

          {/* Right Card: The MentorLagbe Way */}
          <div
            id="compareNewCard"
            className="p-8 sm:p-10 rounded-[2.25rem] bg-forest-900 dark:bg-[#0F241E] text-white border-2 border-brand-500 shadow-soft flex flex-col justify-between relative overflow-hidden"
          >
            <div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-500 text-white text-xs font-bold uppercase mb-4 shadow-sm">
                <HeartHandshake className="w-3.5 h-3.5" />
                The MentorLagbe Way
              </span>
              <h3 className="font-serif text-2xl font-bold text-white mb-4">
                Personal, Checked &amp; Commission-Free
              </h3>
              <ul className="space-y-3.5 text-sm text-white/90">
                <li className="flex items-center gap-3">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>The entire monthly fee reaches the mentor</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Hand-checked IDs from BUET, DMC, DU and NSU</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>WhatsApp support and guidance built around you</span>
                </li>
              </ul>
            </div>
            <div className="mt-8 pt-4 border-t border-white/15 flex items-center justify-between text-xs font-bold text-brand-500">
              <span>Outcome: 98% learner–mentor satisfaction</span>
              <span>★ 4.9/5 from learners</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ComparisonSection;
