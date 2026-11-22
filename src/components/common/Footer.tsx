'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Mail,
  PhoneCall,
  MapPin,
  HeartHandshake,
  Globe,
  MessageCircle,
  GraduationCap,
  CheckCircle2,
} from 'lucide-react';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setEmail('');
    setTimeout(() => {
      setSubscribed(false);
    }, 3500);
  };

  return (
    <footer id="mainFooter" className="bg-forest-900 text-white pt-20 pb-10 border-t border-white/10 relative overflow-hidden select-none">
      {/* Giant Background Display Watermark (Hover directly on MentorLagbe text to fill) */}
      <div className="footer-watermark-wrap pointer-events-none select-none absolute inset-x-0 bottom-0 translate-y-[14%] flex items-end justify-center z-0 overflow-hidden">
        <span className="footer-watermark-text font-serif font-bold leading-[0.88] tracking-tight">
          MentorLagbe
        </span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pointer-events-none">
        {/* Top Newsletter & Live Mentorship Alerts Row */}
        <div className="pointer-events-auto pb-14 border-b border-white/10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-emerald-300 text-[11px] font-bold uppercase tracking-wider mb-3">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Dhaka and Online Mentorship Hub
            </div>
            <h3 className="font-serif text-3xl sm:text-4xl font-bold text-white leading-tight">
              Get First Word on New Batches from{' '}
              <span className="italic text-brand-500">BUET, DMC &amp; DU</span> Mentors.
            </h3>
          </div>

          <form onSubmit={handleSubscribe} className="w-full lg:w-auto flex flex-col sm:flex-row gap-3">
            <div className="flex items-center gap-2.5 bg-white/10 border border-white/15 rounded-2xl px-4 py-3.5 min-w-[280px] focus-within:border-brand-500 transition-colors">
              <Mail className="w-4 h-4 text-white/60 shrink-0" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address..."
                className="bg-transparent text-sm text-white placeholder-white/50 focus:outline-none w-full"
              />
            </div>
            <button
              type="submit"
              className={`px-6 py-3.5 rounded-2xl text-white font-bold text-sm transition-all shadow-[0_12px_30px_-6px_rgba(20,175,81,0.35)] shrink-0 flex items-center justify-center gap-2 ${
                subscribed
                  ? 'bg-brand-600 hover:bg-emerald-700'
                  : 'bg-brand-500 hover:bg-brand-600'
              }`}
            >
              {subscribed ? (
                <>
                  <CheckCircle2 className="w-4 h-4" />
                  <span>You&apos;re In ✓</span>
                </>
              ) : (
                <span>Notify Me</span>
              )}
            </button>
          </form>
        </div>

        {/* Middle 4-Column Architectural Grid */}
        <div className="pointer-events-auto grid sm:grid-cols-2 lg:grid-cols-12 gap-10 py-14 border-b border-white/10">
          {/* Brand & Mission Column */}
          <div className="lg:col-span-4 space-y-4">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-full bg-brand-500 text-white flex items-center justify-center transition-transform group-hover:scale-105">
                <HeartHandshake className="w-5 h-5" />
              </div>
              <span className="font-serif font-bold text-2xl text-white">
                Mentor<span className="text-brand-500">Lagbe</span>
              </span>
            </Link>
            <p className="text-sm text-white/70 leading-relaxed max-w-sm">
              A trusted mentoring hub in Bangladesh for focused 1-on-1 guidance and small-group batches, with no middleman fees.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://x.com/MentorLagbe"
                target="_blank"
                rel="noreferrer"
                aria-label="Follow MentorLagbe on X"
                title="MentorLagbe on X"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-black flex items-center justify-center transition-colors text-white"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a
                href="/tuitions"
                aria-label="Tuitions Network"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-brand-500 flex items-center justify-center transition-colors text-white"
              >
                <Globe className="w-4 h-4" />
              </a>
              <a
                href="https://wa.me/8801700000000"
                target="_blank"
                rel="noreferrer"
                aria-label="WhatsApp Support"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-brand-600 flex items-center justify-center transition-colors text-white"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
              <Link
                href="/become-a-tutor"
                aria-label="Tutor Community"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-brand-500 flex items-center justify-center transition-colors text-white"
              >
                <GraduationCap className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Explore Links */}
          <div className="lg:col-span-2">
            <h4 className="font-bold text-xs uppercase tracking-widest text-brand-500 mb-4">
              Explore
            </h4>
            <ul className="space-y-3 text-sm text-white/75">
              <li>
                <Link href="/tuitions" className="hover:text-white transition-colors">
                  Find a Batch
                </Link>
              </li>
              <li>
                <Link href="/#bonding" className="hover:text-white transition-colors">
                  Our Difference
                </Link>
              </li>
              <li>
                <Link href="/how-it-works" className="hover:text-white transition-colors">
                  How It Works
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="hover:text-white transition-colors">
                  Pro Plans
                </Link>
              </li>
            </ul>
          </div>

          {/* Top Subjects */}
          <div className="lg:col-span-3">
            <h4 className="font-bold text-xs uppercase tracking-widest text-brand-500 mb-4">
              Top Subjects
            </h4>
            <ul className="space-y-3 text-sm text-white/75">
              <li>
                <Link href="/tuitions?subject=Mathematics" className="hover:text-white transition-colors">
                  HSC Higher Math
                </Link>
              </li>
              <li>
                <Link href="/tuitions?subject=Physics" className="hover:text-white transition-colors">
                  Engineering Physics
                </Link>
              </li>
              <li>
                <Link href="/tuitions?subject=Biology" className="hover:text-white transition-colors">
                  Medical Biology
                </Link>
              </li>
              <li>
                <Link href="/tuitions?subject=Programming" className="hover:text-white transition-colors">
                  Web &amp; Coding
                </Link>
              </li>
            </ul>
          </div>

          {/* Our Hubs & Helpline */}
          <div className="lg:col-span-3">
            <h4 className="font-bold text-xs uppercase tracking-widest text-brand-500 mb-4">
              Our Hubs
            </h4>
            <ul className="space-y-3 text-sm text-white/75">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-brand-500 shrink-0 mt-1" />
                <span>Dhanmondi, Uttara and Mirpur, Dhaka</span>
              </li>
              <li className="flex items-center gap-2.5">
                <PhoneCall className="w-4 h-4 text-brand-500 shrink-0" />
                <span>+880 1700 000000 (10 AM – 10 PM)</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-brand-500 shrink-0" />
                <span>support@mentorlagbe.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Spacer so giant background watermark breathes cleanly below links */}
        <div className="h-28 sm:h-40 pointer-events-none" />

        {/* Bottom Legal & Copyright Bar */}
        <div className="pt-4 pointer-events-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/60">
          <p>© {new Date().getFullYear()} MentorLagbe Inc. Built for learners and mentors across Bangladesh.</p>
          <div className="flex flex-wrap items-center gap-6">
            <Link href="/#trustSafetySection" className="hover:text-white transition-colors">
              Verification Rules
            </Link>
            <Link href="/#faqSection" className="hover:text-white transition-colors">
              Safety Policy
            </Link>
            <Link href="/pricing" className="hover:text-white transition-colors">
              Terms &amp; Privacy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
