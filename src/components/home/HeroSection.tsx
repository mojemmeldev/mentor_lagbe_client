'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search, MapPin, Star } from 'lucide-react';

export const HeroSection: React.FC = () => {
  const router = useRouter();
  const [subjectQuery, setSubjectQuery] = useState('');
  const [locationQuery, setLocationQuery] = useState('All');

  const handleHeroSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (subjectQuery.trim()) params.set('search', subjectQuery.trim());
    if (locationQuery && locationQuery.toLowerCase() !== 'all') {
      const normalizedMode =
        locationQuery.toLowerCase() === 'online' ? 'Online' : 'Offline';
      params.set('mode', normalizedMode);
    }
    router.push(`/tuitions?${params.toString()}`);
  };

  const quickFilterTag = (tag: string) => {
    setSubjectQuery(tag);
    router.push(`/tuitions?search=${encodeURIComponent(tag)}`);
  };

  return (
    <section className="relative pt-10 pb-20 lg:pt-14 lg:pb-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Headline, Search Dock & Trust Proof */}
          <div className="lg:col-span-7 space-y-7">
            {/* Pill Badge */}
            <div className="hero-badge inline-flex items-center gap-2 bg-brand-50 dark:bg-brand-700/20 border border-brand-500/20 text-brand-700 dark:text-brand-100 px-4 py-1.5 rounded-full text-xs font-bold tracking-wide uppercase">
              <span className="w-2 h-2 rounded-full bg-brand-500 animate-pulse"></span>
              Your Shortcut to Trusted Academic Mentors in Bangladesh
            </div>

            {/* H1 Headline with Green Curved Underline */}
            <h1
              id="heroHeadline"
              className="font-serif text-4xl sm:text-5xl lg:text-[58px] font-bold text-forest-900 dark:text-[#F5F2EB] leading-[1.12] tracking-tight"
            >
              Find the Right Mentor for Your Goals
            </h1>

            {/* Subtitle */}
            <p className="hero-subtitle text-base sm:text-lg text-forest-800/80 dark:text-[#F5F2EB]/80 max-w-xl leading-relaxed font-medium">
              Explore mentor profiles by subject and find one who fits what you want to learn.
            </p>

            {/* Interactive Search Dock → Browse Tuitions */}
            <div className="hero-cta-group bg-white dark:bg-[#0F241E] p-3 rounded-3xl shadow-soft border border-forest-900/10 dark:border-white/10 max-w-xl">
              <form onSubmit={handleHeroSearch} className="grid sm:grid-cols-12 gap-2.5 items-center">
                <div className="sm:col-span-5 flex items-center gap-2.5 px-3.5 py-2.5 bg-cream dark:bg-[#153028] rounded-2xl">
                  <Search className="w-5 h-5 text-brand-500 shrink-0" />
                  <input
                    id="heroSubjectInput"
                    type="text"
                    value={subjectQuery}
                    onChange={(e) => setSubjectQuery(e.target.value)}
                    placeholder="Type a subject, e.g. HSC Physics"
                    className="bg-transparent w-full text-sm font-semibold text-forest-900 dark:text-white placeholder-forest-800/40 dark:placeholder-white/40 focus:outline-none"
                  />
                </div>
                <div className="sm:col-span-4 flex items-center gap-2.5 px-3.5 py-2.5 bg-cream dark:bg-[#153028] rounded-2xl">
                  <MapPin className="w-5 h-5 text-brand-600 dark:text-brand-100 shrink-0" />
                  <select
                    id="heroLocationSelect"
                    value={locationQuery}
                    onChange={(e) => setLocationQuery(e.target.value)}
                    className="bg-transparent w-full text-sm font-semibold text-forest-900 dark:text-white focus:outline-none cursor-pointer"
                  >
                    <option value="All" className="dark:bg-[#0F241E]">Anywhere (Online or Dhaka)</option>
                    <option value="Offline" className="dark:bg-[#0F241E]">Dhaka Home Sessions</option>
                    <option value="Online" className="dark:bg-[#0F241E]">Live Online Classes</option>
                  </select>
                </div>
                <div className="sm:col-span-3">
                  <button
                    type="submit"
                    className="w-full bg-brand-500 hover:bg-brand-600 text-white font-bold text-sm py-3.5 px-4 rounded-2xl transition-all shadow-[0_12px_30px_-6px_rgba(20,175,81,0.35)] flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <span>Browse Tuitions</span>
                  </button>
                </div>
              </form>

              {/* Quick Popular Tags */}
              <div className="flex flex-wrap items-center gap-2 mt-3 px-2 text-xs font-semibold text-forest-800/60 dark:text-white/60">
                <span>Trending:</span>
                <button
                  type="button"
                  onClick={() => quickFilterTag('Higher Math')}
                  className="px-2.5 py-1 rounded-full bg-cream dark:bg-[#153028] hover:bg-brand-50 hover:text-brand-700 dark:hover:bg-brand-500/20 dark:hover:text-brand-100 transition-colors cursor-pointer"
                >
                  HSC Math
                </button>
                <button
                  type="button"
                  onClick={() => quickFilterTag('Biology')}
                  className="px-2.5 py-1 rounded-full bg-cream dark:bg-[#153028] hover:bg-brand-50 hover:text-brand-700 dark:hover:bg-brand-500/20 dark:hover:text-brand-100 transition-colors cursor-pointer"
                >
                  Bio for Medical
                </button>
                <button
                  type="button"
                  onClick={() => quickFilterTag('IELTS')}
                  className="px-2.5 py-1 rounded-full bg-cream dark:bg-[#153028] hover:bg-brand-50 hover:text-brand-700 dark:hover:bg-brand-500/20 dark:hover:text-brand-100 transition-colors cursor-pointer"
                >
                  IELTS Prep
                </button>
                <button
                  type="button"
                  onClick={() => quickFilterTag('Next.js')}
                  className="px-2.5 py-1 rounded-full bg-cream dark:bg-[#153028] hover:bg-brand-50 hover:text-brand-700 dark:hover:bg-brand-500/20 dark:hover:text-brand-100 transition-colors cursor-pointer"
                >
                  Coding &amp; Web
                </button>
              </div>
            </div>

            {/* Social Proof Avatars */}
            <div className="hero-social flex flex-wrap items-center gap-5 pt-1">
              <div className="flex -space-x-3">
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80"
                  alt="Student"
                  className="w-11 h-11 rounded-full border-2 border-white dark:border-[#0F241E] object-cover"
                />
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80"
                  alt="Mentor"
                  className="w-11 h-11 rounded-full border-2 border-white dark:border-[#0F241E] object-cover"
                />
                
                <div className="w-11 h-11 rounded-full border-2 border-white dark:border-[#0F241E] bg-brand-500 text-white text-xs font-bold flex items-center justify-center">
                  1.5k+
                </div>
              </div>
              <div>
                <div className="flex items-center gap-1 text-brand-500">
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                  <span className="text-forest-900 dark:text-white font-bold text-sm ml-1">
                    4.9/5
                  </span>
                </div>
                <p className="text-xs font-semibold text-forest-800/70 dark:text-white/70">
                  Chosen by <span className="font-bold text-forest-900 dark:text-white">1,200+</span> learners and{' '}
                  <span className="font-bold text-forest-900 dark:text-white">350+</span> Verified Mentors
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: High-Quality Illustration */}
          <div className="lg:col-span-5">
            <div className="relative rounded-[2rem] overflow-hidden border border-brand-500/20 dark:border-white/10 shadow-card bg-brand-50 dark:bg-[#0F241E]">
              <img
                src="/images/hero-illustration.jpg"
                alt="A mentor guiding a student during a tuition session"
                className="w-full h-auto aspect-[4/3] object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
