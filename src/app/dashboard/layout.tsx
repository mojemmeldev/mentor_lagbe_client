'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import ThemeToggle from '@/components/common/ThemeToggle';
import { Badge } from '@/components/ui/badge';
import {
  LayoutDashboard,
  BookOpen,
  PlusCircle,
  Users,
  CheckSquare,
  CreditCard,
  User,
  LogOut,
  Menu,
  X,
  FileText,
  Sparkles,
  ChevronRight,
  Bookmark,
  Shield,
  GraduationCap,
  Globe,
  ArrowUpRight,
} from 'lucide-react';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, loading, logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (loading) return;

    if (!user) {
      router.push('/sign-in');
      return;
    }

    // Role-based route guard
    if (pathname === '/dashboard' || pathname === '/dashboard/') {
      const target =
        user.role === 'admin'
          ? '/dashboard/admin'
          : user.role === 'tutor'
          ? '/dashboard/tutor'
          : '/dashboard/student';
      router.replace(target);
      return;
    }

    if (user.role === 'student') {
      if (pathname.startsWith('/dashboard/admin') || pathname.startsWith('/dashboard/tutor')) {
        router.replace('/dashboard/student');
      }
    } else if (user.role === 'tutor') {
      if (pathname.startsWith('/dashboard/admin') || pathname.startsWith('/dashboard/student')) {
        router.replace('/dashboard/tutor');
      }
    } else if (user.role !== 'admin') {
      if (pathname.startsWith('/dashboard/admin')) {
        const target = user.role === 'tutor' ? '/dashboard/tutor' : '/dashboard/student';
        router.replace(target);
      }
    }
  }, [user, loading, pathname, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-cream dark:bg-[#081612]">
        <div className="flex flex-col items-center gap-3">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-forest-900 dark:border-white border-t-transparent" />
          <p className="text-xs text-muted-foreground font-medium font-sans">Loading Dashboard...</p>
        </div>
      </div>
    );
  }

  if (!user) return null;

  // Immediate check to prevent unauthorized view flickering or subpage execution while redirecting
  const isUnauthorized =
    pathname === '/dashboard' ||
    pathname === '/dashboard/' ||
    (user.role === 'student' &&
      (pathname.startsWith('/dashboard/admin') || pathname.startsWith('/dashboard/tutor'))) ||
    (user.role === 'tutor' &&
      (pathname.startsWith('/dashboard/admin') || pathname.startsWith('/dashboard/student'))) ||
    (user.role !== 'admin' && pathname.startsWith('/dashboard/admin'));

  if (isUnauthorized) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-cream dark:bg-[#081612]">
        <div className="flex flex-col items-center gap-3">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-forest-900 dark:border-white border-t-transparent" />
          <p className="text-xs text-muted-foreground font-medium font-sans">Redirecting to your dashboard...</p>
        </div>
      </div>
    );
  }

  // Role-based navigation items
  const studentNav = [
    { name: 'Overview', href: '/dashboard/student', icon: LayoutDashboard },
    { name: 'My Applications', href: '/dashboard/student/my-applications', icon: FileText },
    { name: 'Saved Tuitions', href: '/dashboard/student/saved-tuitions', icon: Bookmark },
  ];

  const tutorNav = [
    { name: 'Overview', href: '/dashboard/tutor', icon: LayoutDashboard },
    { name: 'Post a Tuition', href: '/dashboard/tutor/post-tuition', icon: PlusCircle },
    { name: 'My Created Tuitions', href: '/dashboard/tutor/my-tuitions', icon: BookOpen },
    { name: 'Manage Applicants', href: '/dashboard/tutor/applicants', icon: Users },
  ];

  const adminNav = [
    { name: 'Overview', href: '/dashboard/admin', icon: LayoutDashboard },
    { name: 'User Management', href: '/dashboard/admin/users', icon: Users },
    { name: 'Tuition Moderation', href: '/dashboard/admin/tuitions', icon: CheckSquare },
    { name: 'Stripe Transactions', href: '/dashboard/admin/transactions', icon: CreditCard },
  ];

  const currentNav =
    user.role === 'admin' ? adminNav : user.role === 'tutor' ? tutorNav : studentNav;

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-cream dark:bg-[#081612] text-foreground font-sans">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden transition-opacity"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Deep Forest Sidebar Navigation (#0F2922) */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-72 transform border-r border-[#163A30] dark:border-white/10 bg-[#0F2922] text-[#FAF8F5] p-5 sm:p-6 transition-transform duration-300 ease-in-out md:static md:translate-x-0 ${
          sidebarOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full'
        } flex flex-col justify-between`}
      >
        <div className="space-y-6">
          {/* Header & Role Portal Title */}
          <div className="flex items-center justify-between pb-5 border-b border-white/10">
            <div>
              <span className="text-[10px] uppercase font-bold tracking-widest text-[#FAF8F5]/60 block font-sans">
                Dashboard
              </span>
              <h2 className="text-xl font-serif font-black text-white capitalize tracking-tight mt-0.5">
                {user.role} Portal
              </h2>
            </div>
            <button
              onClick={() => setSidebarOpen(false)}
              className="md:hidden p-1.5 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-colors"
              aria-label="Close Sidebar"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Main Website Quick Link */}
          <Link
            href="/"
            onClick={() => setSidebarOpen(false)}
            className="flex items-center justify-between px-4 py-3 rounded-2xl text-sm font-black text-white bg-brand-500 hover:bg-brand-600 border border-brand-100/20 transition-all duration-200 group shadow-[0_12px_30px_-10px_rgba(20,175,81,0.55)] hover:scale-[1.01]"
          >
            <div className="flex items-center gap-2.5">
              <span className="h-8 w-8 rounded-xl bg-white/15 flex items-center justify-center shrink-0">
                <Globe className="h-4 w-4 text-white group-hover:rotate-45 transition-transform duration-300" />
              </span>
              <span className="tracking-wide">Main Website</span>
            </div>
            <ArrowUpRight className="h-4 w-4 text-white/90 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>

          {/* User Preview Card */}
          <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 flex items-center gap-3 shadow-inner">
            <img
              src={user.image || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80'}
              alt={user.name}
              className="h-10 w-10 rounded-xl object-cover border border-white/20 shrink-0"
            />
            <div className="truncate flex-1 min-w-0">
              <p className="text-xs font-bold text-white truncate font-sans">{user.name}</p>
              <div className="flex items-center gap-1.5 mt-1">
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[9px] font-extrabold uppercase tracking-wider bg-white/15 text-white border border-white/20">
                  {user.role}
                </span>
                {user.plan === 'pro' && (
                  <Badge variant="pro" className="text-[9px] px-2 py-0">
                    PRO
                  </Badge>
                )}
              </div>
            </div>
          </div>

          {/* Nav Links */}
          <nav className="space-y-1.5 pt-1">
            <span className="text-[10px] font-bold text-[#FAF8F5]/50 uppercase tracking-widest px-3 block mb-2 font-sans">
              Main Menu
            </span>
            {currentNav.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-xs font-bold transition-all duration-200 group ${
                    isActive
                      ? 'bg-brand-500 text-white shadow-[0_10px_24px_-8px_rgba(20,175,81,0.45)]'
                      : 'text-[#FAF8F5]/75 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <Icon
                    className={`h-4 w-4 shrink-0 transition-transform duration-200 ${
                      isActive ? 'text-white scale-110' : 'text-[#FAF8F5]/70 group-hover:text-white'
                    }`}
                  />
                  <span className="truncate">{item.name}</span>
                </Link>
              );
            })}

            <div className="pt-4 mt-4 border-t border-white/10">
              <span className="text-[10px] font-bold text-[#FAF8F5]/50 uppercase tracking-widest px-3 block mb-2 font-sans">
                Account
              </span>
              <Link
                href="/dashboard/profile"
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-xs font-bold transition-all duration-200 group ${
                  pathname === '/dashboard/profile'
                    ? 'bg-terracotta-500 text-white shadow-glow'
                    : 'text-[#FAF8F5]/75 hover:text-white hover:bg-white/10'
                }`}
              >
                <User
                  className={`h-4 w-4 shrink-0 transition-transform duration-200 ${
                    pathname === '/dashboard/profile'
                      ? 'text-white scale-110'
                      : 'text-[#FAF8F5]/70 group-hover:text-white'
                  }`}
                />
                <span>My Profile</span>
              </Link>
            </div>
          </nav>
        </div>

        {/* Upgrade Card, Theme Toggle & Sign Out */}
        <div className="space-y-3 pt-5 border-t border-white/10 mt-6">
          {user.plan !== 'pro' && user.role !== 'admin' && (
            <Link href="/pricing" className="block group">
              <div className="p-3.5 rounded-2xl bg-gradient-to-br from-amberwarm-500/20 via-terracotta-500/15 to-transparent border border-brand-500/35 group-hover:border-brand-500/70 transition-all shadow-soft text-left">
                <div className="flex items-center gap-1.5 text-xs font-bold text-amber-400">
                  <Sparkles className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                  Upgrade to Pro
                </div>
                <p className="text-[10px] text-[#FAF8F5]/70 mt-1 leading-relaxed">
                  Unlock unlimited posts and priority matching.
                </p>
              </div>
            </Link>
          )}

          <div className="flex items-center justify-between px-3.5 py-2 rounded-2xl bg-white/5 border border-white/10 text-xs text-[#FAF8F5]/80">
            <span className="font-bold text-[11px]">Theme Mode</span>
            <ThemeToggle />
          </div>

          <button
            onClick={logout}
            className="flex w-full items-center gap-2.5 px-3.5 py-2.5 rounded-2xl text-xs font-bold text-rose-300 hover:text-white hover:bg-rose-500/20 transition-all duration-200"
          >
            <LogOut className="h-4 w-4 shrink-0" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Mobile-Only Header Bar (Drawer Toggle on small screens) */}
        <div className="md:hidden flex items-center justify-between px-4 py-3 border-b border-forest-900/10 dark:border-white/10 bg-card/90 backdrop-blur-md sticky top-0 z-30">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 text-foreground rounded-xl border border-forest-900/15 dark:border-white/15 hover:bg-forest-900/5 dark:hover:bg-white/5 transition-colors"
            aria-label="Open Sidebar"
          >
            <Menu className="h-5 w-5" />
          </button>
          <div className="flex items-center gap-2">
            <span className="text-[11px] uppercase font-bold text-muted-foreground">{user.role}</span>
            <span className="font-serif font-black text-sm text-foreground capitalize">
              {pathname.split('/').pop()?.replace(/-/g, ' ') || 'Dashboard'}
            </span>
          </div>
          <ThemeToggle />
        </div>

        {/* Sub-page Content */}
        <main className="p-4 sm:p-8 flex-1 bg-cream dark:bg-[#081612] transition-colors">
          {children}
        </main>
      </div>
    </div>
  );
}
