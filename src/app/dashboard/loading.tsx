'use client';

import React from 'react';
import { Skeleton } from '@/components/common/Skeleton';

export default function DashboardLoading() {
  return (
    <div className="p-6 sm:p-8 space-y-8 select-none">
      {/* Top Banner Skeleton */}
      <div className="rounded-3xl border border-forest-900/10 dark:border-white/10 bg-white dark:bg-[#0F241E] p-6 sm:p-8 shadow-card flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div className="space-y-3">
          <Skeleton className="h-6 w-32 rounded-full" />
          <Skeleton className="h-9 w-64 rounded-xl" />
          <Skeleton className="h-4 w-80 rounded-lg" />
        </div>
        <div className="flex items-center gap-3">
          <Skeleton className="h-10 w-28 rounded-full" />
          <Skeleton className="h-10 w-32 rounded-full" />
        </div>
      </div>

      {/* 4 Stats Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="p-5 rounded-3xl border border-forest-900/10 dark:border-white/10 bg-white dark:bg-[#0F241E] shadow-card space-y-4"
          >
            <div className="flex items-center justify-between">
              <Skeleton className="h-4 w-24 rounded-md" />
              <Skeleton className="h-10 w-10 rounded-2xl" />
            </div>
            <Skeleton className="h-8 w-20 rounded-lg" />
            <Skeleton className="h-3 w-32 rounded-md" />
          </div>
        ))}
      </div>

      {/* Table / List Skeleton */}
      <div className="rounded-3xl border border-forest-900/10 dark:border-white/10 bg-white dark:bg-[#0F241E] p-6 shadow-card space-y-4">
        <div className="flex items-center justify-between pb-4 border-b border-forest-900/10 dark:border-white/10">
          <Skeleton className="h-6 w-40 rounded-lg" />
          <Skeleton className="h-9 w-24 rounded-full" />
        </div>
        {[1, 2, 3].map((row) => (
          <div key={row} className="flex items-center justify-between py-3">
            <div className="flex items-center gap-3">
              <Skeleton className="h-12 w-12 rounded-2xl" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-48 rounded-md" />
                <Skeleton className="h-3 w-32 rounded-md" />
              </div>
            </div>
            <Skeleton className="h-8 w-24 rounded-full" />
          </div>
        ))}
      </div>
    </div>
  );
}
