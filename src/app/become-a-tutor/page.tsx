'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Sparkles,
  ArrowRight,
  CheckCircle2,
  DollarSign,
  Calendar,
  Users,
  ShieldCheck,
  Award,
  Zap,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';

export default function BecomeATutorPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const perks = [
    {
      icon: DollarSign,
      title: 'Zero Hidden Commission',
      desc: 'Keep 100% of your tuition fees. Unlike typical agencies that cut 50-70% of your first month salary, MentorLagbe takes 0% cut.',
    },
    {
      icon: Calendar,
      title: 'Set Your Own Hours',
      desc: 'Choose local face-to-face lessons or online group sessions on Zoom or Google Meet.',
    },
    {
      icon: Users,
      title: 'Meet Motivated Learners Daily',
      desc: 'More than 1,500 learners and parents across Bangladesh search MentorLagbe every day for qualified tutors.',
    },
    {
      icon: Award,
      title: 'Grow a Trusted Profile',
      desc: 'Display your BUET, DU, medical or university background. Verified checks and Pro badges help you stand out.',
    },
  ];

  const steps = [
    {
      num: '01',
      title: 'Create Your Free Account',
      desc: 'Share your university details and teaching bio in under a minute.',
    },
    {
      num: '02',
      title: 'Post Your Tuition Offer',
      desc: 'Choose the subject, level, monthly fee, schedule, and whether you teach online or in person.',
    },
    {
      num: '03',
      title: 'Review Applicant Profiles',
      desc: 'Learners apply to your batch directly. Review their profiles and accept in a single click.',
    },
    {
      num: '04',
      title: 'Teach and Get Paid',
      desc: 'Agree on timings with your students and start running classes that make a difference.',
    },
  ];

  const tutorFaqs = [
    {
      q: 'Is there a fee to register as a tutor?',
      a: 'No. Registration is free. You can build a tutor profile and publish up to two active batches at no cost.',
    },
    {
      q: 'What does the $15 Pro Tutor plan include?',
      a: 'Pro unlocks unlimited batches, a verified PRO badge, higher search placement, and instant alerts when learners apply.',
    },
    {
      q: 'Can I offer both online and home lessons?',
      a: 'Yes. Each listing can be set to online, offline home tutoring, or both.',
    },
    {
      q: 'How do students pay their tutor?',
      a: 'Learners pay you directly at the rate shown in your listing. MentorLagbe takes 0% of your monthly earnings.',
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-cream/40 dark:bg-[#081612] transition-colors duration-300">
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden py-16 sm:py-24 border-b border-forest-900/10 dark:border-white/10 bg-cream/60 dark:bg-[#0B1E19]">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Copy */}
            <div className="lg:col-span-7 space-y-6">
              <Badge variant="default" className="px-3.5 py-1 text-xs font-bold rounded-full">
                <Sparkles className="h-3.5 w-3.5 mr-1" />
                Teach With Bangladesh&apos;s Growing Mentor Network
              </Badge>

              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-forest-900 dark:text-[#F5F2EB] tracking-tight leading-[1.12]">
                Share What You Know, <br />
                <span className="text-brand-500 underline decoration-brand-500/40 underline-offset-4">On Your Own Terms</span>
              </h1>

              <p className="text-base sm:text-lg text-forest-800/75 dark:text-[#F5F2EB]/75 leading-relaxed max-w-2xl">
                Join MentorLagbe as a verified mentor. Publish batches, set your rates, and speak directly with students and parents across Bangladesh.
              </p>

              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
                <Link href="/sign-up">
                  <Button size="lg" variant="default" className="gap-2 rounded-full font-bold shadow-[0_12px_30px_-6px_rgba(20,175,81,0.35)] cursor-pointer">
                    Start Teaching for Free
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/pricing">
                  <Button size="lg" variant="outline" className="rounded-full border-forest-900/15 dark:border-white/15 text-forest-900 dark:text-white hover:bg-forest-900/5 cursor-pointer">
                    See Pro Tutor Perks
                  </Button>
                </Link>
              </div>

              {/* Stats checklist */}
              <div className="pt-6 grid grid-cols-2 sm:grid-cols-3 gap-3 border-t border-forest-900/10 dark:border-white/10 text-xs text-forest-800/70 dark:text-white/70">
                <Badge variant="success" className="rounded-full">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  0% Commission
                </Badge>
                <Badge variant="default" className="rounded-full">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  Direct Student Leads
                </Badge>
                <Badge variant="secondary" className="rounded-full">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  Teach Online or In Person
                </Badge>
              </div>
            </div>

            {/* Right Hero Image */}
            <div className="lg:col-span-5 relative flex justify-center">
              <div className="relative w-full max-w-md">
                <div className="overflow-hidden rounded-3xl border border-forest-900/10 dark:border-white/10 bg-white dark:bg-[#0F241E] shadow-card">
                  <img
                    src="/images/become-a-tutor.jpg"
                    alt="Become a Mentor on MentorLagbe"
                    className="h-[420px] w-full object-cover"
                  />
                </div>

                {/* Floating Badge */}
                <div className="absolute -bottom-5 -left-4 rounded-2xl border border-forest-900/10 dark:border-white/10 bg-white dark:bg-[#0F241E] p-4 shadow-card flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-brand-50 dark:bg-brand-500/20 border border-brand-500/20 flex items-center justify-center text-brand-500">
                    <Zap className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs font-extrabold text-forest-900 dark:text-white">350+ Mentors Onboard</p>
                    <p className="text-[10px] font-semibold text-forest-800/60 dark:text-white/60">Monthly earnings up to ৳ 45,000</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. WHY TEACH ON MENTORLAGBE (PERKS) */}
      <section className="py-16 sm:py-24">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <Badge variant="outline" className="mb-2 rounded-full border-forest-900/15 dark:border-white/15">Why Mentor Here?</Badge>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-forest-900 dark:text-[#F5F2EB] tracking-tight">
              Built Around Successful Teaching
            </h2>
            <p className="text-sm text-forest-800/75 dark:text-[#F5F2EB]/75 mt-2">
              Leave agency commissions behind. You control the schedule, the fee, and who joins your batches.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {perks.map((perk, idx) => {
              const Icon = perk.icon;
              return (
                <motion.div
                  key={idx}
                  whileHover={{ y: -4 }}
                  transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                  className="p-6 sm:p-7 rounded-3xl border border-forest-900/10 dark:border-white/10 bg-white dark:bg-[#0F241E] shadow-card hover:shadow-soft hover:border-brand-500/30 transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="h-12 w-12 rounded-2xl bg-cream dark:bg-[#153028] border border-forest-900/10 dark:border-white/10 text-brand-500 flex items-center justify-center mb-4">
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="font-serif text-base font-bold text-forest-900 dark:text-white mb-2">{perk.title}</h3>
                    <p className="text-xs text-forest-800/70 dark:text-white/70 leading-relaxed">{perk.desc}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. HOW IT WORKS (4 STEPS) */}
      <section className="py-16 sm:py-24 bg-cream/70 dark:bg-[#0B1E19] border-y border-forest-900/10 dark:border-white/10">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <Badge variant="default" className="mb-2 rounded-full">Four Easy Steps</Badge>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-forest-900 dark:text-[#F5F2EB] tracking-tight">
              Go Live in Four Steps
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((st) => (
              <motion.div
                key={st.num}
                whileHover={{ y: -4 }}
                transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                className="relative p-6 sm:p-7 rounded-3xl border border-forest-900/10 dark:border-white/10 bg-white dark:bg-[#0F241E] shadow-card flex flex-col justify-between"
              >
                <div>
                  <span className="font-serif text-3xl font-extrabold text-brand-500/40 block mb-3">{st.num}</span>
                  <h3 className="font-serif text-base font-bold text-forest-900 dark:text-white mb-2">{st.title}</h3>
                  <p className="text-xs text-forest-800/70 dark:text-white/70 leading-relaxed">{st.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link href="/sign-up">
              <Button size="lg" variant="default" className="gap-2 rounded-full font-bold hover:bg-brand-500 transition-colors cursor-pointer">
                Join as a Tutor Now
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* 4. FAQ ACCORDION WITH ANIMATEPRESENCE */}
      <section className="py-16 sm:py-24">
        <div className="container mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-2 rounded-full border-forest-900/15 dark:border-white/15">Before You Start</Badge>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-forest-900 dark:text-[#F5F2EB] tracking-tight">
              Tutor Questions, Answered
            </h2>
          </div>

          <div className="space-y-4">
            {tutorFaqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="rounded-2xl border border-forest-900/10 dark:border-white/10 bg-white dark:bg-[#0F241E] shadow-card overflow-hidden transition-all"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full flex items-center justify-between p-5 text-left text-sm font-bold text-forest-900 dark:text-[#F5F2EB] hover:text-brand-500 transition-colors cursor-pointer"
                  >
                    <span>{faq.q}</span>
                    {isOpen ? (
                      <ChevronUp className="h-4 w-4 shrink-0 text-brand-500" />
                    ) : (
                      <ChevronDown className="h-4 w-4 shrink-0 text-forest-800/40 dark:text-white/40" />
                    )}
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="overflow-hidden"
                      >
                        <div className="px-5 pb-5 text-xs text-forest-800/75 dark:text-[#F5F2EB]/75 leading-relaxed border-t border-forest-900/10 dark:border-white/10 pt-3">
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

      {/* 5. BOTTOM CTA BANNER */}
      <section className="py-16 bg-forest-900 text-white dark:bg-[#0F241E] border-t border-forest-900/10 dark:border-white/10">
        <div className="container mx-auto max-w-5xl px-4 text-center space-y-6">
          <h2 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight">
            Ready to Shape the Next Batch of Achievers?
          </h2>
          <p className="text-sm sm:text-base text-cream/90 max-w-2xl mx-auto">
            Join mentors from BUET, DMC, DU and other leading institutions already growing their classes on MentorLagbe.
          </p>
          <div className="pt-2">
            <Link href="/sign-up">
              <Button size="lg" variant="default" className="px-8 py-6 text-base font-black rounded-full shadow-[0_12px_30px_-6px_rgba(20,175,81,0.35)] cursor-pointer">
                Open Your Free Tutor Account
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}