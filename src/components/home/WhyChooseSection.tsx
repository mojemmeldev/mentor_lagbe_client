'use client';

import React from 'react';
import { UserCheck, Globe, Handshake, Sparkles } from 'lucide-react';

export interface WhyFeature {
  icon: React.ComponentType<{ className?: string }>;
  iconBg: string;
  iconColor: string;
  title: string;
  description: string;
}

export const WHY_CHOOSE_FEATURES: WhyFeature[] = [
  {
    icon: UserCheck,
    iconBg: 'bg-brand-100 dark:bg-terracotta-950/40',
    iconColor: 'text-brand-600 dark:text-brand-400',
    title: 'ID-Checked Mentors',
    description:
      "University IDs and academic backgrounds from BUET, DU and DMC are checked by hand before approval.",
  },
  {
    icon: Globe,
    iconBg: 'bg-emerald-100 dark:bg-brand-500/20',
    iconColor: 'text-brand-700 dark:text-brand-100',
    title: 'Online or At Home',
    description:
      'Join interactive sessions across Bangladesh on Zoom or Discord, or meet a local batch in Dhaka.',
  },
  {
    icon: Handshake,
    iconBg: 'bg-brand-100 dark:bg-amberwarm-950/40',
    iconColor: 'text-amber-700 dark:text-amberwarm-400',
    title: 'No Agency Cut',
    description:
      'Learners pay no booking charges, and mentors keep every taka they earn.',
  },
  {
    icon: Sparkles,
    iconBg: 'bg-sky-100 dark:bg-sky-950/40',
    iconColor: 'text-sky-700 dark:text-sky-400',
    title: 'Priority for Pro Members',
    description:
      'Pro members get faster application replies and dedicated help with difficult topics.',
  },
];

export const WhyChooseSection: React.FC = () => {
  return (
    <section id="bonding" className="py-20 bg-white dark:bg-[#081612] border-y border-forest-900/10 dark:border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-brand-500 font-bold text-xs uppercase tracking-widest">
            Direct by Design
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-forest-900 dark:text-[#F5F2EB] mt-2">
            What Makes MentorLagbe Different
          </h2>
          <p className="text-forest-800/75 dark:text-[#F5F2EB]/75 mt-3 leading-relaxed">
            Most agencies treat tutoring as a transaction and take a large cut. We built a direct, open space where real mentorship can grow.
          </p>
        </div>

        {/* 4 Value Bridge Cards Grid */}
        <div id="whyCardsGrid" className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {WHY_CHOOSE_FEATURES.map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <div
                key={idx}
                className="p-7 rounded-3xl bg-cream dark:bg-[#0F241E] border border-forest-900/5 dark:border-white/5 hover:border-brand-500/30 transition-all duration-300 hover:-translate-y-1 shadow-card"
              >
                <div
                  className={`w-12 h-12 rounded-2xl ${feat.iconBg} ${feat.iconColor} flex items-center justify-center mb-5`}
                >
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-lg text-forest-900 dark:text-white mb-2">{feat.title}</h3>
                <p className="text-sm text-forest-800/75 dark:text-white/75 leading-relaxed">
                  {feat.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseSection;
