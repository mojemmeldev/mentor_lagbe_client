'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export const DualCtaBanner: React.FC = () => {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-cream dark:bg-[#081612]">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-6">
        {/* Student CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          whileHover={{ y: -4 }}
          className="bg-forest-900 rounded-[2.5rem] p-8 sm:p-12 text-white flex flex-col justify-between relative overflow-hidden shadow-soft"
        >
          <div className="relative z-10">
            <span className="text-xs font-bold uppercase tracking-widest text-brand-500">
              For Learners &amp; Families
            </span>
            <h3 className="font-serif text-3xl font-bold mt-2 mb-3">Need a Mentor Who Gets It?</h3>
            <p className="text-sm text-white/80 max-w-md mb-8 leading-relaxed">
              Browse vetted batches for SSC, HSC, medical and engineering admissions, and coding.
            </p>
          </div>
          <div className="relative z-10">
            <Link
              href="/tuitions"
              className="inline-flex items-center gap-2 bg-brand-500 hover:bg-brand-600 text-white font-bold text-sm px-6 py-3.5 rounded-full transition-all shadow-[0_12px_30px_-6px_rgba(20,175,81,0.35)]"
            >
              <span>See Every Batch</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </motion.div>

        {/* Educator CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.12 }}
          whileHover={{ y: -4 }}
          className="bg-brand-500 rounded-[2.5rem] p-8 sm:p-12 text-white flex flex-col justify-between relative overflow-hidden shadow-soft"
        >
          <div className="relative z-10">
            <span className="text-xs font-bold uppercase tracking-widest text-white/90">
              For Mentors
            </span>
            <h3 className="font-serif text-3xl font-bold mt-2 mb-3">Ready to Teach and Inspire?</h3>
            <p className="text-sm text-white/90 max-w-md mb-8 leading-relaxed">
              Publish your batches with no agency cut and build real connections with motivated students.
            </p>
          </div>
          <div className="relative z-10">
            <Link
              href="/become-a-tutor"
              className="inline-flex items-center gap-2 bg-white text-forest-900 hover:bg-cream font-bold text-sm px-6 py-3.5 rounded-full transition-all shadow-sm"
            >
              <span>Join as a Mentor</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default DualCtaBanner;
