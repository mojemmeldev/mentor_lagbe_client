'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { ShieldCheck, Laptop, Zap, Sparkles, DollarSign, ListOrdered, Award, LayoutDashboard } from 'lucide-react';

interface BenefitItem {
  title: string;
  desc: string;
  icon: React.ComponentType<{ className?: string }>;
}

const studentBenefits: BenefitItem[] = [
  {
    title: '100% Verified Tutors',
    desc: 'University IDs and academic records are reviewed before a profile goes live.',
    icon: ShieldCheck,
  },
  {
    title: 'Both Online & In-Person Batches',
    desc: 'Join live classes from anywhere in Bangladesh or book home tutoring in Dhaka.',
    icon: Laptop,
  },
  {
    title: 'Direct Application & Zero Middleman',
    desc: 'Message mentors directly and apply without agency fees or added commissions.',
    icon: Zap,
  },
  {
    title: 'Pro Priority Privileges',
    desc: 'Pro members move to the front of the queue and hear back sooner.',
    icon: Sparkles,
  },
];

const tutorBenefits: BenefitItem[] = [
  {
    title: 'Zero Commission Deduction',
    desc: 'You keep every taka you earn. Agencies often take half or more of month one; we take nothing.',
    icon: DollarSign,
  },
  {
    title: 'Unlimited Pro Listings',
    desc: 'Run more batches across subjects and levels with the $15 Pro upgrade.',
    icon: ListOrdered,
  },
  {
    title: 'Verified PRO Badge & Ranking',
    desc: 'Earn a verified badge and rank higher so students can spot your credibility.',
    icon: Award,
  },
  {
    title: 'Dedicated Applicant Dashboard',
    desc: 'Track inquiries, review applicant profiles, and accept the right students in one click.',
    icon: LayoutDashboard,
  },
];

export const BenefitsTabs: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'students' | 'tutors'>('students');

  const currentBenefits = activeTab === 'students' ? studentBenefits : tutorBenefits;

  return (
    <section className="py-16 sm:py-24 bg-muted/40 border-y-2 border-border/80">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <Badge variant="outline" className="mb-2">
            Why It Works
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-black text-foreground tracking-tight">
            A Fairer Way to Learn and Teach
          </h2>
          <p className="text-sm text-muted-foreground mt-2">
            A direct, fee-free space where learners meet mentors and mentors reach serious students.
          </p>

          {/* Interactive Dual-Benefit Tab Switcher */}
          <div className="mt-8 inline-flex p-1.5 rounded-2xl bg-card border-2 border-border shadow-[0_4px_0_0_hsl(var(--border))]">
            <button
              onClick={() => setActiveTab('students')}
              className={`px-6 py-2.5 rounded-xl text-xs font-black transition-all ${
                activeTab === 'students'
                  ? 'bg-primary text-primary-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              For Learners & Families
            </button>
            <button
              onClick={() => setActiveTab('tutors')}
              className={`px-6 py-2.5 rounded-xl text-xs font-black transition-all ${
                activeTab === 'tutors'
                  ? 'bg-primary text-primary-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              For Mentors & Tutors
            </button>
          </div>
        </div>

        {/* Animated Spring Transition Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-left"
          >
            {currentBenefits.map((item, idx) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.title}
                  whileHover={{ y: -6 }}
                  transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                  className="p-6 rounded-3xl border-2 border-border bg-card shadow-[0_4px_0_0_hsl(var(--border))] hover:border-primary transition-colors flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="h-10 w-10 rounded-2xl bg-primary/10 border-2 border-primary/20 text-primary flex items-center justify-center font-black text-sm">
                        0{idx + 1}
                      </div>
                      <div className="h-9 w-9 rounded-xl bg-muted border border-border flex items-center justify-center text-muted-foreground">
                        <Icon className="h-4 w-4" />
                      </div>
                    </div>
                    <h3 className="text-base font-bold text-foreground mb-2">{item.title}</h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default BenefitsTabs;
