'use client';

import React from 'react';
import { cn } from '@/lib/utils';

/**
 * Base editorial Skeleton component.
 * Features GPU-accelerated gradient shimmer and warm cream / forest-900 pulse.
 */
export function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        'editorial-shimmer relative overflow-hidden rounded-2xl bg-forest-900/[0.07] dark:bg-white/[0.08] animate-pulse',
        className
      )}
      {...props}
    />
  );
}

/**
 * TuitionCardSkeleton
 * Pixel-perfect layout replication of src/components/tuition/TuitionCard.tsx
 */
export function TuitionCardSkeleton({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        'group flex flex-col h-full rounded-3xl border border-forest-900/10 dark:border-white/10 bg-white dark:bg-[#0F241E] shadow-card overflow-hidden',
        className
      )}
    >
      {/* Banner Skeleton with Badges */}
      <div className="relative h-48 w-full bg-forest-900/[0.04] dark:bg-forest-950/60 border-b border-forest-900/10 dark:border-white/10 overflow-hidden">
        <Skeleton className="h-full w-full rounded-none" />

        {/* Top-Left Mode & Subject Pills */}
        <div className="absolute top-3.5 left-3.5 flex items-center gap-2 z-10">
          <Skeleton className="h-6 w-16 rounded-full bg-forest-900/20 dark:bg-white/20" />
          <Skeleton className="h-6 w-20 rounded-full bg-white/70 dark:bg-white/15" />
        </div>

        {/* Top-Right Floating Bookmark Button */}
        <div className="absolute top-3.5 right-3.5 z-10">
          <Skeleton className="h-9 w-9 rounded-full bg-white/70 dark:bg-white/15" />
        </div>
      </div>

      {/* Card Body */}
      <div className="flex flex-col flex-1 p-5 sm:p-6 justify-between space-y-4">
        <div>
          {/* Class Level, Rating & Days */}
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 flex-wrap">
              <Skeleton className="h-4 w-20 rounded-full" />
              <Skeleton className="h-5 w-16 rounded-full" />
            </div>
            <Skeleton className="h-6 w-20 rounded-full" />
          </div>

          {/* Title (2 lines) */}
          <div className="mt-3 space-y-2">
            <Skeleton className="h-5 w-11/12 rounded-lg" />
            <Skeleton className="h-5 w-3/4 rounded-lg" />
          </div>

          {/* Tutor Info Capsule */}
          <div className="mt-4 p-2.5 rounded-2xl bg-cream/70 dark:bg-[#153028] border border-forest-900/5 dark:border-white/5 flex items-center gap-3">
            <Skeleton className="w-8 h-8 rounded-full shrink-0" />
            <div className="space-y-1.5 flex-1 min-w-0">
              <Skeleton className="h-3.5 w-24 rounded" />
              <Skeleton className="h-2.5 w-32 rounded" />
            </div>
          </div>

          {/* Location Row */}
          <div className="mt-3.5 pt-2 border-t border-forest-900/10 dark:border-white/10 flex items-center gap-2">
            <Skeleton className="h-3.5 w-3.5 rounded-full shrink-0" />
            <Skeleton className="h-3.5 w-32 rounded" />
          </div>
        </div>

        {/* Footer: Monthly Fee & Details Button */}
        <div className="pt-3.5 border-t border-forest-900/10 dark:border-white/10 flex items-center justify-between">
          <div className="space-y-1">
            <Skeleton className="h-2.5 w-16 rounded" />
            <Skeleton className="h-6 w-24 rounded-lg" />
          </div>
          <Skeleton className="h-9 w-24 rounded-full" />
        </div>
      </div>
    </div>
  );
}

/**
 * TutorCardSkeleton
 * Pixel-perfect layout replication of the tutor card in src/app/tutors/page.tsx
 */
