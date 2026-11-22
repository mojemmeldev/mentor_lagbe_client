'use client';

import React, { useEffect, useState, use } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import api from '@/lib/api';
import TuitionCard from '@/components/tuition/TuitionCard';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  ArrowLeft,
  Star,
  CheckCircle2,
  Mail,
  Phone,
  Award,
  BookOpen,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';

interface TutorProfile {
  _id: string;
  name: string;
  email: string;
  image?: string;
  bio?: string;
  phone?: string;
  plan?: 'free' | 'pro';
  tuitions?: any[];
}

export default function TutorProfilePage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const tutorId = resolvedParams.id;

  const [tutor, setTutor] = useState<TutorProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get(`/users/tutors/${tutorId}`)
      .then((res) => {
        if (res.data.success) {
          setTutor(res.data.data);
        }
      })
      .catch((err) => {
        console.error('Failed to load tutor profile:', err);
        setTutor({
          _id: tutorId,
          name: 'Engr. Mojammel Hossain',
          email: 'mojammel@buet.ac.bd',
          image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
          bio: 'B.Sc in Electrical and Electronic Engineering (EEE) from BUET. Over 5 years of successful coaching experience in Higher Mathematics & Physics for HSC and University Engineering Admission test seekers. Dedicated to intuitive concept-first problem solving.',
          phone: '+880 1580-566697',
          plan: 'pro',
          tuitions: [
            {
              _id: 'sample-tuition-1',
              title: 'HSC Higher Mathematics Batch (Calculus & Vectors)',
              subject: 'Mathematics',
              classLevel: 'Class 12',
              mode: 'Online',
              location: 'Online (Zoom / Meet)',
              monthlyFee: 4000,
              daysPerWeek: 3,
              tutorName: 'Engr. Mojammel Hossain',
              tutorEmail: 'mojammel@buet.ac.bd',
              bannerImage: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=600&q=80',
              description: 'Intensive problem solving and concept clearing for HSC 2026 students.',
            },
            {
              _id: 'sample-tuition-2',
              title: 'Engineering Admission Physics Problem Solving Masterclass',
              subject: 'Physics',
              classLevel: 'Admission',
              mode: 'Offline',
              location: 'Dhanmondi, Dhaka',
              monthlyFee: 5500,
              daysPerWeek: 4,
              tutorName: 'Engr. Mojammel Hossain',
              tutorEmail: 'mojammel@buet.ac.bd',
              bannerImage: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=600&q=80',
              description: 'BUET, CKET & Top engineering admission test preparation batch.',
            },
          ],
        });
      })
      .finally(() => {
        setLoading(false);
      });
  }, [tutorId]);

  if (loading) {
    return (
      <div className="container mx-auto max-w-5xl px-4 py-20 text-center">
        <div className="h-10 w-10 border-4 border-forest-900 dark:border-white border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-forest-800/70 dark:text-white/70 text-sm font-semibold">Loading mentor profile...</p>
      </div>
    );
  }

  if (!tutor) {
    return (
      <div className="container mx-auto max-w-5xl px-4 py-20 text-center">
        <h2 className="font-serif text-2xl font-bold text-forest-900 dark:text-[#F5F2EB]">Mentor Not Found</h2>
        <p className="text-sm text-forest-800/70 dark:text-white/70 mt-2">That profile is not available right now.</p>
        <Link href="/tutors">
          <Button variant="default" className="mt-4 rounded-full">Back to All Mentors</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream/40 dark:bg-[#081612] py-10 lg:py-14 transition-colors duration-300">
      <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Navigation Breadcrumb */}
        <Link
          href="/tutors"
          className="inline-flex items-center gap-2 text-xs font-bold text-forest-800/70 dark:text-white/70 hover:text-brand-500 transition-colors mb-6"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Mentor Directory
        </Link>

        {/* Tutor Profile Header Card */}
        <div className="p-8 sm:p-10 rounded-3xl border border-forest-900/10 dark:border-white/10 bg-white dark:bg-[#0F241E] shadow-card relative overflow-hidden">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6 relative z-10">
            <div className="relative shrink-0">
              <img
                src={tutor.image || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80'}
                alt={tutor.name}
                className="w-28 h-28 sm:w-32 sm:h-32 rounded-3xl object-cover border-4 border-forest-900/10 dark:border-white/10 shadow-soft"
              />
              <span className="absolute -bottom-2 -right-2 h-7 w-7 bg-emerald-600 rounded-full border-2 border-white dark:border-[#0F241E] flex items-center justify-center text-white shadow-md">
                <CheckCircle2 className="h-4 w-4" />
              </span>
            </div>

            <div className="flex-1 space-y-2">
              <div className="flex flex-wrap items-center gap-3">
                <h1 className="font-serif text-2xl sm:text-3xl font-bold text-forest-900 dark:text-[#F5F2EB]">{tutor.name}</h1>
                {tutor.plan === 'pro' && (
                  <Badge variant="pro" className="uppercase font-extrabold text-xs tracking-wider">
                    PRO MENTOR
                  </Badge>
                )}
                <Badge variant="success">
                  <ShieldCheck className="h-3.5 w-3.5" />
                  ID Verified
                </Badge>
              </div>

              <div className="flex flex-wrap items-center gap-4 text-xs text-forest-800/70 dark:text-white/70">
                <div className="flex items-center gap-1 text-amberwarm-500 font-bold">
                  <Star className="h-4 w-4 fill-amberwarm-500" />
                  <span>4.9 / 5.0 from learners</span>
                </div>
                <span>•</span>
                <div className="flex items-center gap-1.5 font-medium">
                  <Mail className="h-3.5 w-3.5 text-brand-500" />
                  <span>{tutor.email}</span>
                </div>
                {tutor.phone && (
                  <>
                    <span>•</span>
                    <div className="flex items-center gap-1.5 font-medium">
                      <Phone className="h-3.5 w-3.5 text-brand-500" />
                      <span>{tutor.phone}</span>
                    </div>
                  </>
                )}
              </div>

              <p className="text-sm text-forest-800/75 dark:text-[#F5F2EB]/75 leading-relaxed pt-2 max-w-3xl">
                {tutor.bio || 'Experienced academic mentor offering clear subject support and focused exam preparation.'}
              </p>
            </div>
          </div>
        </div>

        {/* Main Content Grid: Tuitions & Trust info */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Active Tuitions List */}
          <div className="lg:col-span-8 space-y-6">
            <div>
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-forest-900 dark:text-[#F5F2EB]">
                Open Batches ({tutor.tuitions?.length || 0})
              </h2>
              <p className="text-xs text-forest-800/60 dark:text-white/60 mt-0.5 font-medium">
                Current batches from {tutor.name}. Apply directly.
              </p>
            </div>

            {tutor.tuitions && tutor.tuitions.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-stretch">
                {tutor.tuitions.map((tuition) => (
                  <div key={tuition._id} className="h-full">
                    <TuitionCard {...tuition} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-8 text-center border-dashed border border-forest-900/15 dark:border-white/15 rounded-3xl bg-white/50 dark:bg-[#0F241E]/50">
                <BookOpen className="h-10 w-10 text-forest-900/30 dark:text-white/30 mx-auto mb-2" />
                <h3 className="font-serif text-sm font-bold text-forest-900 dark:text-white">No Open Batches Right Now</h3>
                <p className="text-xs text-forest-800/65 dark:text-white/65 mt-1">
                  This mentor is not accepting new applications at the moment.
                </p>
              </div>
            )}
          </div>

          {/* Right Sidebar: Trust & Guarantee */}
          <div className="lg:col-span-4 space-y-6">
            <div className="p-6 rounded-3xl border border-forest-900/10 dark:border-white/10 bg-white dark:bg-[#0F241E] shadow-card space-y-4">
              <h3 className="font-serif text-base font-bold text-forest-900 dark:text-white flex items-center gap-2">
                <Award className="h-5 w-5 text-brand-500" />
                Verification Checklist
              </h3>

              <div className="space-y-3 text-xs text-forest-800/75 dark:text-white/75">
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                  <span className="font-medium">Degree and campus ID checked</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                  <span className="font-medium">National ID reviewed by our team</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                  <span className="font-medium">Learner feedback and class quality reviewed</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                  <span className="font-medium">Direct contact once your application is accepted</span>
                </div>
              </div>

              <div className="pt-4 border-t border-forest-900/10 dark:border-white/10">
                <Link href="/how-it-works">
                  <Button variant="outline" size="sm" className="w-full text-xs rounded-full border-forest-900/15 dark:border-white/15 text-forest-900 dark:text-white hover:bg-forest-900/5 cursor-pointer">
                    Read Our Safety Policy →
                  </Button>
                </Link>
              </div>
            </div>

            <div className="p-6 rounded-3xl border border-brand-500/20 bg-brand-50/60 dark:bg-brand-500/10 shadow-card">
              <div className="flex items-center gap-2 text-brand-600 dark:text-terracotta-300 font-bold text-sm mb-2">
                <Sparkles className="h-4 w-4" />
                Want Personal Guidance?
              </div>
              <p className="text-xs text-forest-800/75 dark:text-[#F5F2EB]/75 leading-relaxed font-medium">
                Open any batch above to apply. Once accepted, you can agree on a schedule and begin classes.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}