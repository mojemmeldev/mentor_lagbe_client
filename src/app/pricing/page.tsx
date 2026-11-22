'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { usePageGsapReveal } from '@/hooks/useGsapScroll';
import api from '@/lib/api';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { toast } from 'sonner';
import { CheckCircle2, Sparkles, Zap, Shield, Lock, AlertCircle, ArrowRight } from 'lucide-react';

export default function PricingPage() {
  const pageRef = usePageGsapReveal();
  const { user } = useAuth();
  const router = useRouter();
  const [loadingPlan, setLoadingPlan] = useState<string | null>(null);

  const handleSubscribe = async (planType: 'pro_tutor' | 'pro_student') => {
    if (!user) {
      toast.info('Sign in before choosing a Pro plan.');
      router.push('/sign-in');
      return;
    }

    if (user.role === 'admin') {
      toast.info('Admins already have full access, so no upgrade is needed.');
      return;
    }

    // Role-based subscription authorization guard
    if (user.role === 'student' && planType !== 'pro_student') {
      toast.error('Student accounts can only buy Pro Student ($10).');
      return;
    }

    if (user.role === 'tutor' && planType !== 'pro_tutor') {
      toast.error('Tutor accounts can only buy Pro Tutor ($15).');
      return;
    }

    if (user.plan === 'pro') {
      toast.success('Your Pro plan is already active.');
      return;
    }

    setLoadingPlan(planType);
    try {
      const res = await api.post('/payments/create-checkout-session', { planType });
      if (res.data.success && res.data.url) {
        window.location.href = res.data.url;
      } else {
        toast.error('We could not start the Stripe session.');
      }
    } catch (err: any) {
      console.error('Checkout error:', err);
      toast.error(err.response?.data?.message || 'Could not open secure checkout.');
    } finally {
      setLoadingPlan(null);
    }
  };

  const isTutor = user?.role === 'tutor';
  const isStudent = user?.role === 'student';
  const isAdmin = user?.role === 'admin';
  const hasPro = user?.plan === 'pro';

  return (
    <div ref={pageRef} className="min-h-screen bg-cream/40 dark:bg-[#081612] py-16 transition-colors duration-300">
      <div className="page-header-reveal container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 text-center space-y-4">
        <Badge variant="pro" className="px-3.5 py-1 text-xs rounded-full">
          Secure One-Time Upgrades
        </Badge>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-forest-900 dark:text-[#F5F2EB] tracking-tight">
          Get More From MentorLagbe
        </h1>
        <p className="text-sm sm:text-base text-forest-800/75 dark:text-[#F5F2EB]/75 max-w-xl mx-auto">
          Pick the Pro plan that matches your role. One payment, clear benefits, and role-based access.
        </p>

        {user && (
          <div className="flex flex-wrap items-center justify-center gap-2 mt-4">
            <span className="text-xs font-semibold text-forest-800/60 dark:text-white/60">Signed in as:</span>
            <Badge variant="outline" className="text-xs uppercase font-bold tracking-wider rounded-full border-forest-900/15 dark:border-white/15">
              {user.role}
            </Badge>
            {hasPro ? (
              <div className="inline-flex items-center gap-1.5 rounded-full bg-brand-50 dark:bg-brand-500/20 border border-emerald-500/30 px-3 py-1 text-xs font-bold text-brand-700 dark:text-emerald-300">
                <Sparkles className="h-3.5 w-3.5" />
                Pro Plan Active
              </div>
            ) : (
              <Badge variant="secondary" className="text-xs rounded-full">
                Free Plan
              </Badge>
            )}
          </div>
        )}

        {/* Pricing Cards with Clean 2D Lift & Strict Role Access Controls */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 max-w-4xl mx-auto gap-8 text-left items-stretch">
          {/* 1. TUTOR PRO PLAN CARD */}
          <Card
            className={`page-card-reveal flex flex-col justify-between h-full border ${
              isStudent
                ? 'border-forest-900/10 dark:border-white/10 opacity-75 bg-cream/30 dark:bg-[#0F241E]/40'
                : 'border-brand-500/30 shadow-card bg-white dark:bg-[#0F241E] hover:border-brand-500/60 hover:shadow-soft'
            } relative overflow-hidden p-8 rounded-3xl hover:-translate-y-1.5 transition-all duration-300`}
          >
              <div className="absolute top-0 right-0 bg-brand-500 text-white text-[11px] font-black px-4 py-1.5 rounded-bl-2xl uppercase tracking-wider">
                For Mentors Only
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <Zap className="h-5 w-5 text-brand-500" />
                  <span className="text-xs font-bold uppercase text-brand-500 tracking-wider">
                    Tutor Pro Plan
                  </span>
                </div>

                <div className="mt-4 flex items-baseline gap-1.5">
                  <span className="font-serif text-5xl font-black text-forest-900 dark:text-white">$15</span>
                  <span className="text-sm text-forest-800/60 dark:text-white/60 font-medium">USD once, yours for good</span>
                </div>
                <p className="text-xs text-forest-800/75 dark:text-[#F5F2EB]/75 mt-2 leading-relaxed">
                  Grow your tutoring work with unlimited batches and a verified mentor badge that builds trust fast.
                </p>

                {/* Role Warning Banner if Student views Tutor card */}
                {isStudent && (
                  <div className="mt-4 p-3 rounded-2xl bg-brand-100 dark:bg-brand-500/20 border border-brand-500/30 flex items-start gap-2.5 text-xs text-brand-700 dark:text-brand-100">
                    <Lock className="h-4 w-4 shrink-0 mt-0.5" />
                    <span>
                      <strong>For tutors only.</strong> Your profile is a student account, so the Pro Student plan below is the one available to you.
                    </span>
                  </div>
                )}

                <div className="mt-8 space-y-3.5 text-xs text-forest-900 dark:text-white">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-4 w-4 text-brand-600 dark:text-brand-100 shrink-0 mt-0.5" />
                    <span>
                      <strong>Unlimited Batch Posts</strong> (Free plan allows 2)
                    </span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-4 w-4 text-brand-600 dark:text-brand-100 shrink-0 mt-0.5" />
                    <span>
                      <strong>Pro Tutor Verified Badge</strong> shown on your listings and profile
                    </span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-4 w-4 text-brand-600 dark:text-brand-100 shrink-0 mt-0.5" />
                    <span>
                      <strong>Top Search Placement</strong> across the catalog
                    </span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-4 w-4 text-brand-600 dark:text-brand-100 shrink-0 mt-0.5" />
                    <span>Instant SMS and inbox alerts for new applicants</span>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-forest-900/10 dark:border-white/10">
                {!user ? (
                  <Button
                    onClick={() => router.push('/sign-in')}
                    className="w-full font-bold h-12 text-sm rounded-full shadow-soft bg-forest-900 text-white hover:bg-forest-800 cursor-pointer"
                  >
                    Sign In as Tutor ($15)
                  </Button>
                ) : isAdmin ? (
                  <Button disabled className="w-full font-bold h-12 text-xs opacity-60 rounded-full">
                    Admin Access Active
                  </Button>
                ) : isStudent ? (
                  <Button
                    disabled
                    variant="outline"
                    className="w-full font-bold h-12 text-xs opacity-50 cursor-not-allowed rounded-full border-forest-900/15 dark:border-white/15"
                  >
                    <Lock className="h-3.5 w-3.5 mr-1" />
                    Tutor Access Required
                  </Button>
                ) : isTutor && hasPro ? (
                  <Button disabled className="w-full font-bold h-12 text-sm bg-brand-600 text-white opacity-90 rounded-full">
                    <CheckCircle2 className="h-4 w-4 mr-1.5" />
                    Pro Tutor Is Active
                  </Button>
                ) : (
                  <Button
                    onClick={() => handleSubscribe('pro_tutor')}
                    disabled={loadingPlan === 'pro_tutor'}
                    variant="default"
                    className="w-full font-bold shadow-[0_12px_30px_-6px_rgba(20,175,81,0.35)] h-12 text-sm rounded-full cursor-pointer hover:bg-brand-600"
                  >
                    {loadingPlan === 'pro_tutor'
                      ? 'Opening secure checkout...'
                      : 'Upgrade to Pro ($15)'}
                  </Button>
                )}
              </div>
            </Card>

          {/* 2. STUDENT PRO PLAN CARD */}
          <Card
            className={`page-card-reveal flex flex-col justify-between h-full border ${
              isTutor
                ? 'border-forest-900/10 dark:border-white/10 opacity-75 bg-cream/30 dark:bg-[#0F241E]/40'
                : 'border-forest-900/20 dark:border-white/20 shadow-card bg-white dark:bg-[#0F241E] hover:border-emerald-500/50 hover:shadow-soft'
            } relative overflow-hidden p-8 rounded-3xl hover:-translate-y-1.5 transition-all duration-300`}
          >
              <div className="absolute top-0 right-0 bg-forest-900 dark:bg-emerald-700 text-white text-[11px] font-black px-4 py-1.5 rounded-bl-2xl uppercase tracking-wider">
                For Students Only
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-forest-900 dark:text-brand-100" />
                  <span className="text-xs font-bold uppercase text-forest-900 dark:text-brand-100 tracking-wider">
                    Student Pro Plan
                  </span>
                </div>

                <div className="mt-4 flex items-baseline gap-1.5">
                  <span className="font-serif text-5xl font-black text-forest-900 dark:text-white">$10</span>
                  <span className="text-sm text-forest-800/60 dark:text-white/60 font-medium">USD once, yours for good</span>
                </div>
                <p className="text-xs text-forest-800/75 dark:text-[#F5F2EB]/75 mt-2 leading-relaxed">
                  Move to the front of competitive batches and unlock direct academic support.
                </p>

                {/* Role Warning Banner if Tutor views Student card */}
                {isTutor && (
                  <div className="mt-4 p-3 rounded-2xl bg-brand-100 dark:bg-brand-500/20 border border-brand-500/30 flex items-start gap-2.5 text-xs text-brand-700 dark:text-brand-100">
                    <Lock className="h-4 w-4 shrink-0 mt-0.5" />
                    <span>
                      <strong>For students only.</strong> Your profile is a tutor account, so use the Tutor Pro plan above.
                    </span>
                  </div>
                )}

                <div className="mt-8 space-y-3.5 text-xs text-forest-900 dark:text-white">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-4 w-4 text-brand-600 dark:text-brand-100 shrink-0 mt-0.5" />
                    <span>
                      <strong>Priority Applications:</strong> first in the mentor review queue
                    </span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-4 w-4 text-brand-600 dark:text-brand-100 shrink-0 mt-0.5" />
                    <span>
                      <strong>Verified Pro Badge:</strong> stand out to top mentors
                    </span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-4 w-4 text-brand-600 dark:text-brand-100 shrink-0 mt-0.5" />
                    <span>
                      <strong>Faster Reviews:</strong> mentor decisions up to 2x faster
                    </span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-4 w-4 text-brand-600 dark:text-brand-100 shrink-0 mt-0.5" />
                    <span>Early access to future study resources and test series</span>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-forest-900/10 dark:border-white/10">
                {!user ? (
                  <Button
                    onClick={() => router.push('/sign-in')}
                    variant="outline"
                    className="w-full font-bold h-12 text-sm rounded-full border-forest-900/15 dark:border-white/15 text-forest-900 dark:text-white hover:bg-forest-900/5 cursor-pointer"
                  >
                    Sign In as Student ($10)
                  </Button>
                ) : isAdmin ? (
                  <Button disabled className="w-full font-bold h-12 text-xs opacity-60 rounded-full">
                    Admin Access Active
                  </Button>
                ) : isTutor ? (
                  <Button
                    disabled
                    variant="outline"
                    className="w-full font-bold h-12 text-xs opacity-50 cursor-not-allowed rounded-full border-forest-900/15 dark:border-white/15"
                  >
                    <Lock className="h-3.5 w-3.5 mr-1" />
                    Student Access Required
                  </Button>
                ) : isStudent && hasPro ? (
                  <Button disabled className="w-full font-bold h-12 text-sm bg-brand-600 text-white opacity-90 rounded-full">
                    <CheckCircle2 className="h-4 w-4 mr-1.5" />
                    Pro Student Is Active
                  </Button>
                ) : (
                  <Button
                    onClick={() => handleSubscribe('pro_student')}
                    disabled={loadingPlan === 'pro_student'}
                    variant="default"
                    className="w-full font-bold h-12 text-sm rounded-full shadow-soft cursor-pointer hover:bg-brand-500 transition-colors"
                  >
                    {loadingPlan === 'pro_student'
                      ? 'Opening secure checkout...'
                      : 'Upgrade to Pro ($10)'}
                  </Button>
                )}
              </div>
            </Card>
        </div>
      </div>
    </div>
  );
}