export function TutorCardSkeleton({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        'p-6 rounded-3xl border border-forest-900/10 dark:border-white/10 bg-white dark:bg-[#0F241E] shadow-card flex flex-col justify-between h-full',
        className
      )}
    >
      <div>
        {/* Top Row: Avatar & Info */}
        <div className="flex items-start gap-4">
          <Skeleton className="h-16 w-16 rounded-2xl shrink-0" />

          <div className="flex-1 min-w-0 space-y-2">
            <Skeleton className="h-5 w-36 rounded-lg" />
            <div className="flex items-center gap-1.5">
              <Skeleton className="h-4 w-12 rounded-md" />
              <Skeleton className="h-3.5 w-16 rounded-md" />
            </div>
            <Skeleton className="h-3.5 w-36 rounded-md" />
          </div>

          <Skeleton className="h-5 w-12 rounded-full shrink-0" />
        </div>

        {/* Bio Lines */}
        <div className="mt-4 space-y-2">
          <Skeleton className="h-3.5 w-full rounded" />
          <Skeleton className="h-3.5 w-11/12 rounded" />
          <Skeleton className="h-3.5 w-4/5 rounded" />
        </div>

        {/* Subject Badges */}
        <div className="mt-4 flex flex-wrap gap-1.5">
          <Skeleton className="h-6 w-20 rounded-full" />
          <Skeleton className="h-6 w-16 rounded-full" />
          <Skeleton className="h-6 w-24 rounded-full" />
        </div>
      </div>

      {/* Bottom Row: Active Batches & View Profile Button */}
      <div className="mt-6 pt-4 border-t border-forest-900/10 dark:border-white/10 flex items-center justify-between">
        <div className="space-y-1">
          <Skeleton className="h-2.5 w-18 rounded" />
          <Skeleton className="h-4 w-16 rounded-md" />
        </div>
        <Skeleton className="h-9 w-28 rounded-full" />
      </div>
    </div>
  );
}

/**
 * DashboardStatCardSkeleton
 * Replicates dashboard metric cards with header label, icon, metric value and subtext.
 */
export function DashboardStatCardSkeleton({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        'p-6 border border-forest-900/10 dark:border-white/10 shadow-card flex flex-col justify-between rounded-3xl bg-card space-y-4 h-full',
        className
      )}
    >
      <div className="flex items-center justify-between">
        <Skeleton className="h-4 w-24 rounded-md" />
        <Skeleton className="h-9 w-9 rounded-2xl" />
      </div>
      <div className="mt-4 space-y-2">
        <Skeleton className="h-9 w-20 rounded-xl" />
        <Skeleton className="h-3.5 w-32 rounded-md" />
      </div>
    </div>
  );
}

// Alias for backwards compatibility
export const StatsCardSkeleton = DashboardStatCardSkeleton;

/**
 * TableRowSkeleton
 * Single table row with realistic skeleton columns for dashboard tables.
 */
export function TableRowSkeleton({ columns = 5 }: { columns?: number }) {
  // Array of varied column widths for realistic look
  const widthClasses = ['w-3/4', 'w-1/2', 'w-2/3', 'w-1/3', 'w-1/2', 'w-1/4'];

  return (
    <tr className="border-b border-forest-900/10 dark:border-white/10">
      {Array.from({ length: columns }).map((_, i) => (
        <td key={i} className="py-4 px-5">
          <Skeleton
            className={cn(
              'h-4 rounded-md',
              widthClasses[i % widthClasses.length]
            )}
          />
        </td>
      ))}
    </tr>
  );
}

/**
 * DashboardTableSkeleton
 * Complete table container with headers and skeleton rows.
 */
