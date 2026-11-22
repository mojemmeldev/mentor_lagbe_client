'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import api from '@/lib/api';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { StatsCardSkeleton } from '@/components/ui/skeleton';
import { formatCurrency } from '@/lib/utils';
import {
  Users,
  ShieldCheck,
  BookOpen,
  DollarSign,
  CheckSquare,
  CreditCard,
  ArrowRight,
  TrendingUp,
} from 'lucide-react';

export default function AdminOverviewPage() {
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
      .catch((err) => console.error('Failed to load admin stats:', err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="space-y-8 max-w-7xl mx-auto font-sans">
      {/* Admin Banner */}
      <div className="rounded-3xl bg-gradient-to-r from-forest-900/15 via-terracotta-500/10 to-brand-500/10 border border-forest-900/15 dark:border-white/10 p-6 sm:p-8 shadow-card">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2.5 flex-wrap">
              <h1 className="text-2xl sm:text-3xl font-serif font-black text-foreground tracking-tight">
                Platform Administration 🛡️
              </h1>
              <Badge variant="destructive" className="text-[10px] rounded-full">
                SUPER ADMIN
              </Badge>
            </div>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
              Moderate tuition listings, govern user roles, and monitor Stripe subscription revenue.
            </p>
          </div>

          <Link href="/dashboard/admin/tuitions" className="shrink-0">
            <Button variant="default" className="font-bold gap-2 rounded-full shadow-glow">
              <CheckSquare className="h-4 w-4" />
              Review Pending Tuitions
            </Button>
          </Link>
        </div>
      </div>

      {/* Stats Cards Grid */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {Array.from({ length: 4 }).map((_, i) => (
            <StatsCardSkeleton key={i} />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {/* Total Users */}
          <Card className="p-6 border border-forest-900/10 dark:border-white/10 shadow-card flex flex-col justify-between rounded-3xl bg-card hover:shadow-soft transition-all">
            <div className="flex items-center justify-between text-muted-foreground">
              <span className="text-xs font-bold text-foreground">Total Registered Users</span>
              <div className="h-9 w-9 rounded-2xl bg-forest-900/10 dark:bg-white/10 text-forest-900 dark:text-cream flex items-center justify-center">
                <Users className="h-4 w-4" />
              </div>
            </div>
            <div className="mt-5">
              <p className="text-3xl sm:text-4xl font-serif font-black text-foreground">{stats?.totalUsers || 0}</p>
              <p className="text-[11px] text-muted-foreground mt-1">
                {stats?.totalStudents || 0} Students • {stats?.totalTutors || 0} Tutors
              </p>
            </div>
          </Card>

          {/* Pending Tuitions */}
          <Card className="p-6 border border-forest-900/10 dark:border-white/10 shadow-card flex flex-col justify-between rounded-3xl bg-card hover:shadow-soft transition-all">
            <div className="flex items-center justify-between text-muted-foreground">
              <span className="text-xs font-bold text-foreground">Pending Approvals</span>
              <div className="h-9 w-9 rounded-2xl bg-brand-500/15 text-brand-500 flex items-center justify-center">
                <BookOpen className="h-4 w-4" />
              </div>
            </div>
            <div className="mt-5">
              <p className="text-3xl sm:text-4xl font-serif font-black text-brand-500">{stats?.pendingTuitions || 0}</p>
              <p className="text-[11px] text-muted-foreground mt-1">
                {stats?.approvedTuitions || 0} batches currently live
              </p>
            </div>
          </Card>

          {/* Active Tutors */}
          <Card className="p-6 border border-forest-900/10 dark:border-white/10 shadow-card flex flex-col justify-between rounded-3xl bg-card hover:shadow-soft transition-all">
            <div className="flex items-center justify-between text-muted-foreground">
              <span className="text-xs font-bold text-foreground">Total Tutors</span>
              <div className="h-9 w-9 rounded-2xl bg-terracotta-500/15 text-terracotta-500 flex items-center justify-center">
                <ShieldCheck className="h-4 w-4" />
              </div>
            </div>
            <div className="mt-5">
              <p className="text-3xl sm:text-4xl font-serif font-black text-terracotta-500">{stats?.totalTutors || 0}</p>
              <p className="text-[11px] text-muted-foreground mt-1">Teachers offering mentorship</p>
            </div>
          </Card>

          {/* Stripe Revenue */}
          <Card className="p-6 border border-forest-900/10 dark:border-white/10 shadow-card flex flex-col justify-between rounded-3xl bg-card hover:shadow-soft transition-all">
            <div className="flex items-center justify-between text-muted-foreground">
              <span className="text-xs font-bold text-foreground">Total Stripe Revenue</span>
              <div className="h-9 w-9 rounded-2xl bg-brand-500/15 text-brand-600 dark:text-brand-100 flex items-center justify-center">
                <DollarSign className="h-4 w-4" />
              </div>
            </div>
            <div className="mt-5">
              <p className="text-3xl sm:text-4xl font-serif font-black text-brand-600 dark:text-brand-100">
                ${stats?.totalRevenue || 0} <span className="text-xs font-bold text-muted-foreground">USD</span>
              </p>
              <p className="text-[11px] text-muted-foreground mt-1">From Pro subscriptions</p>
            </div>
          </Card>
        </div>
      )}

      {/* Admin Action Shortcuts */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <Link
          href="/dashboard/admin/users"
          className="p-6 rounded-3xl border border-forest-900/10 dark:border-white/10 bg-card hover:border-terracotta-500/50 shadow-card hover:shadow-soft transition-all group flex flex-col justify-between space-y-4"
        >
          <div className="flex items-center gap-3.5">
            <div className="h-11 w-11 rounded-2xl bg-forest-900/10 dark:bg-white/10 text-forest-900 dark:text-cream flex items-center justify-center shrink-0">
              <Users className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-bold text-foreground font-sans">User Management</p>
              <p className="text-[11px] text-muted-foreground mt-0.5">Promote or change user roles</p>
            </div>
          </div>
          <span className="text-xs font-bold text-terracotta-500 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
            Manage Users <ArrowRight className="h-3.5 w-3.5" />
          </span>
        </Link>

        <Link
          href="/dashboard/admin/tuitions"
          className="p-6 rounded-3xl border border-forest-900/10 dark:border-white/10 bg-card hover:border-terracotta-500/50 shadow-card hover:shadow-soft transition-all group flex flex-col justify-between space-y-4"
        >
          <div className="flex items-center gap-3.5">
            <div className="h-11 w-11 rounded-2xl bg-brand-500/15 text-brand-500 flex items-center justify-center shrink-0">
              <CheckSquare className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-bold text-foreground font-sans">Tuition Moderation</p>
              <p className="text-[11px] text-muted-foreground mt-0.5">Approve or reject tutor posts</p>
            </div>
          </div>
          <span className="text-xs font-bold text-brand-500 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
            Review Posts <ArrowRight className="h-3.5 w-3.5" />
          </span>
        </Link>

        <Link
          href="/dashboard/admin/transactions"
          className="p-6 rounded-3xl border border-forest-900/10 dark:border-white/10 bg-card hover:border-terracotta-500/50 shadow-card hover:shadow-soft transition-all group flex flex-col justify-between space-y-4"
        >
          <div className="flex items-center gap-3.5">
            <div className="h-11 w-11 rounded-2xl bg-brand-500/15 text-brand-600 dark:text-brand-100 flex items-center justify-center shrink-0">
              <CreditCard className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-bold text-foreground font-sans">Stripe Transactions</p>
              <p className="text-[11px] text-muted-foreground mt-0.5">View all customer payments</p>
            </div>
          </div>
          <span className="text-xs font-bold text-brand-600 dark:text-brand-100 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
            View Ledger <ArrowRight className="h-3.5 w-3.5" />
          </span>
        </Link>
      </div>
    </div>
  );
}
