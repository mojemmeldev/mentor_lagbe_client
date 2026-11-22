'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import api from '@/lib/api';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Logo from '@/components/common/Logo';
import { toast } from 'sonner';
import { User, Mail, Key, UserCheck, GraduationCap, BookOpen } from 'lucide-react';

export default function SignUpPage() {
  const router = useRouter();
  const { login } = useAuth();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'student' | 'tutor'>('student');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !email.trim() || !password) {
      toast.error('Complete every required field to continue.');
      return;
    }

    if (password.length < 6) {
      toast.error('Use at least six characters for your password.');
      return;
    }

    setLoading(true);
    try {
      const res = await api.post('/auth/register', {
        name: name.trim(),
        email: email.trim(),
        password,
        role,
      });

      if (res.data.success && res.data.data) {
        const { user, token } = res.data.data;
        login(token, user);
        toast.success(`Welcome to MentorLagbe, ${user.name}!`);

        if (user.role === 'tutor') router.push('/dashboard/tutor');
        else router.push('/dashboard/student');
      }
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'We could not create your account.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-cream/40 dark:bg-[#081612] px-4 py-12 transition-colors duration-300">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center space-y-2">
          <div className="flex justify-center">
            <Logo size="lg" />
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-forest-900 dark:text-[#F5F2EB] tracking-tight pt-2">
            Start Your MentorLagbe Journey
          </h1>
          <p className="text-xs sm:text-sm text-forest-800/70 dark:text-white/70">
            Create a student or tutor account to find batches or start mentoring.
          </p>
        </div>

        <Card className="p-8 border border-forest-900/10 dark:border-white/10 shadow-card bg-white dark:bg-[#0F241E] rounded-3xl">
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Role Selection Tabs */}
            <div>
              <label className="block text-xs font-bold text-forest-900 dark:text-white mb-1.5">
                I am joining as:
              </label>
              <div className="grid grid-cols-2 gap-2 p-1.5 rounded-full bg-cream/70 dark:bg-[#153028] border border-forest-900/10 dark:border-white/10">
                <button
                  type="button"
                  onClick={() => setRole('student')}
                  className={`flex items-center justify-center gap-2 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                    role === 'student'
                      ? 'bg-forest-900 text-white dark:bg-brand-600 shadow-soft'
                      : 'text-forest-800/70 dark:text-white/70 hover:text-forest-900'
                  }`}
                >
                  <GraduationCap className="h-4 w-4" />
                  Student
                </button>

                <button
                  type="button"
                  onClick={() => setRole('tutor')}
                  className={`flex items-center justify-center gap-2 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                    role === 'tutor'
                      ? 'bg-forest-900 text-white dark:bg-brand-600 shadow-soft'
                      : 'text-forest-800/70 dark:text-white/70 hover:text-forest-900'
                  }`}
                >
                  <BookOpen className="h-4 w-4" />
                  Tutor
                </button>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-forest-900 dark:text-white mb-1.5">
                Your Name *
              </label>
              <div className="relative">
                <User className="absolute left-3.5 top-3.5 h-4 w-4 text-forest-800/40 dark:text-white/40" />
                <Input
                  type="text"
                  placeholder="e.g. Ayesha Khan"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="pl-10 h-11 rounded-2xl bg-cream/40 dark:bg-[#153028] border-forest-900/15 dark:border-white/15 focus:ring-brand-500/40 text-xs sm:text-sm"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-forest-900 dark:text-white mb-1.5">
                Email *
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-3.5 h-4 w-4 text-forest-800/40 dark:text-white/40" />
                <Input
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 h-11 rounded-2xl bg-cream/40 dark:bg-[#153028] border-forest-900/15 dark:border-white/15 focus:ring-brand-500/40 text-xs sm:text-sm"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-forest-900 dark:text-white mb-1.5">
                Create Password *
              </label>
              <div className="relative">
                <Key className="absolute left-3.5 top-3.5 h-4 w-4 text-forest-800/40 dark:text-white/40" />
                <Input
                  type="password"
                  placeholder="Minimum 6 characters"
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
              <UserCheck className="h-4 w-4" />
              {loading ? 'Setting up your account...' : `Create ${role === 'student' ? 'Student' : 'Tutor'} Account`}
            </Button>
          </form>

          <div className="mt-6 text-center text-xs text-forest-800/70 dark:text-white/70">
            Already registered?{' '}
            <Link href="/sign-in" className="text-brand-500 font-bold hover:underline">
              Sign In
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
}