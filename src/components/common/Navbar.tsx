'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/context/AuthContext';
import Logo from './Logo';
import { Badge } from '@/components/ui/badge';
import {
  Menu,
  X,
  User as UserIcon,
  LayoutDashboard,
  LogOut,
  ChevronDown,
  Sparkles,
  ArrowRight,
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  // Prevent background scroll when mobile drawer is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Browse Tuitions', href: '/tuitions' },
    { name: 'Our Tutors', href: '/tutors' },
    { name: 'Why MentorLagbe', href: '/#bonding' },
    { name: 'Subjects', href: '/#subjects' },
    { name: 'How It Works', href: '/how-it-works' },
    { name: 'Pricing', href: '/pricing' },
  ];

  const getDashboardLink = () => {
    if (!user) return '/sign-in';
    if (user.role === 'admin') return '/dashboard/admin';
    if (user.role === 'tutor') return '/dashboard/tutor';
    return '/dashboard/student';
  };

  // Do not render public marketing navbar on dashboard routes
  if (pathname.startsWith('/dashboard')) {
    return null;
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-forest-900/10 dark:border-white/10 bg-white/95 dark:bg-[#0F241E]/95 backdrop-blur-md select-none">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand */}
        <Logo size="md" />

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center gap-7 lg:gap-8 text-sm font-semibold text-forest-800/80 dark:text-[#F5F2EB]/80">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`transition-colors duration-200 hover:text-brand-500 ${
                  isActive ? 'text-brand-500 font-bold' : ''
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </div>

        {/* Desktop User Actions */}
        <div className="hidden md:flex items-center gap-3">
          {user ? (
            <div className="relative">
              <button
                onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                className="flex items-center gap-2.5 rounded-full border border-forest-900/10 dark:border-white/10 bg-cream/70 dark:bg-forest-900/40 p-1.5 pr-3.5 text-sm font-medium hover:border-brand-500/50 transition-all focus:outline-none"
              >
                <img
                  src={
                    user.image ||
                    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80'
                  }
                  alt={user.name}
                  className="w-7 h-7 rounded-full object-cover border border-forest-900/10 dark:border-white/10"
                />
                <div className="flex flex-col text-left">
                  <div className="flex items-center gap-1.5">
                    <span className="font-bold text-forest-900 dark:text-[#F5F2EB] text-xs leading-none">
                      {user.name.split(' ')[0]}
                    </span>
                    {user.plan === 'pro' && (
                      <Badge variant="pro" className="px-1.5 py-0 h-4 text-[9px]">
                        PRO
                      </Badge>
                    )}
                  </div>
                  <Badge variant="secondary" className="capitalize text-[10px] h-4 px-1.5 leading-none">
                    {user.role}
                  </Badge>
                </div>
                <ChevronDown className="h-3.5 w-3.5 text-forest-800/60 dark:text-[#F5F2EB]/60 ml-0.5" />
              </button>

              {/* Profile Dropdown */}
              <AnimatePresence>
                {profileDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.96 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 mt-2 w-56 rounded-3xl border border-forest-900/10 dark:border-white/10 bg-white dark:bg-[#0F241E] p-2 shadow-soft z-50"
                    onMouseLeave={() => setProfileDropdownOpen(false)}
                  >
                    <div className="px-3.5 py-2.5 border-b border-forest-900/10 dark:border-white/10">
                      <p className="text-xs font-bold text-forest-900 dark:text-[#F5F2EB] truncate">
                        {user.name}
                      </p>
                      <p className="text-[11px] text-forest-800/60 dark:text-[#F5F2EB]/60 truncate">
                        {user.email}
                      </p>
                      <div className="mt-1.5 flex items-center gap-1.5">
                        <Badge variant="secondary" className="capitalize text-[10px] h-5">
                          {user.role}
                        </Badge>
                        {user.plan === 'pro' && (
                          <Badge variant="pro" className="text-[10px] h-5">
                            Pro Member
                          </Badge>
                        )}
                      </div>
                    </div>

                    <div className="py-1">
                      <Link
                        href={getDashboardLink()}
                        onClick={() => setProfileDropdownOpen(false)}
                        className="flex items-center gap-2.5 rounded-2xl px-3.5 py-2 text-xs font-semibold text-forest-900 dark:text-[#F5F2EB] hover:bg-forest-900/5 dark:hover:bg-white/5 transition-colors"
                      >
                        <LayoutDashboard className="h-4 w-4 text-forest-900 dark:text-white" />
                        Dashboard
                      </Link>

                      <Link
                        href="/dashboard/profile"
                        onClick={() => setProfileDropdownOpen(false)}
                        className="flex items-center gap-2.5 rounded-2xl px-3.5 py-2 text-xs font-semibold text-forest-900 dark:text-[#F5F2EB] hover:bg-forest-900/5 dark:hover:bg-white/5 transition-colors"
                      >
                        <UserIcon className="h-4 w-4 text-brand-500" />
                        Update Profile
                      </Link>

                      {user.plan !== 'pro' && (
                        <Link
                          href="/pricing"
                          onClick={() => setProfileDropdownOpen(false)}
                          className="flex items-center gap-2.5 rounded-2xl px-3.5 py-2 text-xs font-semibold text-brand-500 hover:bg-brand-500/10 transition-colors"
                        >
                          <Sparkles className="h-4 w-4" />
                          Upgrade to Pro
                        </Link>
                      )}
                    </div>

                    <div className="pt-1 border-t border-forest-900/10 dark:border-white/10">
                      <button
                        onClick={() => {
                          setProfileDropdownOpen(false);
                          logout();
                        }}
                        className="flex w-full items-center gap-2.5 rounded-2xl px-3.5 py-2 text-xs font-semibold text-destructive hover:bg-destructive/10 transition-colors"
                      >
                        <LogOut className="h-4 w-4" />
                        Sign Out
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <div className="flex items-center gap-2.5">
              <Link
                href="/sign-in"
                className="text-sm font-bold text-forest-900 dark:text-white px-4 py-2 rounded-full hover:bg-forest-900/5 dark:hover:bg-white/5 transition-colors"
              >
                Sign In
              </Link>
              <Link
                href="/sign-up"
                className="text-sm font-bold bg-forest-900 dark:bg-white text-white dark:text-forest-900 px-5 py-2.5 rounded-full hover:bg-brand-500 dark:hover:bg-brand-500 dark:hover:text-white transition-all shadow-sm flex items-center gap-1.5"
              >
                <span>Sign Up</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Hamburger Toggle */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="p-2 text-forest-900 dark:text-white focus:outline-none rounded-full border border-forest-900/10 dark:border-white/10 bg-cream/70 dark:bg-forest-900/50 hover:bg-forest-900/10 transition-colors"
            aria-label="Open Navigation Menu"
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </nav>

      {/* Mobile Drawer Sheet */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-50 md:hidden">
            {/* Backdrop Blur Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setMobileMenuOpen(false)}
            />

            {/* Slide-in Sheet Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 300 }}
              className="fixed top-0 right-0 bottom-0 w-full max-w-sm bg-white dark:bg-[#0F241E] border-l border-forest-900/10 dark:border-white/10 shadow-2xl flex flex-col justify-between z-50 overflow-y-auto"
            >
              <div>
                {/* Drawer Header */}
                <div className="flex items-center justify-between p-5 border-b border-forest-900/10 dark:border-white/10">
                  <Logo size="sm" />
                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-2 text-forest-900 dark:text-white rounded-full border border-forest-900/10 dark:border-white/10 hover:bg-forest-900/5 transition-colors"
                    aria-label="Close Navigation Menu"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                {/* Nav Links */}
                <nav className="p-5 space-y-1.5">
                  {navLinks.map((link) => {
                    const isActive = pathname === link.href;
                    return (
                      <Link
                        key={link.name}
                        href={link.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className={`flex items-center justify-between px-4 py-3 rounded-2xl text-sm font-bold transition-all ${
                          isActive
                            ? 'bg-forest-900 text-white dark:bg-white dark:text-forest-900 shadow-sm'
                            : 'text-forest-900 dark:text-[#F5F2EB] hover:bg-forest-900/5 dark:hover:bg-white/5'
                        }`}
                      >
                        <span>{link.name}</span>
                        {isActive && <ArrowRight className="h-4 w-4" />}
                      </Link>
                    );
                  })}
                  <div className="pt-2 border-t border-forest-900/10 dark:border-white/10 mt-3 space-y-1.5">
                    <Link
                      href="/become-a-tutor"
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center justify-between px-4 py-2.5 rounded-2xl text-sm font-semibold text-forest-800/80 dark:text-[#F5F2EB]/80 hover:bg-forest-900/5"
                    >
                      <span>Become a Tutor</span>
                      <ArrowRight className="h-4 w-4 text-brand-500" />
                    </Link>
                  </div>
                </nav>
              </div>

              {/* Drawer User Actions / Footer */}
              <div className="p-5 border-t border-forest-900/10 dark:border-white/10 bg-cream/40 dark:bg-forest-900/30">
                {user ? (
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 p-3.5 rounded-3xl bg-white dark:bg-[#0F241E] border border-forest-900/10 dark:border-white/10">
                      <img
                        src={
                          user.image ||
                          'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80'
                        }
                        alt={user.name}
                        className="h-10 w-10 rounded-full object-cover border border-forest-900/10 dark:border-white/10"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5">
                          <p className="text-sm font-bold text-forest-900 dark:text-[#F5F2EB] truncate">
                            {user.name}
                          </p>
                          {user.plan === 'pro' && (
                            <Badge variant="pro" className="px-1.5 py-0 h-4 text-[9px]">
                              PRO
                            </Badge>
                          )}
                        </div>
                        <p className="text-xs text-forest-800/60 dark:text-[#F5F2EB]/60 truncate">
                          {user.email}
                        </p>
                        <Badge variant="secondary" className="capitalize text-[10px] h-4 mt-1">
                          {user.role}
                        </Badge>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Link
                        href={getDashboardLink()}
                        onClick={() => setMobileMenuOpen(false)}
                        className="flex items-center gap-2.5 px-4 py-2.5 rounded-2xl text-xs font-bold text-forest-900 dark:text-[#F5F2EB] bg-white dark:bg-[#0F241E] border border-forest-900/10 dark:border-white/10 hover:border-forest-900"
                      >
                        <LayoutDashboard className="h-4 w-4 text-forest-900 dark:text-white" />
                        Dashboard
                      </Link>

                      <Link
                        href="/dashboard/profile"
                        onClick={() => setMobileMenuOpen(false)}
                        className="flex items-center gap-2.5 px-4 py-2.5 rounded-2xl text-xs font-bold text-forest-900 dark:text-[#F5F2EB] bg-white dark:bg-[#0F241E] border border-forest-900/10 dark:border-white/10 hover:border-brand-500"
                      >
                        <UserIcon className="h-4 w-4 text-brand-500" />
                        Update Profile
                      </Link>

                      {user.plan !== 'pro' && (
                        <Link
                          href="/pricing"
                          onClick={() => setMobileMenuOpen(false)}
                          className="flex items-center gap-2.5 px-4 py-2.5 rounded-2xl text-xs font-bold text-brand-500 bg-brand-100/30 border border-brand-500/30"
                        >
                          <Sparkles className="h-4 w-4" />
                          Upgrade to Pro
                        </Link>
                      )}

                      <button
                        onClick={() => {
                          setMobileMenuOpen(false);
                          logout();
                        }}
                        className="flex w-full items-center gap-2.5 px-4 py-2.5 rounded-2xl text-xs font-bold text-destructive bg-destructive/10 border border-destructive/20 hover:bg-destructive/20 transition-colors"
                      >
                        <LogOut className="h-4 w-4" />
                        Sign Out
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-2.5">
                    <Link
                      href="/sign-in"
                      onClick={() => setMobileMenuOpen(false)}
                      className="block w-full py-3 text-center text-sm font-bold text-forest-900 dark:text-white rounded-full border border-forest-900/10 dark:border-white/10 bg-white dark:bg-[#0F241E] hover:bg-forest-900/5 transition-colors"
                    >
                      Sign In
                    </Link>
                    <Link
                      href="/sign-up"
                      onClick={() => setMobileMenuOpen(false)}
                      className="block w-full py-3 text-center text-sm font-bold bg-forest-900 dark:bg-white text-white dark:text-forest-900 rounded-full hover:bg-brand-500 transition-colors shadow-sm"
                    >
                      Sign Up
                    </Link>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
