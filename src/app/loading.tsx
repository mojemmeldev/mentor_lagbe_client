'use client';

import React from 'react';
import { Skeleton } from '@/components/common/Skeleton';

export default function RootLoading() {
  return (
    <div className="min-h-screen bg-cream/30 dark:bg-forest-950 flex flex-col items-center justify-center p-6 select-none transition-colors duration-300">
      <div className="w-full max-w-md flex flex-col items-center space-y-6">
        {/* Animated Brand Pulse */}
        <div className="relative flex items-center justify-center">
          <div className="w-16 h-16 rounded-3xl bg-forest-900/10 dark:bg-white/10 animate-ping absolute inset-0 rounded-full opacity-30" />
          <div className="w-16 h-16 rounded-2xl bg-forest-900 dark:bg-brand-600 text-white flex items-center justify-center font-serif font-black text-2xl shadow-soft">
            M
          </div>
        </div>

        {/* Loading text shimmer */}
        <div className="text-center space-y-2 w-full">
          <h2 className="font-serif text-xl font-bold text-forest-900 dark:text-cream">
            Loading MentorLagbe...
          </h2>
          <p className="text-xs text-forest-800/60 dark:text-white/60">
            Preparing your academic mentorship workspace
          </p>
        </div>

        {/* Universal Skeleton Bar */}
        <div className="w-full space-y-3 pt-2">
          <Skeleton className="h-4 w-5/6 mx-auto rounded-full" />
          <Skeleton className="h-3 w-4/6 mx-auto rounded-full" />
          <div className="grid grid-cols-3 gap-3 pt-4">
            <Skeleton className="h-16 rounded-2xl" />
            <Skeleton className="h-16 rounded-2xl" />
            <Skeleton className="h-16 rounded-2xl" />
          </div>
        </div>
      </div>
    </div>
  );
}
