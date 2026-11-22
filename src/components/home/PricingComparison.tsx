'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { GraduationCap, BookOpenCheck, CheckCircle2, MinusCircle, Sparkles, ArrowRight } from 'lucide-react';

const pricingData = {
  tutor: {
    free: {
      audienceBadge: 'Free Tutor',
      statusBadge: 'No Cost, Forever',
      price: '$0',
      period: '/ free to start',
      desc: 'Get verified, publish your first batches, and talk to students without paying a thing.',
      benefits: [
        { ok: true, text: 'Publish up to 2 live batches' },
        { ok: true, text: 'Verified BUET / DMC / DU identity check' },
        { ok: true, text: 'Keep the full fee — 0% commission' },
        { ok: true, text: 'Coordinate with students on WhatsApp' },
        { ok: false, text: 'Regular search ranking' },
      ],
      cta: 'Start Teaching Free',
      href: '/become-a-tutor',
    },
    pro: {
      audienceBadge: 'Pro Tutor',
      statusBadge: 'One-Time Upgrade',
      price: '$15',
      period: '/ one-time upgrade',
      desc: 'For university mentors running several batches who want a stronger presence in search.',
      benefits: [
        { highlight: 'Unlimited', text: ' batch listings' },
        { text: 'Gold Verified Pro Tutor badge' },
        { text: 'Top-of-results placement' },
        { text: 'Instant SMS and WhatsApp lead alerts' },
        { text: 'Homepage mentor spotlight' },
      ],
      cta: 'Get Pro Tutor ($15)',
      href: '/pricing',
    },
  },
  student: {
    free: {
      audienceBadge: 'Free Student',
      statusBadge: 'No Cost, Forever',
      price: '$0',
      period: '/ free to start',
      desc: 'Browse vetted mentors across Bangladesh and apply to any batch without a booking fee.',
      benefits: [
        { ok: true, text: 'Apply to 3 batches each month' },
        { ok: true, text: 'Mentors from BUET, DMC & DU with checked IDs' },
        { ok: true, text: 'No booking fees or agency cuts' },
        { ok: true, text: 'Set schedules directly on WhatsApp' },
        { ok: false, text: 'Regular application queue' },
      ],
      cta: 'Start Learning Free',
      href: '/sign-up',
    },
    pro: {
      audienceBadge: 'Pro Student',
      statusBadge: 'One-Time Upgrade',
      price: '$10',
      period: '/ one-time upgrade',
      desc: 'For HSC and admission candidates who want quicker replies from top mentors.',
      benefits: [
        { highlight: 'Priority #1', text: ' review for top batches' },
        { text: 'Verified Pro Student badge' },
        { text: 'Unlimited batch applications' },
        { text: 'Dedicated doubt-clearing help' },
        { text: 'First look at new BUET/DMC batches' },
      ],
      cta: 'Get Pro Student ($10)',
      href: '/pricing',
    },
  },
};

