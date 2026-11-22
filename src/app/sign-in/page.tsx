'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import api from '@/lib/api';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import Logo from '@/components/common/Logo';
import { toast } from 'sonner';
import { LogIn, Key, Mail, Sparkles, ArrowRight, ChevronDown } from 'lucide-react';

export default function SignInPage() {
  const router = useRouter();
  const { login } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showTestCredentials, setShowTestCredentials] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.trim() || !password) {
      toast.error('Please enter both email and password.');
      return;
    }

    setLoading(true);
    try {
      const res = await api.post('/auth/login', {
        email: email.trim(),
        password,
      });

      if (res.data.success && res.data.data) {
        const { user, token } = res.data.data;
        login(token, user);
        toast.success(`Welcome back, ${user.name}!`);

        if (user.role === 'admin') router.push('/dashboard/admin');
        else if (user.role === 'tutor') router.push('/dashboard/tutor');
        else router.push('/dashboard/student');
      }
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Those details did not match our records.');
    } finally {
      setLoading(false);
    }
  };

  // Demo account quick filler for easy assessment
  const fillDemo = (demoEmail: string, demoPass: string) => {
    setEmail(demoEmail);
    setPassword(demoPass);
    toast.info(`Demo details added for ${demoEmail}`);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-cream/40 dark:bg-[#081612] px-4 py-12 transition-colors duration-300">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center space-y-2">
          <div className="flex justify-center">
            <Logo size="lg" />
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-forest-900 dark:text-[#F5F2EB] tracking-tight pt-2">
            Good to See You Again
          </h1>
          <p className="text-xs sm:text-sm text-forest-800/70 dark:text-white/70">
            Sign in to pick up your applications, batches, and dashboard.
          </p>
        </div>

        <Card className="p-8 border border-forest-900/10 dark:border-white/10 shadow-card bg-white dark:bg-[#0F241E] rounded-3xl">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-forest-900 dark:text-white mb-1.5">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-3.5 h-4 w-4 text-forest-800/40 dark:text-white/40" />
                <Input
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 h-11 rounded-2xl bg-cream/40 dark:bg-[#153028] border-forest-900/15 dark:border-white/15 focus:ring-brand-500/40 text-xs sm:text-sm"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-forest-900 dark:text-white mb-1.5">
                Password
              </label>
              <div className="relative">
                <Key className="absolute left-3.5 top-3.5 h-4 w-4 text-forest-800/40 dark:text-white/40" />
                <Input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 h-11 rounded-2xl bg-cream/40 dark:bg-[#153028] border-forest-900/15 dark:border-white/15 focus:ring-brand-500/40 text-xs sm:text-sm"
                  required
                />
              </div>
            </div>

            <Button
              type="submit"
              disabled={loading}
              variant="default"
              className="w-full font-bold h-12 rounded-full gap-2 shadow-[0_12px_30px_-6px_rgba(20,175,81,0.35)] text-sm cursor-pointer mt-2"
            >
              <LogIn className="h-4 w-4" />
              {loading ? 'Checking your details...' : 'Sign In'}
            </Button>
          </form>

          {/* Quick Demo Credentials Box - Collapsible Toggle */}
          <div className="mt-6 pt-5 border-t border-forest-900/10 dark:border-white/10 flex flex-col items-center">
            <button
              type="button"
              onClick={() => setShowTestCredentials((prev) => !prev)}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-forest-800/70 dark:text-white/70 hover:text-brand-500 dark:hover:text-brand-400 transition-colors py-1 px-3 rounded-full hover:bg-forest-900/5 dark:hover:bg-white/5 cursor-pointer"
            >
              <Sparkles className="h-3.5 w-3.5 text-brand-500" />
              <span>{showTestCredentials ? 'Hide Demo Logins' : 'Show Demo Logins'}</span>
              <ChevronDown
                className={`h-3.5 w-3.5 transition-transform duration-200 ${
                  showTestCredentials ? 'rotate-180' : ''
                }`}
              />
            </button>

            {showTestCredentials && (
              <div className="mt-3.5 w-full space-y-2.5 animate-in fade-in duration-200">
                <span className="text-[11px] font-bold text-forest-800/60 dark:text-white/60 uppercase tracking-wider block text-center">
                  Pick a role to fill the login form
                </span>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => fillDemo('admin@mentorlagbe.com', 'Admin@12345')}
                    className="group rounded-2xl border border-forest-900/15 dark:border-white/15 bg-cream/50 dark:bg-[#153028] p-2.5 text-center hover:border-brand-500 hover:bg-brand-50/50 dark:hover:bg-terracotta-950/30 transition-all cursor-pointer shadow-sm"
                  >
                    <span className="block text-xs font-bold text-forest-900 dark:text-white group-hover:text-brand-500">
                      Admin
                    </span>
                    <span className="block text-[10px] text-muted-foreground mt-0.5">
                      All Tools
                    </span>
                  </button>
                  <button
                    type="button"
                    onClick={() => fillDemo('tutor.rahim@mentorlagbe.com', 'Tutor@12345')}
                    className="group rounded-2xl border border-forest-900/15 dark:border-white/15 bg-cream/50 dark:bg-[#153028] p-2.5 text-center hover:border-brand-500 hover:bg-brand-50/50 dark:hover:bg-terracotta-950/30 transition-all cursor-pointer shadow-sm"
                  >
                    <span className="block text-xs font-bold text-forest-900 dark:text-white group-hover:text-brand-500">
                      Tutor
                    </span>
                    <span className="block text-[10px] text-muted-foreground mt-0.5">
                      Create Batches
                    </span>
                  </button>
                  <button
                    type="button"
                    onClick={() => fillDemo('student.siam@mentorlagbe.com', 'Student@12345')}
                    className="group rounded-2xl border border-forest-900/15 dark:border-white/15 bg-cream/50 dark:bg-[#153028] p-2.5 text-center hover:border-brand-500 hover:bg-brand-50/50 dark:hover:bg-terracotta-950/30 transition-all cursor-pointer shadow-sm"
                  >
                    <span className="block text-xs font-bold text-forest-900 dark:text-white group-hover:text-brand-500">
                      Student
                    </span>
                    <span className="block text-[10px] text-muted-foreground mt-0.5">
                      Apply to Batches
                    </span>
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="mt-6 text-center text-xs text-forest-800/70 dark:text-white/70">
            New to MentorLagbe?{' '}
            <Link href="/sign-up" className="text-brand-500 font-bold hover:underline">
              Create Your Free Account
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
}