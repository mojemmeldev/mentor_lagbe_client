'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import { motion, useScroll } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, Search, ShieldCheck, Compass, GraduationCap } from 'lucide-react';

const journeySteps = [
  {
    step: 'Step 01',
    title: 'Search & Match',
    desc: 'Narrow batches by subject, grade, budget, and online or Dhaka home delivery.',
    icon: Search,
    badgeBg: 'bg-forest-900 text-white',
  },
  {
    step: 'Step 02',
    title: 'Review Credentials',
    desc: 'Compare BUET, DU and DMC backgrounds, learner feedback, and full syllabi.',
    icon: ShieldCheck,
    badgeBg: 'bg-forest-900 text-white',
  },
  {
    step: 'Step 03',
    title: 'Apply in 1-Click',
    desc: 'Send your timing preference straight to the mentor with no upfront booking charge.',
    icon: Compass,
    badgeBg: 'bg-forest-900 text-white',
  },
  {
    step: 'Step 04',
    title: 'Connect & Grow',
    desc: 'Sort the schedule on WhatsApp and start learning with direct, personal guidance.',
    icon: GraduationCap,
    badgeBg: 'bg-brand-500 text-white',
  },
];

export const HowItWorksRoadmap: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 85%', 'end 50%'],
  });

  return (
    <section id="how-it-works" className="py-20 bg-white dark:bg-[#081612] border-t border-forest-900/10 dark:border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-brand-500 font-bold text-xs uppercase tracking-widest">
            Four Clear Steps
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-forest-900 dark:text-[#F5F2EB] mt-2">
            From Search to Your First Class
          </h2>
          <p className="text-sm text-forest-800/70 dark:text-[#F5F2EB]/70 mt-2">
            Follow the path from finding a batch to talking with your mentor.
          </p>
        </div>

        <div ref={containerRef} className="relative">
          {/* Desktop Horizontal Progress Line */}
          <div className="hidden md:block absolute top-11 left-[12%] right-[12%] h-1.5 bg-forest-900/10 dark:bg-white/10 rounded-full overflow-hidden z-0 pointer-events-none">
            <motion.div
              style={{ scaleX: scrollYProgress }}
              className="h-full w-full bg-gradient-to-r from-forest-900 via-terracotta-500 to-emerald-500 origin-left rounded-full"
            />
          </div>

          {/* Mobile Vertical Progress Line */}
          <div className="md:hidden absolute top-6 bottom-6 left-6 w-1.5 bg-forest-900/10 dark:bg-white/10 rounded-full overflow-hidden z-0 pointer-events-none">
            <motion.div
              style={{ scaleY: scrollYProgress }}
              className="w-full h-full bg-gradient-to-b from-forest-900 via-terracotta-500 to-emerald-500 origin-top rounded-full"
            />
          </div>

          <div className="grid md:grid-cols-4 gap-8 relative z-20 pl-10 md:pl-0">
            {journeySteps.map((s, index) => {
              const Icon = s.icon;
              return (
                <motion.div
                  key={s.step}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.5, delay: index * 0.12 }}
                  whileHover={{ y: -6 }}
                  className="group relative z-20 bg-white dark:bg-[#0F241E] p-7 rounded-3xl border border-forest-900/15 dark:border-white/10 shadow-card hover:border-brand-500 hover:shadow-soft transition-all duration-300"
                >
                  <div className="flex items-center justify-between mb-4">
                    <span className={`inline-block px-3.5 py-1.5 rounded-full ${s.badgeBg} text-xs font-bold shadow-xs transition-transform duration-300 group-hover:scale-105`}>
                      {s.step}
                    </span>
                    <span className="text-[11px] font-semibold text-forest-800/40 dark:text-white/40">
                      0{index + 1}/04
                    </span>
                  </div>
                  <div className="w-12 h-12 rounded-2xl bg-cream dark:bg-[#153028] text-forest-900 dark:text-[#F5F2EB] flex items-center justify-center mb-4 group-hover:bg-brand-50 dark:group-hover:bg-terracotta-900/30 group-hover:text-brand-500 transition-colors">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-lg text-forest-900 dark:text-[#F5F2EB] mb-2">{s.title}</h3>
                  <p className="text-sm text-forest-800/75 dark:text-[#F5F2EB]/75 leading-relaxed">{s.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>

        <div className="mt-14 text-center">
          <Link href="/how-it-works">
            <Button variant="outline" className="rounded-full px-6 py-2.5 font-bold text-xs gap-2 border-forest-900/15 dark:border-white/15 hover:bg-forest-900 hover:text-white dark:hover:bg-white dark:hover:text-forest-900 cursor-pointer">
              <span>Explore the Full Workflow</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksRoadmap;
