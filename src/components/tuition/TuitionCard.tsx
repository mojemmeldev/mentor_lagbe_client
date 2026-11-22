'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { formatCurrency } from '@/lib/utils';
import { useAuth } from '@/context/AuthContext';
import api from '@/lib/api';
import { toast } from 'sonner';
import { MapPin, Calendar, ArrowRight, Bookmark, Star, BadgeCheck } from 'lucide-react';

export interface TuitionCardProps {
  _id: string;
  title: string;
  subject: string;
  classLevel: string;
  mode: 'Online' | 'Offline';
  location: string;
  monthlyFee: number;
  daysPerWeek: number;
  bannerImage: string;
  tutorName: string;
  tutorId?: string;
  tutorEmail?: string;
  initialBookmarked?: boolean;
  onBookmarkToggle?: (id: string, isBookmarked: boolean) => void;
  averageRating?: number;
  totalReviews?: number;
}

export const TuitionCard: React.FC<TuitionCardProps> = ({
  _id,
  title,
  subject,
  classLevel,
  mode,
  location,
  monthlyFee,
  daysPerWeek,
  bannerImage,
  tutorName,
  tutorId,
  initialBookmarked,
  onBookmarkToggle,
  averageRating,
  totalReviews,
}) => {
  const { user, updateLocalUser } = useAuth();
  const [bookmarked, setBookmarked] = useState<boolean>(() => {
    if (initialBookmarked !== undefined) return initialBookmarked;
    if ((user as any)?.bookmarks && Array.isArray((user as any).bookmarks)) {
      return (user as any).bookmarks.includes(_id);
    }
    return false;
  });
  const [bookmarkLoading, setBookmarkLoading] = useState(false);

  useEffect(() => {
    if (initialBookmarked !== undefined) {
      setBookmarked(initialBookmarked);
    } else if (user?.bookmarks && Array.isArray(user.bookmarks)) {
      setBookmarked(user.bookmarks.includes(_id));
    }
  }, [initialBookmarked, user?.bookmarks, _id]);

  const handleBookmarkToggle = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!user || user.role !== 'student') {
      toast.info('Sign in as a student to bookmark tuitions.');
      return;
    }

    setBookmarkLoading(true);
    try {
      const res = await api.post(`/users/bookmarks/${_id}`);
      const nextState = !bookmarked;
      setBookmarked(nextState);

      const current = user?.bookmarks || [];
      const updatedBookmarks = nextState
        ? Array.from(new Set([...current, _id]))
        : current.filter((id) => id !== _id);
      updateLocalUser({ bookmarks: updatedBookmarks });

      onBookmarkToggle?.(_id, nextState);
      toast.success(res.data?.message || (nextState ? 'Tuition saved to bookmarks!' : 'Bookmark removed!'));
    } catch (err: any) {
      const message = err.response?.data?.message || 'Failed to update bookmark.';
      toast.error(message);
    } finally {
      setBookmarkLoading(false);
    }
  };

  const tutorHref = tutorId
    ? `/tutors/${tutorId}`
    : `/tutors?search=${encodeURIComponent(tutorName || '')}`;

  return (
    <div className="group flex flex-col h-full rounded-3xl border border-forest-900/10 dark:border-white/10 bg-white dark:bg-[#0F241E] hover:border-brand-500/40 hover:-translate-y-1.5 transition-all duration-300 overflow-hidden shadow-card hover:shadow-soft">
      {/* Banner Image with Warm Badges */}
      <div className="relative h-48 w-full overflow-hidden bg-forest-900/10 dark:bg-forest-950 border-b border-forest-900/10 dark:border-white/10">
        <img
          src={
            bannerImage ||
            'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80'
          }
          alt={title}
          className="h-full w-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />

        {/* Mode & Subject Pills */}
        <div className="absolute top-3.5 left-3.5 flex items-center gap-2 z-10">
          <span
            className={`px-3 py-1 rounded-full text-[11px] font-black uppercase tracking-wider shadow-sm text-white ${
              mode === 'Online' ? 'bg-forest-900 dark:bg-emerald-700' : 'bg-brand-500'
            }`}
          >
            {mode}
          </span>
          <span className="px-3 py-1 rounded-full bg-white/95 dark:bg-[#0F241E]/95 backdrop-blur-sm text-forest-900 dark:text-cream text-[11px] font-bold shadow-sm border border-forest-900/10 dark:border-white/10">
            {subject}
          </span>
        </div>

        {/* Floating Bookmark Button */}
        <button
          type="button"
          onClick={handleBookmarkToggle}
          disabled={bookmarkLoading}
          title={bookmarked ? 'Remove from saved' : 'Save tuition'}
          aria-label={bookmarked ? 'Remove bookmark' : 'Bookmark tuition'}
          className={`absolute top-3.5 right-3.5 z-20 p-2.5 rounded-full backdrop-blur-md transition-all duration-200 shadow-md cursor-pointer ${
            bookmarked
              ? 'bg-brand-500 text-white hover:bg-brand-600 scale-105 shadow-[0_12px_30px_-6px_rgba(20,175,81,0.35)]'
              : 'bg-white/90 dark:bg-black/60 hover:bg-white text-forest-900 dark:text-white hover:scale-110 border border-forest-900/10 dark:border-white/20'
          }`}
        >
          <Bookmark
            className={`h-4 w-4 transition-transform ${bookmarked ? 'fill-current scale-105' : ''}`}
          />
        </button>
      </div>

      {/* Card Body */}
      <div className="flex flex-col flex-1 p-5 sm:p-6 justify-between space-y-4">
        <div>
          {/* Class Level, Rating & Days */}
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-[11px] font-black uppercase tracking-wider text-brand-500 dark:text-brand-400">
                {classLevel}
              </span>
              {averageRating && averageRating > 0 ? (
                <span className="inline-flex items-center gap-1 bg-brand-100 dark:bg-brand-500/20 text-brand-600 dark:text-brand-100 px-2.5 py-0.5 rounded-full text-[10px] font-bold border border-brand-500/30">
                  <Star className="h-3 w-3 fill-brand-500 text-brand-500" />
                  <span>{Number(averageRating).toFixed(1)}</span>
                  {totalReviews !== undefined && totalReviews > 0 && (
                    <span className="text-forest-800/60 dark:text-white/60 font-semibold">({totalReviews})</span>
                  )}
                </span>
              ) : null}
            </div>
            <span className="text-[11px] font-bold text-forest-800/70 dark:text-white/70 flex items-center gap-1 bg-cream dark:bg-[#153028] px-2.5 py-1 rounded-full border border-forest-900/10 dark:border-white/10 shrink-0">
              <Calendar className="h-3 w-3 text-brand-500" />
              {daysPerWeek}d / week
            </span>
          </div>

          {/* Title with Editorial Serif */}
          <Link href={`/tuitions/${_id}`} className="block mt-2.5">
            <h3 className="font-serif text-lg font-bold text-forest-900 dark:text-[#F5F2EB] line-clamp-2 leading-snug group-hover:text-brand-500 transition-colors">
              {title}
            </h3>
          </Link>

          {/* Tutor Info: Capsule with Verified Check */}
          <div className="mt-4">
            <Link
              href={tutorHref}
              className="flex items-center gap-3 p-2.5 rounded-2xl bg-cream/70 dark:bg-[#153028] border border-forest-900/5 dark:border-white/5 hover:border-brand-500/30 hover:bg-cream dark:hover:bg-[#1a3d33] transition-all group/tutor"
              title={`View profile of ${tutorName}`}
            >
              <div className="w-8 h-8 rounded-full bg-forest-900 text-white dark:bg-cream dark:text-forest-900 flex items-center justify-center font-bold text-xs shrink-0 shadow-sm">
                {tutorName ? tutorName.charAt(0).toUpperCase() : 'T'}
              </div>
              <div className="flex flex-col min-w-0">
                <div className="flex items-center gap-1">
                  <span className="font-bold text-xs text-forest-900 dark:text-white group-hover/tutor:text-brand-500 transition-colors truncate">
                    {tutorName}
                  </span>
                  <BadgeCheck className="w-3.5 h-3.5 text-sky-600 dark:text-sky-400 shrink-0" />
                </div>
                <span className="text-[10px] text-forest-800/60 dark:text-white/60 truncate">
                  Verified Mentor Profile →
                </span>
              </div>
            </Link>
          </div>

          {/* Location */}
          <div className="mt-3.5 flex items-center gap-1.5 text-xs text-forest-800/70 dark:text-white/70 pt-2 border-t border-forest-900/10 dark:border-white/10">
            <MapPin className="h-3.5 w-3.5 text-brand-500 shrink-0" />
            <span className="truncate">{location}</span>
          </div>
        </div>

        {/* Footer: Price & Details Button */}
        <div className="pt-3.5 border-t border-forest-900/10 dark:border-white/10 flex items-center justify-between">
          <div>
            <span className="text-[10px] text-forest-800/60 dark:text-white/60 uppercase font-bold tracking-wider block">
              Monthly Fee
            </span>
            <span className="font-serif text-xl font-black text-forest-900 dark:text-white tracking-tight">
              {formatCurrency(monthlyFee)}
            </span>
          </div>

          <Link href={`/tuitions/${_id}`}>
            <Button
              size="sm"
              variant="default"
              className="gap-1.5 font-bold text-xs rounded-full hover:bg-brand-500 transition-colors cursor-pointer"
            >
              Details
              <ArrowRight className="h-3.5 w-3.5" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TuitionCard;