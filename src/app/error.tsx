'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, RefreshCw, ArrowLeft } from 'lucide-react';

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Unhandled Client Error:', error);
  }, [error]);

  return (
    <div className="min-h-[75vh] flex flex-col items-center justify-center text-center px-4 py-16 bg-cream/40 dark:bg-[#081612] transition-colors duration-300">
      <div className="h-20 w-20 rounded-full bg-destructive/10 text-destructive flex items-center justify-center mb-6 shadow-soft">
        <AlertTriangle className="h-10 w-10" />
      </div>

      <Badge variant="destructive" className="mb-2 rounded-full font-bold uppercase tracking-wider text-xs">
        Application Error
      </Badge>
      <h1 className="font-serif text-3xl sm:text-4xl font-bold text-forest-900 dark:text-[#F5F2EB] tracking-tight mt-2">
        Something went wrong
      </h1>
      <p className="text-xs sm:text-sm text-forest-800/75 dark:text-[#F5F2EB]/75 max-w-md mx-auto mt-3 leading-relaxed">
        An unexpected error occurred while rendering this page. You can try refreshing or navigate back to the home page.
      </p>

      <div className="mt-8 flex items-center gap-3">
        <Button variant="outline" onClick={() => reset()} className="gap-2 font-semibold rounded-full border-forest-900/15 dark:border-white/15 text-forest-900 dark:text-white hover:bg-forest-900/5 cursor-pointer">
          <RefreshCw className="h-4 w-4" />
          Try Again
        </Button>
        <Link href="/">
          <Button variant="default" className="font-bold gap-2 rounded-full shadow-[0_12px_30px_-6px_rgba(20,175,81,0.35)] cursor-pointer">
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Button>
        </Link>
      </div>
    </div>
  );
}