export const PricingComparison: React.FC = () => {
  const [role, setRole] = useState<'tutor' | 'student'>('tutor');
  const current = pricingData[role];

  return (
    <section id="pricing" className="py-20 lg:py-28 bg-white dark:bg-[#081612] border-t border-forest-900/10 dark:border-white/10 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-brand-500 font-bold text-xs uppercase tracking-widest">
            Simple, Honest Pricing
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-forest-900 dark:text-[#F5F2EB] mt-2">
            Begin Free, Upgrade Only If You Want To
          </h2>
          <p className="text-forest-800/75 dark:text-[#F5F2EB]/75 mt-2">
            Compare Free and one-time Pro plans for tutors and students. No recurring fees and no tuition commission.
          </p>
        </div>

        {/* Role Switcher Pill */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex items-center p-1.5 rounded-full bg-cream dark:bg-[#153028] border border-forest-900/10 dark:border-white/10 shadow-card">
            <button
              type="button"
              onClick={() => setRole('tutor')}
              className={`px-6 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all flex items-center gap-2 cursor-pointer ${
                role === 'tutor'
                  ? 'bg-forest-900 text-white shadow-xs dark:bg-brand-600'
                  : 'text-forest-900/75 dark:text-[#F5F2EB]/75 hover:text-forest-900 dark:hover:text-white'
              }`}
            >
              <GraduationCap className="w-4 h-4 text-brand-500" />
              <span>For Mentors</span>
            </button>
            <button
              type="button"
              onClick={() => setRole('student')}
              className={`px-6 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all flex items-center gap-2 cursor-pointer ${
                role === 'student'
                  ? 'bg-forest-900 text-white shadow-xs dark:bg-brand-600'
                  : 'text-forest-900/75 dark:text-[#F5F2EB]/75 hover:text-forest-900 dark:hover:text-white'
              }`}
            >
              <BookOpenCheck className="w-4 h-4 text-brand-600 dark:text-brand-100" />
              <span>For Learners</span>
            </button>
          </div>
        </div>

        {/* Cards Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={role}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
            className="grid md:grid-cols-2 gap-8 items-stretch max-w-5xl mx-auto"
          >
            {/* Free Plan */}
            <div className="group p-8 sm:p-10 rounded-[2.25rem] bg-cream dark:bg-[#0F241E] border border-forest-900/10 dark:border-white/10 hover:border-forest-900/30 flex flex-col justify-between transition-all duration-300 hover:-translate-y-2 hover:shadow-soft relative overflow-hidden">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="px-3.5 py-1 rounded-full bg-forest-900/10 dark:bg-white/10 text-forest-900 dark:text-white text-xs font-bold uppercase tracking-wide">
                    {current.free.audienceBadge}
                  </span>
                  <span className="text-xs font-bold text-brand-700 bg-brand-50 dark:bg-brand-500/20 dark:text-brand-100 px-3 py-1 rounded-full">
                    {current.free.statusBadge}
                  </span>
                </div>
                <div className="flex items-baseline gap-2 my-3">
                  <span className="font-serif text-5xl font-bold text-forest-900 dark:text-[#F5F2EB]">{current.free.price}</span>
                  <span className="text-sm font-semibold text-forest-800/60 dark:text-[#F5F2EB]/60">{current.free.period}</span>
                </div>
                <p className="text-sm text-forest-800/75 dark:text-[#F5F2EB]/75 mb-7 leading-relaxed">
                  {current.free.desc}
                </p>

                <ul className="space-y-3.5 text-sm font-medium text-forest-900 dark:text-[#F5F2EB] mb-8">
                  {current.free.benefits.map((b, i) => (
                    <li key={i} className={`flex items-center gap-3 ${b.ok ? '' : 'text-forest-800/45 dark:text-white/40'}`}>
                      {b.ok ? (
                        <CheckCircle2 className="w-5 h-5 text-brand-600 dark:text-brand-100 shrink-0" />
                      ) : (
                        <MinusCircle className="w-5 h-5 shrink-0" />
                      )}
                      <span>{b.text}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <Link href={current.free.href} className="w-full">
                <button
                  type="button"
                  className="w-full py-4 rounded-2xl bg-white dark:bg-[#153028] hover:bg-forest-900 hover:text-white dark:hover:bg-white dark:hover:text-forest-900 text-forest-900 dark:text-white border border-forest-900/15 dark:border-white/15 font-bold text-sm transition-all shadow-xs cursor-pointer"
                >
                  {current.free.cta}
                </button>
              </Link>
            </div>

            {/* Pro Lifetime Plan */}
            <div className="group p-8 sm:p-10 rounded-[2.25rem] bg-forest-900 dark:bg-[#0F241E] text-white border-2 border-brand-500/80 flex flex-col justify-between shadow-xl transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_12px_30px_-6px_rgba(20,175,81,0.35)] relative overflow-hidden">
              <div className="pointer-events-none absolute -top-24 -right-24 w-64 h-64 rounded-full bg-brand-500/20 blur-3xl group-hover:scale-125 transition-transform duration-700" />
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <span className="px-3.5 py-1 rounded-full bg-brand-500 text-white text-xs font-bold uppercase tracking-wide">
                    {current.pro.audienceBadge}
                  </span>
                  <span className="inline-flex items-center gap-1 text-xs font-bold text-brand-500 bg-white/10 px-3 py-1 rounded-full">
                    <Sparkles className="w-3.5 h-3.5" /> {current.pro.statusBadge}
                  </span>
                </div>
                <div className="flex items-baseline gap-2 my-3">
                  <span className="font-serif text-5xl font-bold text-white">{current.pro.price}</span>
                  <span className="text-sm font-semibold text-white/65">{current.pro.period}</span>
                </div>
                <p className="text-sm text-white/80 mb-7 leading-relaxed">
                  {current.pro.desc}
                </p>

                <ul className="space-y-3.5 text-sm font-medium text-white/95 mb-8">
                  {current.pro.benefits.map((b, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-brand-500 shrink-0" />
                      <span>
                        {b.highlight && <strong>{b.highlight}</strong>}
                        {b.text}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <Link href={current.pro.href} className="relative z-10 w-full">
                <button
                  type="button"
                  className="w-full py-4 rounded-2xl bg-brand-500 hover:bg-brand-600 text-white font-bold text-sm transition-all shadow-[0_12px_30px_-6px_rgba(20,175,81,0.35)] flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>{current.pro.cta}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </Link>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default PricingComparison;
