'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    q: 'How does MentorLagbe verify tutors?',
    a: 'Tutors share a campus ID from BUET, DMC, DU, NSU or another institution, plus academic records. Our admins review every profile by hand before adding the Verified Mentor badge.',
  },
  {
    q: 'Do students pay anything to apply?',
    a: 'Yes. You can browse and apply at no cost. The only payment is the monthly fee you agree directly with your mentor.',
  },
  {
    q: 'How do online and in-person batches differ?',
    a: 'Online groups meet nationwide on Zoom, Google Meet or Discord with shared whiteboards. In-person groups run around Dhaka areas such as Dhanmondi, Uttara and Mirpur.',
  },
  {
    q: 'How do monthly fee payments work?',
    a: 'After acceptance, you and your mentor sort the details on WhatsApp. Monthly fees are paid directly between you, with no platform commission.',
  },
];

export const FaqAccordion: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0); // First item open by default

  const toggle = (idx: number) => {
    setOpenIndex((prev) => (prev === idx ? null : idx));
  };

  return (
    <section id="faqSection" className="py-20 bg-white dark:bg-[#081612] border-t border-forest-900/10 dark:border-white/10">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="text-brand-500 font-bold text-xs uppercase tracking-widest">
            Good to Know
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-forest-900 dark:text-[#F5F2EB] mt-2">
            Answers to Common Questions
          </h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className={`rounded-2xl border transition-colors overflow-hidden ${
                  isOpen
                    ? 'bg-cream dark:bg-[#132B24] border-brand-500/40 shadow-card'
                    : 'bg-cream dark:bg-[#132B24] border-forest-900/10 dark:border-white/10'
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggle(idx)}
                  aria-expanded={isOpen}
                  className="w-full p-6 flex items-center justify-between text-left font-bold text-forest-900 dark:text-white gap-4 focus:outline-none cursor-pointer"
                >
                  <span className="text-sm sm:text-base">{faq.q}</span>
                  <span
                    className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 ${
                      isOpen
                        ? 'bg-brand-500 text-white rotate-180'
                        : 'bg-white dark:bg-[#0F241E] text-brand-500 border border-forest-900/10 dark:border-white/10 rotate-0'
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.28, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 pt-0 text-sm text-forest-800/75 dark:text-[#F5F2EB]/75 leading-relaxed">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FaqAccordion;
