'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowUpRight, Sparkles } from 'lucide-react';
import api from '@/lib/api';
import { TuitionCard, TuitionCardProps } from '@/components/tuition/TuitionCard';
import { TuitionCardSkeleton } from '@/components/common/Skeleton';

const FILTER_PILLS = [
  { key: 'all', label: 'All Groups' },
  { key: 'mathematics', label: 'Mathematics' },
  { key: 'physics', label: 'Physics' },
  { key: 'biology', label: 'Biology' },
  { key: 'hsc', label: 'HSC &amp; Admissions' },
  { key: 'online', label: 'Live Online' },
];

export const FeaturedTuitions: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [tuitions, setTuitions] = useState<TuitionCardProps[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch real database tuitions matching the /tuitions page
  useEffect(() => {
    let isMounted = true;
    const fetchFeatured = async () => {
      try {
        setLoading(true);
        const res = await api.get('/tuitions/featured');
        if (isMounted && res.data?.data) {
          setTuitions(res.data.data);
        }
      } catch (err) {
        console.error('[FeaturedTuitions] Failed to load featured batches:', err);
        // Fallback to latest tuitions endpoint if featured endpoint differs
        try {
          const fallbackRes = await api.get('/tuitions?limit=6');
          if (isMounted && fallbackRes.data?.data) {
            setTuitions(fallbackRes.data.data);
          }
        } catch (fallbackErr) {
          console.error('[FeaturedTuitions] Fallback fetch failed:', fallbackErr);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchFeatured();
    return () => {
      isMounted = false;
    };
  }, []);

  // Listen to external physics canvas orb clicks or quick tags
  useEffect(() => {
    const handleFilterEvent = (e: Event) => {
      const customEvent = e as CustomEvent<{ filter: string }>;
      if (customEvent.detail?.filter) {
        setActiveFilter(customEvent.detail.filter.toLowerCase());
      }
    };

    window.addEventListener('mentorlagbe:filter-batches', handleFilterEvent);
    return () => {
      window.removeEventListener('mentorlagbe:filter-batches', handleFilterEvent);
    };
  }, []);

  const filteredTuitions = tuitions.filter((t) => {
    if (activeFilter === 'all') return true;
    const filter = activeFilter.toLowerCase();
    const searchContext = `${t.subject} ${t.title} ${t.classLevel} ${t.mode} ${t.location}`.toLowerCase();
    return searchContext.includes(filter);
  });

  return (
    <section id="batches" className="py-20 lg:py-28 bg-cream/50 dark:bg-[#081612] transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-500/10 text-brand-600 dark:text-brand-100 text-xs font-bold uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Handpicked for You</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-forest-900 dark:text-[#F5F2EB] mt-2">
              Batches Worth a Look
            </h2>
            <p className="text-forest-800/75 dark:text-[#F5F2EB]/75 mt-2 max-w-xl text-sm leading-relaxed">
              Admin-reviewed groups led by BUET, DMC and DU mentors, online or around Dhaka. Monthly fees are shown in BDT (৳).
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-2">
            {FILTER_PILLS.map((pill) => {
              const isActive = activeFilter === pill.key;
              return (
                <button
                  key={pill.key}
                  onClick={() => setActiveFilter(pill.key)}
                  className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                    isActive
                      ? 'bg-forest-900 text-white shadow-soft dark:bg-brand-600'
                      : 'bg-white dark:bg-[#0F241E] border border-forest-900/10 dark:border-white/10 text-forest-900 dark:text-white hover:border-brand-500'
                  }`}
                >
                  {pill.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Live Batches Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-7 items-stretch">
          {loading ? (
            Array.from({ length: 6 }).map((_, idx) => (
              <TuitionCardSkeleton key={idx} />
            ))
          ) : filteredTuitions.length > 0 ? (
            filteredTuitions.map((tuition) => (
              <TuitionCard key={tuition._id} {...tuition} />
            ))
          ) : (
            <div className="col-span-full py-16 text-center rounded-3xl border border-dashed border-forest-900/15 dark:border-white/15 bg-white/60 dark:bg-[#0F241E]/60 p-8">
              <p className="font-serif text-lg font-bold text-forest-900 dark:text-white">
                Nothing matches &ldquo;{activeFilter}&rdquo; yet
              </p>
              <p className="text-xs text-forest-800/60 dark:text-white/60 mt-1">
                Try another subject or browse the full catalog.
              </p>
              <button
                onClick={() => setActiveFilter('all')}
                className="mt-4 px-5 py-2 rounded-full bg-forest-900 dark:bg-brand-600 text-white font-bold text-xs hover:bg-brand-500 transition-colors cursor-pointer"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>

        {/* Bottom Explorer Button */}
        <div className="text-center mt-12">
          <Link
            href="/tuitions"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-white dark:bg-[#0F241E] border-2 border-forest-900 dark:border-white/20 text-forest-900 dark:text-white font-bold text-sm hover:bg-forest-900 hover:text-white dark:hover:bg-white dark:hover:text-forest-900 transition-all shadow-sm"
          >
            <span>Browse All Batches</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedTuitions;
