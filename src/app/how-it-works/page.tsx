'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { usePageGsapReveal } from '@/hooks/useGsapScroll';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  ShieldCheck,
  CheckCircle2,
  Lock,
  Search,
  Compass,
  GraduationCap,
  Users,
  FileCheck,
  HeartHandshake,
  ArrowRight,
} from 'lucide-react';

export default function HowItWorksPage() {
  const pageRef = usePageGsapReveal();

  const studentSteps = [
    {
      step: '1',
      title: 'Find the Perfect Batch',
      desc: 'Filter by subject, grade, curriculum and format, including online or home sessions in your city.',
    },
    {
      step: '2',
      title: 'Check Mentor Credentials',
      desc: 'Review education history, verified badges, syllabus coverage, monthly fees, and learner ratings.',
    },
    {
      step: '3',
      title: 'Send a Quick Application',
      desc: 'Share your contact details and preferred times. Free accounts can apply with no booking charge.',
    },
    {
      step: '4',
      title: 'Get Accepted and Start Learning',
      desc: 'After acceptance, agree on a trial or regular schedule and start making progress.',
    },
  ];

  const tutorSteps = [
    {
      step: '1',
      title: 'Create Your Tutor Profile',
      desc: 'Add your name, phone number, bio, and institution such as BUET, DU or DMC.',
    },
    {
      step: '2',
      title: 'Publish Your Batches',
      desc: 'Set the subject, fee, weekly days, and format. Free mentors get two live batches; Pro mentors get unlimited posts.',
    },
    {
      step: '3',
      title: 'Admin Review and Approval',
      desc: 'Our admins review each listing before it goes live so the marketplace stays trustworthy.',
    },
    {
      step: '4',
      title: 'Review Applicants in One Place',
      desc: 'Handle every applicant from your dashboard and accept or decline with one click.',
    },
  ];

  const safetyGuarantees = [
    {
      icon: FileCheck,
      title: 'ID and Campus Checks',
      desc: 'Admins check university IDs, student cards, and certificates before awarding a verified badge.',
    },
    {
      icon: Lock,
      title: 'Protected Stripe Checkout',
      desc: 'Pro upgrades run through 256-bit encrypted Stripe checkout, and we never store your card details.',
    },
    {
      icon: HeartHandshake,
      title: 'Safe Home Tuition',
      desc: 'For home lessons, families should check physical national IDs and hold sessions in a shared study space.',
    },
    {
      icon: ShieldCheck,
      title: 'Active Moderation',
      desc: 'Listings and reports are reviewed actively, and fake profiles or misleading ads are removed quickly.',
    },
  ];

  return (
    <div ref={pageRef} className="flex flex-col min-h-screen bg-cream/40 dark:bg-[#081612] transition-colors duration-300">
      {/* 1. Header */}
      <section className="page-header-reveal py-16 sm:py-20 border-b border-forest-900/10 dark:border-white/10 bg-cream/60 dark:bg-[#0B1E19]">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <Badge variant="default" className="mb-3 font-bold rounded-full text-xs">
            <ShieldCheck className="h-3.5 w-3.5 mr-1" /> Clear, Safe and Verified
          </Badge>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-forest-900 dark:text-[#F5F2EB] tracking-tight">
            How MentorLagbe Works & <span className="text-brand-500 underline decoration-brand-500/40 underline-offset-4">How We Keep You Safe</span>
          </h1>
          <p className="text-sm sm:text-base text-forest-800/75 dark:text-[#F5F2EB]/75 max-w-2xl mx-auto mt-3">
            See how MentorLagbe links serious learners with university mentors, and learn about the checks that keep everyone safe.
          </p>
        </div>
      </section>

      {/* 2. Dual Workflows */}
      <section className="py-16 sm:py-24">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-20">
          {/* For Students */}
          <div>
            <div className="flex items-center gap-3 mb-8">
              <div className="h-10 w-10 rounded-2xl bg-brand-50 dark:bg-brand-500/20 border border-brand-500/20 flex items-center justify-center text-brand-500">
                <GraduationCap className="h-6 w-6" />
              </div>
              <div>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-forest-900 dark:text-[#F5F2EB]">For Students & Parents</h2>
                <p className="text-xs text-forest-800/60 dark:text-white/60 font-semibold">Four easy steps from search to your first lesson.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {studentSteps.map((st) => (
                <motion.div
                  key={st.step}
                  whileHover={{ y: -4 }}
                  transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                  className="page-card-reveal p-6 sm:p-7 rounded-3xl border border-forest-900/10 dark:border-white/10 bg-white dark:bg-[#0F241E] shadow-card hover:shadow-soft transition-all"
                >
                  <span className="font-serif text-3xl font-extrabold text-brand-500 block mb-3">0{st.step}</span>
                  <h3 className="font-serif text-base font-bold text-forest-900 dark:text-white mb-2">{st.title}</h3>
                  <p className="text-xs text-forest-800/70 dark:text-white/70 leading-relaxed">{st.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* For Tutors */}
          <div>
            <div className="flex items-center gap-3 mb-8">
              <div className="h-10 w-10 rounded-2xl bg-cream dark:bg-[#153028] border border-forest-900/10 dark:border-white/10 flex items-center justify-center text-forest-900 dark:text-white">
                <Users className="h-6 w-6" />
              </div>
              <div>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-forest-900 dark:text-[#F5F2EB]">For Teachers & Mentors</h2>
                <p className="text-xs text-forest-800/60 dark:text-white/60 font-semibold">Connect with real learners across Bangladesh.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {tutorSteps.map((st) => (
                <motion.div
                  key={st.step}
                  whileHover={{ y: -4 }}
                  transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                  className="page-card-reveal p-6 sm:p-7 rounded-3xl border border-forest-900/10 dark:border-white/10 bg-white dark:bg-[#0F241E] shadow-card hover:shadow-soft transition-all"
                >
                  <span className="font-serif text-3xl font-extrabold text-forest-900 dark:text-brand-100 block mb-3">0{st.step}</span>
                  <h3 className="font-serif text-base font-bold text-forest-900 dark:text-white mb-2">{st.title}</h3>
                  <p className="text-xs text-forest-800/70 dark:text-white/70 leading-relaxed">{st.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 3. Safety & Trust Section */}
      <section className="py-16 sm:py-24 bg-cream/70 dark:bg-[#0B1E19] border-y border-forest-900/10 dark:border-white/10">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Graphic */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-full max-w-md">
                <div className="overflow-hidden rounded-3xl border border-forest-900/10 dark:border-white/10 bg-white dark:bg-[#0F241E] shadow-card">
                  <img
                    src="/images/trust-safety.jpg"
                    alt="Trust and Safety Shield"
                    className="h-[380px] w-full object-cover"
                  />
                </div>
              </div>
            </div>

            {/* Right Safety Pillars */}
            <div className="lg:col-span-7 space-y-6">
              <Badge variant="outline" className="rounded-full border-forest-900/15 dark:border-white/15">Our Trust Policy</Badge>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-forest-900 dark:text-[#F5F2EB] tracking-tight">
                How We Protect Learners and Mentors
              </h2>
              <p className="text-sm text-forest-800/75 dark:text-[#F5F2EB]/75 leading-relaxed">
                Trust sits at the center of good mentoring. Our verification and safety rules help learners study in safe settings and mentors earn fair pay.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                {safetyGuarantees.map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <motion.div
                      key={idx}
                      whileHover={{ y: -3 }}
                      transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                      className="page-card-reveal p-4 sm:p-5 rounded-2xl border border-forest-900/10 dark:border-white/10 bg-white dark:bg-[#0F241E] shadow-card space-y-2"
                    >
                      <div className="flex items-center gap-2 text-brand-500 font-bold text-sm">
                        <Icon className="h-4 w-4" />
                        <span>{item.title}</span>
                      </div>
                      <p className="text-xs text-forest-800/70 dark:text-white/70 leading-relaxed">{item.desc}</p>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Bottom Action */}
      <section className="py-16 text-center">
        <div className="container mx-auto max-w-3xl px-4 space-y-6">
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-forest-900 dark:text-[#F5F2EB]">Still Need a Hand?</h2>
          <p className="text-xs sm:text-sm text-forest-800/75 dark:text-[#F5F2EB]/75">
            Our Dhaka support team can help you find a tutor or set up your first batch.
          </p>
          <div className="flex items-center justify-center gap-4">
            <Link href="/tuitions">
              <Button variant="default" className="rounded-full px-6 hover:bg-brand-500 transition-colors cursor-pointer">Browse Tuitions</Button>
            </Link>
            <Link href="/contact">
              <Button variant="outline" className="rounded-full px-6 border-forest-900/15 dark:border-white/15 text-forest-900 dark:text-white hover:bg-forest-900/5 cursor-pointer">Talk to Support</Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}