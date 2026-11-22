'use client';

import React, { useEffect, useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import api from '@/lib/api';
import { useAuth } from '@/context/AuthContext';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';

function PaymentSuccessContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const router = useRouter();
  const { user, refreshUser } = useAuth();

  const [loading, setLoading] = useState(true);
  const [paymentData, setPaymentData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (sessionId) {
      api.get(`/payments/verify-session?sessionId=${sessionId}`)
        .then((res) => {
          if (res.data.success) {
            setPaymentData(res.data.data);
            refreshUser();

            // Confetti celebration
            import('canvas-confetti').then((module) => {
              const confetti = module.default;
              confetti({
                particleCount: 100,
                spread: 70,
                origin: { y: 0.6 },
              });
            }).catch(() => {});
          }
        })
        .catch((err) => {
          console.error('Session verification error:', err);
          setError(err.response?.data?.message || 'We could not confirm this payment.');
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [sessionId, refreshUser]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-cream/40 dark:bg-[#081612] px-4 py-16 transition-colors duration-300">
      <Card className="w-full max-w-lg p-8 sm:p-10 border border-emerald-600/20 shadow-card bg-white dark:bg-[#0F241E] rounded-3xl text-center space-y-6">
        <div className="h-16 w-16 rounded-full bg-emerald-100 dark:bg-brand-500/20 text-brand-600 mx-auto flex items-center justify-center shadow-soft">
          <CheckCircle2 className="h-10 w-10" />
        </div>

        <div>
          <Badge variant="pro" className="mb-2 rounded-full">
            Upgrade Complete
          </Badge>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-forest-900 dark:text-[#F5F2EB] tracking-tight">
            Your Pro Plan Is Live
          </h1>
          <p className="text-xs sm:text-sm text-forest-800/70 dark:text-white/70 mt-2">
            Stripe confirmed your payment and your account now has Pro access.
          </p>
        </div>

        {paymentData && (
          <div className="rounded-2xl bg-cream/70 dark:bg-[#153028] border border-forest-900/10 dark:border-white/10 p-4 text-xs space-y-2 text-left">
            <div className="flex justify-between">
              <span className="text-forest-800/60 dark:text-white/60">Plan:</span>
              <strong className="text-forest-900 dark:text-white font-bold">{paymentData.planName}</strong>
            </div>
            <div className="flex justify-between">
              <span className="text-forest-800/60 dark:text-white/60">Paid:</span>
              <strong className="text-forest-900 dark:text-white font-bold">${paymentData.amount} {paymentData.currency}</strong>
            </div>
            <div className="flex justify-between">
              <span className="text-forest-800/60 dark:text-white/60">Reference:</span>
              <span className="font-mono text-forest-800/60 dark:text-white/60 truncate max-w-[200px]">
                {paymentData.transactionId}
              </span>
            </div>
          </div>
        )}

        {error && (
          <p className="text-xs text-destructive bg-destructive/10 p-3 rounded-2xl border border-destructive/20">
            {error}
          </p>
        )}

        <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/tuitions">
            <Button variant="outline" className="w-full sm:w-auto font-semibold rounded-full border-forest-900/15 dark:border-white/15 text-forest-900 dark:text-white hover:bg-forest-900/5 cursor-pointer">
              Browse Tuitions
            </Button>
          </Link>
          <Link href={user?.role === 'tutor' ? '/dashboard/tutor' : '/dashboard/student'}>
            <Button variant="default" className="w-full sm:w-auto font-bold gap-2 rounded-full shadow-glow cursor-pointer">
              Open Dashboard
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </Card>
    </div>
  );
}

export default function PaymentSuccessPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-sm">Confirming your payment...</div>}>
      <PaymentSuccessContent />
    </Suspense>
  );
}