export function DashboardTableSkeleton({
  rows = 4,
  columns = 6,
  headers,
  className,
}: {
  rows?: number;
  columns?: number;
  headers?: string[];
  className?: string;
}) {
  const colCount = headers ? headers.length : columns;

  return (
    <div
      className={cn(
        'border border-forest-900/10 dark:border-white/10 shadow-card bg-card overflow-hidden rounded-3xl',
        className
      )}
    >
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs font-sans">
          <thead className="bg-forest-900/5 dark:bg-white/5 text-muted-foreground uppercase text-[11px] font-bold border-b border-forest-900/10 dark:border-white/10">
            <tr>
              {headers
                ? headers.map((h, i) => (
                    <th key={i} className="py-4 px-5">
                      {h}
                    </th>
                  ))
                : Array.from({ length: colCount }).map((_, i) => (
                    <th key={i} className="py-4 px-5">
                      <Skeleton className="h-3 w-20 rounded" />
                    </th>
                  ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-forest-900/10 dark:divide-white/10">
            {Array.from({ length: rows }).map((_, r) => (
              <TableRowSkeleton key={r} columns={colCount} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/**
 * TuitionDetailsSkeleton
 * Comprehensive skeleton for tuition details view (src/app/tuitions/[id]/page.tsx)
 */
export function TuitionDetailsSkeleton({ className }: { className?: string }) {
  return (
    <div className={cn('space-y-8 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10', className)}>
      {/* Top Breadcrumb & ID Badges */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Skeleton className="h-5 w-24 rounded-full" />
          <Skeleton className="h-3 w-3 rounded-full" />
          <Skeleton className="h-5 w-20 rounded-full" />
          <Skeleton className="h-3 w-3 rounded-full" />
          <Skeleton className="h-5 w-32 rounded-full" />
        </div>
        <div className="flex items-center gap-2">
          <Skeleton className="h-6 w-20 rounded-full" />
          <Skeleton className="h-6 w-28 rounded-full" />
        </div>
      </div>

      {/* 3D Hero Banner Skeleton */}
      <div className="relative h-72 sm:h-96 w-full rounded-3xl border border-forest-900/10 dark:border-white/10 bg-forest-900/10 dark:bg-forest-950 overflow-hidden p-6 sm:p-8 flex flex-col justify-between shadow-card">
        <Skeleton className="absolute inset-0 rounded-none w-full h-full" />

        {/* Top Badges */}
        <div className="relative z-10 flex flex-wrap gap-2.5">
          <Skeleton className="h-7 w-24 rounded-full bg-white/40 dark:bg-white/15" />
          <Skeleton className="h-7 w-28 rounded-full bg-white/40 dark:bg-white/15" />
          <Skeleton className="h-7 w-32 rounded-full bg-white/40 dark:bg-white/15" />
        </div>

        {/* Bottom Floating Title Bar */}
        <div className="relative z-10 space-y-2 max-w-2xl">
          <Skeleton className="h-8 w-4/5 rounded-xl bg-white/50 dark:bg-white/20" />
          <div className="flex items-center gap-3">
            <Skeleton className="h-5 w-32 rounded-full bg-white/40 dark:bg-white/15" />
            <Skeleton className="h-5 w-24 rounded-full bg-white/40 dark:bg-white/15" />
          </div>
        </div>
      </div>

      {/* Main Grid: Details + Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column (8 cols) */}
        <div className="lg:col-span-8 space-y-8">
          {/* Key Specs Card */}
          <div className="p-6 sm:p-8 rounded-3xl border border-forest-900/10 dark:border-white/10 bg-card shadow-card">
            <Skeleton className="h-6 w-44 rounded-lg mb-6" />
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="p-4 rounded-2xl bg-cream/60 dark:bg-[#153028] space-y-2">
                  <Skeleton className="h-4 w-16 rounded" />
                  <Skeleton className="h-5 w-24 rounded" />
                </div>
              ))}
            </div>
          </div>

          {/* About / Description Card */}
          <div className="p-6 sm:p-8 rounded-3xl border border-forest-900/10 dark:border-white/10 bg-card shadow-card space-y-4">
            <Skeleton className="h-6 w-52 rounded-lg" />
            <div className="space-y-2.5 pt-2">
              <Skeleton className="h-4 w-full rounded" />
              <Skeleton className="h-4 w-11/12 rounded" />
              <Skeleton className="h-4 w-4/5 rounded" />
              <Skeleton className="h-4 w-3/4 rounded" />
            </div>
          </div>

          {/* Tutor Profile Card */}
          <div className="p-6 sm:p-8 rounded-3xl border border-forest-900/10 dark:border-white/10 bg-card shadow-card space-y-4">
            <div className="flex items-center gap-4">
              <Skeleton className="h-16 w-16 rounded-2xl shrink-0" />
              <div className="space-y-2 flex-1">
                <Skeleton className="h-5 w-40 rounded-lg" />
                <Skeleton className="h-4 w-28 rounded" />
              </div>
            </div>
            <div className="pt-2 space-y-2">
              <Skeleton className="h-3.5 w-full rounded" />
              <Skeleton className="h-3.5 w-5/6 rounded" />
            </div>
          </div>
        </div>

        {/* Right Sidebar (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          <div className="p-6 sm:p-8 rounded-3xl border border-forest-900/10 dark:border-white/10 bg-card shadow-card space-y-6">
            <div className="space-y-2">
              <Skeleton className="h-3.5 w-24 rounded" />
              <Skeleton className="h-8 w-36 rounded-xl" />
            </div>

            <div className="space-y-3 pt-4 border-t border-forest-900/10 dark:border-white/10">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="flex items-center gap-3">
                  <Skeleton className="h-4 w-4 rounded-full shrink-0" />
                  <Skeleton className="h-3.5 w-full rounded" />
                </div>
              ))}
            </div>

            <Skeleton className="h-12 w-full rounded-full" />
            <Skeleton className="h-10 w-full rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Skeleton;
