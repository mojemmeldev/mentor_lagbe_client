'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import api from '@/lib/api';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { DashboardStatCardSkeleton } from '@/components/common/Skeleton';
import {
  BookOpen,
  CheckCircle,
  Users,
  Sparkles,
  PlusCircle,
  ArrowRight,
  ShieldCheck,
  AlertTriangle,
} from 'lucide-react';

export default function TutorOverviewPage() {
  const { user } = useAuth();
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/users/dashboard-stats')
      .then((res) => {
        if (res.data.success) {
          setStats(res.data.data);
        }
      })
      .catch((err) => console.error('Failed to load tutor stats:', err))
      .finally(() => setLoading(false));
  }, []);

  const isFreePlan = (stats?.plan || user?.plan) === 'free';
  const postCount = stats?.totalPosted || 0;
  const isAtFreeLimit = isFreePlan && postCount >= 2;

  return (
    <div className="space-y-8 max-w-7xl mx-auto font-sans">
      {/* Welcome Banner */}
      <div className="rounded-3xl bg-gradient-to-r from-forest-900/10 via-brand-500/10 to-terracotta-500/10 border border-forest-900/15 dark:border-white/10 p-6 sm:p-8 shadow-card">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2.5 flex-wrap">
              <h1 className="text-2xl sm:text-3xl font-serif font-black text-foreground tracking-tight">
                Mentor Dashboard: {user?.name.split(' ')[0]} 🎓
              </h1>
              {user?.plan === 'pro' ? (
                <Badge variant="pro" className="text-[10px]">
                  VERIFIED PRO TUTOR
                </Badge>
              ) : (
                <Badge variant="outline" className="text-[10px] rounded-full">
                  FREE PLAN TUTOR
                </Badge>
              )}
            </div>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
              Manage your academic tuition batches, track student applications, and publish new offerings.
            </p>
          </div>

          <Link href="/dashboard/tutor/post-tuition" className="shrink-0">
            <Button variant="default" className="font-bold gap-2 rounded-full shadow-glow">
              <PlusCircle className="h-4 w-4" />
              Post New Tuition
            </Button>
          </Link>
        </div>
      </div>

      {/* Free Plan Limit Notice */}
      {isAtFreeLimit && (
        <div className="rounded-3xl border border-brand-500/40 bg-brand-500/10 p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-soft">
          <div className="flex items-center gap-3.5">
            <div className="h-10 w-10 rounded-2xl bg-brand-500/20 text-brand-500 flex items-center justify-center shrink-0">
              <AlertTriangle className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-amber-900 dark:text-amber-200">
                You have reached your Free Plan limit (2/2 tuitions posted)
              </p>
              <p className="text-[11px] text-amber-700 dark:text-amber-300 mt-0.5">
                Upgrade to the Pro Tutor Plan ($15) to publish unlimited tuitions and get verified.
              </p>
            </div>
          </div>
          <Link href="/pricing" className="shrink-0">
            <Button size="sm" variant="default" className="font-bold shadow-glow rounded-full">
              Upgrade to Pro
            </Button>
          </Link>
        </div>
      )}

      {/* Stats Cards Grid */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {Array.from({ length: 4 }).map((_, i) => (
            <DashboardStatCardSkeleton key={i} />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {/* Total Tuitions */}
          <Card className="p-6 border border-forest-900/10 dark:border-white/10 shadow-card flex flex-col justify-between rounded-3xl bg-card hover:shadow-soft transition-all">
            <div className="flex items-center justify-between text-muted-foreground">
              <span className="text-xs font-bold text-foreground">Total Tuitions Posted</span>
              <div className="h-9 w-9 rounded-2xl bg-forest-900/10 dark:bg-white/10 text-forest-900 dark:text-cream flex items-center justify-center">
                <BookOpen className="h-4 w-4" />
              </div>
            </div>
            <div className="mt-5">
              <p className="text-3xl sm:text-4xl font-serif font-black text-foreground">{postCount}</p>
              <p className="text-[11px] text-muted-foreground mt-1">
                {isFreePlan ? `${postCount} of 2 free slots used` : 'Unlimited postings active'}
              </p>
            </div>
          </Card>

          {/* Active / Approved */}
          <Card className="p-6 border border-forest-900/10 dark:border-white/10 shadow-card flex flex-col justify-between rounded-3xl bg-card hover:shadow-soft transition-all">
            <div className="flex items-center justify-between text-muted-foreground">
              <span className="text-xs font-bold text-foreground">Live on Marketplace</span>
              <div className="h-9 w-9 rounded-2xl bg-brand-500/15 text-brand-600 dark:text-brand-100 flex items-center justify-center">
                <CheckCircle className="h-4 w-4" />
              </div>
            </div>
            <div className="mt-5">
              <p className="text-3xl sm:text-4xl font-serif font-black text-brand-600 dark:text-brand-100">
                {stats?.activeApproved || 0}
              </p>
              <p className="text-[11px] text-muted-foreground mt-1">Approved & active batches</p>
            </div>
          </Card>

          {/* Applicants Received */}
          <Card className="p-6 border border-forest-900/10 dark:border-white/10 shadow-card flex flex-col justify-between rounded-3xl bg-card hover:shadow-soft transition-all">
            <div className="flex items-center justify-between text-muted-foreground">
              <span className="text-xs font-bold text-foreground">Total Applicants</span>
              <div className="h-9 w-9 rounded-2xl bg-terracotta-500/15 text-terracotta-500 flex items-center justify-center">
                <Users className="h-4 w-4" />
              </div>
            </div>
            <div className="mt-5">
              <p className="text-3xl sm:text-4xl font-serif font-black text-terracotta-500">
                {stats?.applicantsReceived || 0}
              </p>
              <p className="text-[11px] text-muted-foreground mt-1">Students waiting for your response</p>
            </div>
          </Card>

          {/* Plan Status */}
          <Card className="p-6 border border-forest-900/10 dark:border-white/10 shadow-card flex flex-col justify-between rounded-3xl bg-card hover:shadow-soft transition-all">
            <div className="flex items-center justify-between text-muted-foreground">
              <span className="text-xs font-bold text-foreground">Current Membership</span>
              <div className="h-9 w-9 rounded-2xl bg-brand-500/15 text-brand-500 flex items-center justify-center">
                <Sparkles className="h-4 w-4" />
              </div>
            </div>
            <div className="mt-5">
              <p className="text-2xl sm:text-3xl font-serif font-black text-foreground uppercase tracking-tight">
                {stats?.plan || user?.plan || 'FREE'}
              </p>
              {stats?.plan === 'pro' || user?.plan === 'pro' ? (
                <p className="text-[11px] text-brand-600 dark:text-brand-100 font-bold mt-1">
                  Verified Tutor Badge Active
                </p>
              ) : (
                <Link
                  href="/pricing"
                  className="text-[11px] text-terracotta-500 font-bold hover:underline mt-1 block"
                >
                  Upgrade to Pro ($15) →
                </Link>
              )}
            </div>
          </Card>
        </div>
      )}

      {/* Quick Links */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <Link
          href="/dashboard/tutor/post-tuition"
          className="p-6 rounded-3xl border border-forest-900/10 dark:border-white/10 bg-card hover:border-terracotta-500/50 shadow-card hover:shadow-soft transition-all group flex flex-col justify-between space-y-4"
        >
          <div className="flex items-center gap-3.5">
            <div className="h-11 w-11 rounded-2xl bg-forest-900/10 dark:bg-white/10 text-forest-900 dark:text-cream flex items-center justify-center shrink-0">
              <PlusCircle className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-bold text-foreground">Post a Tuition</p>
              <p className="text-[11px] text-muted-foreground mt-0.5">Create a new batch listing</p>
            </div>
          </div>
          <span className="text-xs font-bold text-terracotta-500 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
            Go to Post Form <ArrowRight className="h-3.5 w-3.5" />
          </span>
        </Link>

        <Link
          href="/dashboard/tutor/my-tuitions"
          className="p-6 rounded-3xl border border-forest-900/10 dark:border-white/10 bg-card hover:border-terracotta-500/50 shadow-card hover:shadow-soft transition-all group flex flex-col justify-between space-y-4"
        >
          <div className="flex items-center gap-3.5">
            <div className="h-11 w-11 rounded-2xl bg-terracotta-500/15 text-terracotta-500 flex items-center justify-center shrink-0">
              <BookOpen className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-bold text-foreground">My Created Tuitions</p>
              <p className="text-[11px] text-muted-foreground mt-0.5">Edit, delete or toggle status</p>
            </div>
          </div>
          <span className="text-xs font-bold text-terracotta-500 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
            Manage Tuitions <ArrowRight className="h-3.5 w-3.5" />
          </span>
        </Link>

        <Link
          href="/dashboard/tutor/applicants"
          className="p-6 rounded-3xl border border-forest-900/10 dark:border-white/10 bg-card hover:border-terracotta-500/50 shadow-card hover:shadow-soft transition-all group flex flex-col justify-between space-y-4"
        >
          <div className="flex items-center gap-3.5">
            <div className="h-11 w-11 rounded-2xl bg-brand-500/15 text-brand-600 dark:text-brand-100 flex items-center justify-center shrink-0">
              <Users className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-bold text-foreground">Manage Applicants</p>
              <p className="text-[11px] text-muted-foreground mt-0.5">Accept or reject applications</p>
            </div>
          </div>
          <span className="text-xs font-bold text-brand-600 dark:text-brand-100 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
            Review Applicants <ArrowRight className="h-3.5 w-3.5" />
          </span>
        </Link>
      </div>
    </div>
  );
}
