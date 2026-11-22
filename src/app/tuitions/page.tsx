'use client';

import React, { useCallback, useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Search, RotateCcw, BookOpen, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import TuitionCard from '@/components/tuition/TuitionCard';
import { API_URL } from '@/lib/api';

type TuitionItem = {
  _id: string;
  title: string;
  subject?: string;
  classLevel?: string;
  mode?: string;
  monthlyFee?: number;
  location?: string;
  daysPerWeek?: number;
  preferredSubjects?: string[];
};

type PaginationInfo = {
  page: number;
  totalPages: number;
  total: number;
};

export default function BrowseTuitionsContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [search, setSearch] = useState(searchParams.get('search') || '');
  const [subject, setSubject] = useState(searchParams.get('subject') || 'All');
  const [classLevel, setClassLevel] = useState(searchParams.get('classLevel') || 'All');
  const [mode, setMode] = useState(searchParams.get('mode') || 'All');
  const [page, setPage] = useState(Number(searchParams.get('page') || '1'));
  const [loading, setLoading] = useState(true);
  const [tuitions, setTuitions] = useState<TuitionItem[]>([]);
  const [pagination, setPagination] = useState<PaginationInfo>({ page: 1, totalPages: 1, total: 0 });

  const fetchTuitions = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (search) params.set('search', search);
      if (subject !== 'All') params.set('subject', subject);
      if (classLevel !== 'All') params.set('classLevel', classLevel);
      if (mode !== 'All') params.set('mode', mode);
      params.set('page', String(page));
      params.set('limit', '9');

      const res = await fetch(`${API_URL}/tuitions?${params.toString()}`);
      const data = await res.json();
      if (res.ok) {
        setTuitions(data.data || []);
        setPagination(data.pagination || { page: 1, totalPages: 1, total: 0 });
      } else {
        setTuitions([]);
        setPagination({ page: 1, totalPages: 1, total: 0 });
      }
    } catch (err) {
      setTuitions([]);
      setPagination({ page: 1, totalPages: 1, total: 0 });
    } finally {
      setLoading(false);
    }
  }, [search, subject, classLevel, mode, page]);

  useEffect(() => {
    fetchTuitions();
  }, [fetchTuitions]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(1);
    fetchTuitions();
  };

  const handleReset = () => {
    setSearch('');
    setSubject('All');
    setClassLevel('All');
    setMode('All');
    setPage(1);
    router.push('/tuitions');
  };

  return (
    <div className="min-h-screen bg-cream dark:bg-[#071A14]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-forest-900 dark:text-[#F5F2EB] mb-2">
            Browse Tuitions
          </h1>
          <p className="text-forest-800/70 dark:text-white/70">Find the right batch or 1-on-1 plan for your goals.</p>
        </div>

        <div className="rounded-3xl border border-forest-900/10 dark:border-white/10 bg-white dark:bg-[#0F241E] p-5 sm:p-6 shadow-card mb-8">
          <form onSubmit={handleSearchSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-4">
            <div className="lg:col-span-5">
              <label className="block text-[11px] font-bold uppercase tracking-wider text-forest-800/60 dark:text-white/60 mb-1.5">
                Search
              </label>
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Subject, class, or location"
                className="w-full h-11 rounded-2xl border border-forest-900/15 dark:border-white/15 bg-cream/40 dark:bg-[#153028] px-4 text-sm text-forest-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500/40"
              />
            </div>
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-forest-800/60 dark:text-white/60 mb-1.5">
                  Subject Area
                </label>
                <select
                  value={subject}
                  onChange={(e) => {
                    setSubject(e.target.value);
                    setPage(1);
                  }}
                  className="w-full h-11 rounded-2xl border border-forest-900/15 dark:border-white/15 bg-cream/40 dark:bg-[#153028] px-3.5 text-xs sm:text-sm text-forest-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500/40 cursor-pointer"
                >
                  <option value="All">All</option>
                  <option value="Math">Math</option>
                  <option value="Physics">Physics</option>
                </select>
              </div>
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-forest-800/60 dark:text-white/60 mb-1.5">
                  Class Level
                </label>
                <select
                  value={classLevel}
                  onChange={(e) => {
                    setClassLevel(e.target.value);
                    setPage(1);
                  }}
                  className="w-full h-11 rounded-2xl border border-forest-900/15 dark:border-white/15 bg-cream/40 dark:bg-[#153028] px-3.5 text-xs sm:text-sm text-forest-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500/40 cursor-pointer"
                >
                  <option value="All">All</option>
                  <option value="Class 9-10">Class 9-10</option>
                  <option value="HSC">HSC</option>
                </select>
              </div>
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-forest-800/60 dark:text-white/60 mb-1.5">
                  Mode
                </label>
                <select
                  value={mode}
                  onChange={(e) => {
                    setMode(e.target.value);
                    setPage(1);
                  }}
                  className="w-full h-11 rounded-2xl border border-forest-900/15 dark:border-white/15 bg-cream/40 dark:bg-[#153028] px-3.5 text-xs sm:text-sm text-forest-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500/40 cursor-pointer"
                >
                  <option value="All">All</option>
                  <option value="Online">Online</option>
                  <option value="Offline">Offline</option>
                </select>
              </div>
            </div>
            <div className="lg:col-span-12 flex items-center gap-3 pt-2">
              <Button type="submit" variant="default" className="h-12 px-6 gap-2 rounded-full font-bold cursor-pointer">
                <Search className="h-4 w-4" />
                Find Tuitions
              </Button>
              <Button type="button" variant="outline" onClick={handleReset} className="h-12 px-5 gap-2 rounded-full font-semibold border-forest-900/15 dark:border-white/15 text-forest-900 dark:text-white hover:bg-forest-900/5 cursor-pointer">
                <RotateCcw className="h-4 w-4" />
                Clear
              </Button>
            </div>
          </form>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1,2,3].map(i => <Skeleton key={i} className="h-64 w-full rounded-3xl" />)}
          </div>
        ) : tuitions.length === 0 ? (
          <div className="rounded-3xl border border-forest-900/10 dark:border-white/10 bg-white dark:bg-[#0F241E] p-12 text-center shadow-card">
            <BookOpen className="mx-auto h-12 w-12 text-forest-900/30 dark:text-white/30 mb-3" />
            <h3 className="font-serif text-xl font-bold text-forest-900 dark:text-[#F5F2EB]">No Tuitions Found</h3>
            <p className="text-sm text-forest-800/70 dark:text-white/70 mt-1.5 max-w-sm mx-auto">
              Nothing matches those filters right now. Try a different subject, level, or mode.
            </p>
            <Button variant="outline" size="sm" onClick={handleReset} className="mt-5 rounded-full border-forest-900/15 dark:border-white/15 text-forest-900 dark:text-white hover:bg-forest-900/5 cursor-pointer">
              Reset Filters
            </Button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {tuitions.map((t) => (
                <TuitionCard key={t._id} {...t} />
              ))}
            </div>
            {pagination.totalPages > 1 && (
              <div className="mt-12 flex items-center justify-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  disabled={page <= 1}
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  className="rounded-full border-forest-900/15 dark:border-white/15 text-forest-900 dark:text-white cursor-pointer"
                >
                  <ChevronLeft className="h-4 w-4 mr-1" />
                  Previous Page
                </Button>
                <span className="text-sm text-forest-800/70 dark:text-white/70 px-2">
                  Page {page} of {pagination.totalPages}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  disabled={page >= pagination.totalPages}
                  onClick={() => setPage((p) => p + 1)}
                  className="rounded-full border-forest-900/15 dark:border-white/15 text-forest-900 dark:text-white cursor-pointer"
                >
                  Next Page
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}