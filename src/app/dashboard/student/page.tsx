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
  FileText,
  CheckCircle,
  Clock,
  Sparkles,
  ArrowRight,
  Search,
  BookOpen,
} from 'lucide-react';

export default function StudentOverviewPage() {
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
      .catch((err) => console.error('Failed to load stats:', err))
      .finally(() => setLoading(false));
  }, []);

  const statCards = [
    {
      label: 'Total Applied',
      value: stats?.totalApplied || 0,
      note: 'Submitted applications',
      icon: FileText,
      iconWrap: 'bg-brand-500/10 text-brand-600 dark:text-brand-100',
      valueClass: 'text-foreground',
    },
    {
      label: 'Accepted',
      value: stats?.accepted || 0,
      note: 'Confirmed tuition batches',
      icon: CheckCircle,
      iconWrap: 'bg-brand-500/15 text-brand-600 dark:text-brand-100',
      valueClass: 'text-brand-600 dark:text-brand-100',
    },
    {
      label: 'Pending Review',
      value: stats?.pending || 0,
      note: 'Awaiting tutor decision',
      icon: Clock,
      iconWrap: 'bg-amber-100 text-amber-600 dark:bg-amber-500/20 dark:text-amber-300',
      valueClass: 'text-amber-600 dark:text-amber-300',
    },
    {
      label: 'Current Plan',
      value: (stats?.plan || user?.plan || 'FREE').toUpperCase(),
      note: stats?.plan === 'pro' || user?.plan === 'pro' ? 'Priority access active' : 'Upgrade for more benefits',
      icon: Sparkles,
      iconWrap: 'bg-brand-500/10 text-brand-600 dark:text-brand-100',
      valueClass: 'text-foreground text-2xl sm:text-3xl',
      isPlan: true,
    },
  ];

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Welcome Banner */}
      <div className="relative overflow-hidden rounded-[2rem] border border-brand-500/15 bg-white dark:bg-[#0F241E] p-6 sm:p-8 shadow-card">
        <div className="absolute -top-24 -right-24 h-56 w-56 rounded-full bg-brand-500/10 blur-3xl pointer-events-none" />
        <div className="relative flex flex-col sm:flex-row sm:items-center justify-between gap-5">
          <div className="space-y-2">
            <div className="flex items-center gap-2.5 flex-wrap">
              <h1 className="text-2xl sm:text-3xl font-serif font-black text-foreground tracking-tight">
                Hello, {user?.name.split(' ')[0]}! 👋
              </h1>
              {user?.plan === 'pro' && (
                <Badge variant="pro" className="text-[10px]">
                  PRO STUDENT
                </Badge>
              )}
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-2xl">
              Track your applications, review accepted batches, and keep your learning journey moving forward.
            </p>
          </div>

          <Link href="/tuitions" className="shrink-0">
            <Button variant="default" className="font-bold gap-2 rounded-full bg-brand-500 hover:bg-brand-600 text-white shadow-[0_12px_30px_-6px_rgba(20,175,81,0.35)]">
              <Search className="h-4 w-4" />
              Find More Tuitions
            </Button>
          </Link>
        </div>
      </div>

      {/* Stats Cards Grid */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {Array.from({ length: 4 }).map((_, i) => (
            <DashboardStatCardSkeleton key={i} />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {statCards.map((card) => {
            const Icon = card.icon;
            return (
              <Card key={card.label} className="p-6 border border-forest-900/10 dark:border-white/10 shadow-card rounded-3xl bg-white dark:bg-[#0F241E] hover:shadow-soft hover:-translate-y-0.5 transition-all">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-muted-foreground uppercase tracking-wide">{card.label}</span>
                  <div className={`h-10 w-10 rounded-2xl flex items-center justify-center ${card.iconWrap}`}>
                    <Icon className="h-4 w-4" />
                  </div>
                </div>
                <div className="mt-5">
                  <p className={`text-3xl sm:text-4xl font-serif font-black ${card.valueClass}`}>
                    {card.value}
                  </p>
                  {card.isPlan ? (
                    stats?.plan === 'pro' || user?.plan === 'pro' ? (
                      <p className="text-[11px] text-brand-600 dark:text-brand-100 font-bold mt-1">{card.note}</p>
                    ) : (
                      <Link href="/pricing" className="text-[11px] text-brand-600 dark:text-brand-100 font-bold hover:underline mt-1 block">
                        Upgrade to Pro ($10) →
                      </Link>
                    )
                  ) : (
                    <p className="text-[11px] text-muted-foreground mt-1">{card.note}</p>
                  )}
                </div>
              </Card>
            );
          })}
        </div>
      )}

      {/* Quick Navigation Card */}
      <Card className="p-6 sm:p-7 border border-forest-900/10 dark:border-white/10 shadow-card bg-white dark:bg-[#0F241E] rounded-[2rem] space-y-5">
        <div className="flex items-center justify-between gap-3">
          <h3 className="text-base sm:text-lg font-serif font-bold text-foreground">Quick Action Center</h3>
          <span className="text-[11px] font-bold text-brand-600 dark:text-brand-100 bg-brand-500/10 px-3 py-1 rounded-full">Student Dashboard</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Link
            href="/dashboard/student/my-applications"
            className="flex items-center justify-between p-4 sm:p-5 rounded-2xl border border-forest-900/10 dark:border-white/10 bg-cream/40 dark:bg-white/5 hover:border-brand-500/40 hover:bg-brand-50/40 dark:hover:bg-brand-500/10 hover:shadow-soft transition-all group"
          >
            <div className="flex items-center gap-3.5">
              <div className="h-11 w-11 rounded-2xl bg-brand-500/10 text-brand-600 dark:text-brand-100 flex items-center justify-center shrink-0">
                <FileText className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-bold text-foreground">View My Applications</p>
                <p className="text-xs text-muted-foreground mt-0.5">Check status or cancel pending requests</p>
              </div>
            </div>
            <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-brand-500 group-hover:translate-x-1 transition-all" />
          </Link>

          <Link
            href="/dashboard/profile"
            className="flex items-center justify-between p-4 sm:p-5 rounded-2xl border border-forest-900/10 dark:border-white/10 bg-cream/40 dark:bg-white/5 hover:border-brand-500/40 hover:bg-brand-50/40 dark:hover:bg-brand-500/10 hover:shadow-soft transition-all group"
          >
            <div className="flex items-center gap-3.5">
              <div className="h-11 w-11 rounded-2xl bg-brand-500/10 text-brand-600 dark:text-brand-100 flex items-center justify-center shrink-0">
                <BookOpen className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-bold text-foreground">Update Profile Details</p>
                <p className="text-xs text-muted-foreground mt-0.5">Keep your contact information up to date</p>
              </div>
            </div>
            <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-brand-500 group-hover:translate-x-1 transition-all" />
          </Link>
        </div>
      </Card>
    </div>
  );
}
