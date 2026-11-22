'use client';

import React, { useEffect, useState, use } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/context/AuthContext';
import api from '@/lib/api';
import { formatCurrency } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Skeleton, TuitionDetailsSkeleton } from '@/components/common/Skeleton';
import { Tilt3DCard } from '@/components/ui/Tilt3DCard';
import { toast } from 'sonner';
import {
  MapPin,
  Calendar,
  CheckCircle2,
  AlertCircle,
  UserCheck,
  Send,
  X,
  ArrowLeft,
  DollarSign,
  GraduationCap,
  Sparkles,
  ShieldCheck,
  Star,
  Clock,
  BookOpen,
  Award,
  ExternalLink,
  ChevronRight,
  Flame,
  Bookmark,
} from 'lucide-react';

export default function TuitionDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const tuitionId = resolvedParams.id;
  const router = useRouter();
  const { user, updateLocalUser } = useAuth();

  const [tuition, setTuition] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [applying, setApplying] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [bookmarkLoading, setBookmarkLoading] = useState(false);

  // Application form fields
  const [studentPhone, setStudentPhone] = useState('');
  const [preferredSchedule, setPreferredSchedule] = useState('');
  const [studentNote, setStudentNote] = useState('');

  useEffect(() => {
    if (user?.phone) {
      setStudentPhone(user.phone);
    }

    api.get(`/tuitions/${tuitionId}`)
      .then((res) => {
        if (res.data.success) {
          setTuition(res.data.data);
        }
      })
      .catch((err) => {
        console.error('Failed to fetch tuition details:', err);
        toast.error('We could not load this batch.');
      })
      .finally(() => setLoading(false));

    // Check bookmark status for student
    if (user && user.role === 'student') {
      if (user.bookmarks && Array.isArray(user.bookmarks)) {
        setBookmarked(user.bookmarks.includes(tuitionId));
      } else {
        api.get('/users/bookmarks')
          .then((res) => {
            const bookmarks = res.data?.data || res.data?.tuitions || (Array.isArray(res.data) ? res.data : []);
            const isSaved = bookmarks.some((b: any) =>
              typeof b === 'string' ? b === tuitionId : b._id === tuitionId
            );
            setBookmarked(isSaved);
            if (Array.isArray(bookmarks)) {
              updateLocalUser({ bookmarks: bookmarks.map((b: any) => typeof b === 'string' ? b : b._id) });
            }
          })
          .catch(() => {});
      }
    }
  }, [tuitionId, user]);

  const handleToggleBookmark = async () => {
    if (!user || user.role !== 'student') {
      toast.info('Sign in as a student to save batches.');
      return;
    }

    setBookmarkLoading(true);
    try {
      const res = await api.post(`/users/bookmarks/${tuitionId}`);
      const nextState = !bookmarked;
      setBookmarked(nextState);

      const current = user.bookmarks || [];
      const updatedBookmarks = nextState
        ? Array.from(new Set([...current, tuitionId]))
        : current.filter((id) => id !== tuitionId);
      updateLocalUser({ bookmarks: updatedBookmarks });

      toast.success(res.data?.message || (nextState ? 'Batch saved!' : 'Removed from saved!'));
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Could not update your saved list.');
    } finally {
      setBookmarkLoading(false);
    }
  };

  const handleApplySubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) {
      toast.error('Sign in as a student to apply.');
      router.push('/sign-in');
      return;
    }

    if (user.role !== 'student') {
      toast.error('Only registered students can apply for tuitions.');
      return;
    }

    if (!studentPhone.trim() || !preferredSchedule.trim()) {
      toast.error('Add a phone number and your preferred schedule.');
      return;
    }

    setApplying(true);
    try {
      const res = await api.post('/applications/apply', {
        tuitionId,
        studentPhone: studentPhone.trim(),
        preferredSchedule: preferredSchedule.trim(),
        studentNote: studentNote.trim(),
      });

      if (res.data.success) {
        toast.success(res.data.message || 'Application sent successfully!');
        setModalOpen(false);
        router.push('/dashboard/student/my-applications');
      }
    } catch (err: any) {
      const message = err.response?.data?.message || 'We could not send your application.';
      toast.error(message);
    } finally {
      setApplying(false);
    }
  };

  if (loading) {
    return <TuitionDetailsSkeleton />;
  }

  if (!tuition) {
    return (
      <div className="container mx-auto max-w-3xl px-4 py-24 text-center space-y-5">
        <AlertCircle className="mx-auto h-16 w-16 text-brand-500 animate-bounce" />
        <h2 className="font-serif text-3xl font-bold text-forest-900 dark:text-[#F5F2EB]">This Batch Is Unavailable</h2>
        <p className="text-sm text-forest-800/75 dark:text-[#F5F2EB]/75 max-w-md mx-auto">
          This listing may have been removed, filled, or made private.
        </p>
        <div className="pt-2">
          <Link href="/tuitions">
            <Button variant="default" className="gap-2 rounded-full font-bold">
              <ArrowLeft className="h-4 w-4" />
              Return to All Batches
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const isStudent = user?.role === 'student';
  const isTutorOrAdmin = user && (user.role === 'tutor' || user.role === 'admin');

  // Resolved Tutor Profile Link
  const tutorId = tuition.tutor?._id || tuition.tutorId;
  const tutorProfileHref = tutorId
    ? `/tutors/${tutorId}`
    : `/tutors?search=${encodeURIComponent(tuition.tutorName || '')}`;

  return (
    <div className="min-h-screen bg-cream/40 dark:bg-[#081612] py-10 lg:py-14 transition-colors duration-300">
      <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 space-y-8">
        {/* BREADCRUMB & TOP CONTROLS */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-wrap items-center justify-between gap-4 text-xs font-semibold text-forest-800/70 dark:text-white/70"
        >
          <div className="flex items-center gap-2">
            <Link
              href="/tuitions"
              className="inline-flex items-center gap-1.5 hover:text-forest-900 dark:hover:text-white transition-colors group"
            >
              <ArrowLeft className="h-3.5 w-3.5 group-hover:-translate-x-1 transition-transform" />
              <span>All Batches</span>
            </Link>
            <ChevronRight className="h-3.5 w-3.5 text-forest-800/40 dark:text-white/40" />
            <span className="text-forest-900 dark:text-white font-bold">{tuition.subject}</span>
            <ChevronRight className="h-3.5 w-3.5 text-forest-800/40 dark:text-white/40" />
            {/* Tutor Name in Breadcrumb */}
            <Link
              href={tutorProfileHref}
              className="text-brand-500 hover:underline flex items-center gap-1 font-bold"
              title={`View ${tuition.tutorName}'s Profile`}
            >
              {tuition.tutorName}
            </Link>
          </div>

          <div className="flex items-center gap-2">
            <Badge variant="outline" className="bg-white/80 dark:bg-[#0F241E] text-[11px] font-bold border-forest-900/10 dark:border-white/10">
              ID: {tuitionId.slice(-6).toUpperCase()}
            </Badge>
            <Badge variant="success" className="text-[11px]">
              <CheckCircle2 className="h-3 w-3" />
              ID-Checked Listing
            </Badge>
          </div>
        </motion.div>

        {/* 3D HERO BANNER */}
        <Tilt3DCard
          tiltMaxAngle={4}
          scaleOnHover={1.01}
          glareOpacity={0.1}
          className="rounded-3xl"
        >
          <div className="relative h-72 sm:h-96 w-full overflow-hidden rounded-3xl border border-forest-900/10 dark:border-white/10 bg-forest-900/10 shadow-card">
            <img
              src={
                tuition.bannerImage ||
                'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1400&q=80'
              }
              alt={tuition.title}
              className="h-full w-full object-cover object-center"
            />
            {/* Ambient Dark Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent pointer-events-none" />

            {/* Top Badges */}
            <div className="absolute top-5 left-5 flex flex-wrap gap-2.5 [transform:translateZ(30px)]">
              <span
                className={`text-xs font-black uppercase tracking-wider px-3.5 py-1.5 rounded-full shadow-md text-white backdrop-blur-md ${
                  tuition.mode === 'Online' ? 'bg-forest-900 dark:bg-emerald-700' : 'bg-brand-500'
                }`}
              >
                {tuition.mode} Class
              </span>
              <span className="bg-black/60 text-white border border-white/20 text-xs font-bold backdrop-blur-md px-3.5 py-1.5 rounded-full shadow-md">
                {tuition.subject}
              </span>
              <span className="bg-brand-500/90 text-white text-xs font-extrabold shadow-md backdrop-blur-md px-3.5 py-1.5 rounded-full inline-flex items-center">
                <Sparkles className="h-3.5 w-3.5 mr-1" />
                Popular Batch
              </span>
            </div>

            {/* Top Right Floating Bookmark Button */}
            <button
              type="button"
              onClick={handleToggleBookmark}
              disabled={bookmarkLoading}
              className={`absolute top-5 right-5 z-20 flex items-center gap-2 px-4 py-2 rounded-full backdrop-blur-md transition-all duration-200 shadow-lg border [transform:translateZ(30px)] cursor-pointer ${
                bookmarked
                  ? 'bg-brand-500 text-white border-brand-500 scale-105 shadow-[0_12px_30px_-6px_rgba(20,175,81,0.35)]'
                  : 'bg-white/90 dark:bg-black/60 hover:bg-white text-forest-900 dark:text-white border-white/20 hover:scale-105'
              }`}
              title={bookmarked ? 'Remove bookmark' : 'Save this batch'}
            >
              <Bookmark className={`h-4 w-4 ${bookmarked ? 'fill-current' : ''}`} />
              <span className="text-xs font-bold">{bookmarked ? 'Saved' : 'Save Batch'}</span>
            </button>

            {/* Bottom Floating Title Strip */}
            <div className="absolute bottom-6 left-6 right-6 text-white space-y-2 [transform:translateZ(25px)]">
              <span className="text-xs font-extrabold uppercase tracking-widest text-terracotta-100 bg-brand-500/90 px-3 py-1 rounded-full">
                {tuition.classLevel}
              </span>
              <h1 className="font-serif text-2xl sm:text-4xl font-bold tracking-tight drop-shadow-md max-w-3xl leading-snug">
                {tuition.title}
              </h1>
            </div>
          </div>
        </Tilt3DCard>

        {/* MAIN TWO-COLUMN CONTENT */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* LEFT COLUMN: SYLLABUS, HIGHLIGHTS & TUTOR SPOTLIGHT (8 COLS) */}
          <div className="lg:col-span-8 space-y-8">
            {/* Quick Metrics Bar */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="grid grid-cols-2 sm:grid-cols-4 gap-3.5"
            >
              <div className="rounded-2xl border border-forest-900/10 dark:border-white/10 bg-white dark:bg-[#0F241E] p-4 text-center space-y-1 shadow-card">
                <MapPin className="h-5 w-5 mx-auto text-brand-500" />
                <span className="text-[10px] text-forest-800/60 dark:text-white/60 uppercase font-bold block">
                  Location
                </span>
                <p className="text-xs sm:text-sm font-bold text-forest-900 dark:text-white truncate">
                  {tuition.location}
                </p>
              </div>

              <div className="rounded-2xl border border-forest-900/10 dark:border-white/10 bg-white dark:bg-[#0F241E] p-4 text-center space-y-1 shadow-card">
                <Calendar className="h-5 w-5 mx-auto text-forest-900 dark:text-brand-100" />
                <span className="text-[10px] text-forest-800/60 dark:text-white/60 uppercase font-bold block">
                  Frequency
                </span>
                <p className="text-xs sm:text-sm font-bold text-forest-900 dark:text-white">
                  {tuition.daysPerWeek} Days / Week
                </p>
              </div>

              <div className="rounded-2xl border border-forest-900/10 dark:border-white/10 bg-white dark:bg-[#0F241E] p-4 text-center space-y-1 shadow-card">
                <DollarSign className="h-5 w-5 mx-auto text-brand-600 dark:text-brand-100" />
                <span className="text-[10px] text-forest-800/60 dark:text-white/60 uppercase font-bold block">
                  Tuition Fee
                </span>
                <p className="font-serif text-xs sm:text-sm font-bold text-forest-900 dark:text-white">
                  {formatCurrency(tuition.monthlyFee)}
                </p>
              </div>

              <div className="rounded-2xl border border-forest-900/10 dark:border-white/10 bg-white dark:bg-[#0F241E] p-4 text-center space-y-1 shadow-card">
                <GraduationCap className="h-5 w-5 mx-auto text-indigo-500" />
                <span className="text-[10px] text-forest-800/60 dark:text-white/60 uppercase font-bold block">
                  Grade / Target
                </span>
                <p className="text-xs sm:text-sm font-bold text-forest-900 dark:text-white truncate">
                  {tuition.classLevel}
                </p>
              </div>
            </motion.div>

            {/* Course Overview & Syllabus */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="rounded-3xl border border-forest-900/10 dark:border-white/10 bg-white dark:bg-[#0F241E] p-6 sm:p-8 shadow-card space-y-5"
            >
              <div className="flex items-center gap-2.5 border-b border-forest-900/10 dark:border-white/10 pb-4">
                <BookOpen className="h-5 w-5 text-brand-500" />
                <h2 className="font-serif text-xl sm:text-2xl font-bold text-forest-900 dark:text-[#F5F2EB]">
                  About This Batch
                </h2>
              </div>

              <p className="text-sm sm:text-base text-forest-800/75 dark:text-[#F5F2EB]/75 leading-relaxed whitespace-pre-line">
                {tuition.description}
              </p>

              {/* What You'll Learn Highlights */}
              <div className="mt-6 pt-6 border-t border-forest-900/10 dark:border-white/10 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-start gap-3 rounded-2xl bg-cream dark:bg-[#153028] p-4 border border-forest-900/5 dark:border-white/5">
                  <CheckCircle2 className="h-5 w-5 text-brand-600 dark:text-brand-100 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-bold text-forest-900 dark:text-white">Clear Concept Lessons</h4>
                    <p className="text-[11px] text-forest-800/65 dark:text-white/65 mt-0.5 leading-relaxed">
                      Step-by-step teaching built for board exams and admission tests.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 rounded-2xl bg-cream dark:bg-[#153028] p-4 border border-forest-900/5 dark:border-white/5">
                  <CheckCircle2 className="h-5 w-5 text-brand-600 dark:text-brand-100 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-bold text-forest-900 dark:text-white">Weekly Practice Tests</h4>
                    <p className="text-[11px] text-forest-800/65 dark:text-white/65 mt-0.5 leading-relaxed">
                      Regular check-ins with individual feedback and progress notes.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 rounded-2xl bg-cream dark:bg-[#153028] p-4 border border-forest-900/5 dark:border-white/5">
                  <CheckCircle2 className="h-5 w-5 text-brand-600 dark:text-brand-100 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-bold text-forest-900 dark:text-white">Question Support</h4>
                    <p className="text-[11px] text-forest-800/65 dark:text-white/65 mt-0.5 leading-relaxed">
                      Ask questions after class and work through tricky problems together.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 rounded-2xl bg-cream dark:bg-[#153028] p-4 border border-forest-900/5 dark:border-white/5">
                  <CheckCircle2 className="h-5 w-5 text-brand-600 dark:text-brand-100 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-bold text-forest-900 dark:text-white">Chapter Notes</h4>
                    <p className="text-[11px] text-forest-800/65 dark:text-white/65 mt-0.5 leading-relaxed">
                      Concise summaries and formula sheets for every topic.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* 3D TUTOR SPOTLIGHT CARD */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Tilt3DCard
                tiltMaxAngle={4}
                scaleOnHover={1.01}
                glareOpacity={0.08}
                className="rounded-3xl"
              >
                <div className="rounded-3xl border border-forest-900/10 dark:border-white/10 bg-white dark:bg-[#0F241E] p-6 sm:p-8 shadow-card relative overflow-hidden group">
                  <div className="flex items-center justify-between border-b border-forest-900/10 dark:border-white/10 pb-4 mb-5">
                    <div className="flex items-center gap-2">
                      <Award className="h-5 w-5 text-brand-500" />
                      <h3 className="font-serif text-lg sm:text-xl font-bold text-forest-900 dark:text-white">
                        Meet Your Mentor
                      </h3>
                    </div>

                    <Link
                      href={tutorProfileHref}
                      className="text-xs font-bold text-brand-500 hover:underline inline-flex items-center gap-1 group/btn"
                    >
                      <span>See Full Profile</span>
                      <ExternalLink className="h-3.5 w-3.5 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                    </Link>
                  </div>

                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
                    {/* Avatar with Verified Ring */}
                    <Link
                      href={tutorProfileHref}
                      className="relative block shrink-0 group/avatar [transform:translateZ(20px)]"
                    >
                      <img
                        src={
                          tuition.tutor?.image ||
                          'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80'
                        }
                        alt={tuition.tutorName}
                        className="h-20 w-20 rounded-2xl object-cover border-2 border-forest-900/10 dark:border-white/10 group-hover/avatar:border-brand-500 group-hover/avatar:scale-105 transition-all shadow-md"
                      />
                      <div className="absolute -bottom-1 -right-1 h-6 w-6 rounded-full bg-forest-900 dark:bg-brand-600 text-white flex items-center justify-center shadow-md">
                        <CheckCircle2 className="h-3.5 w-3.5" />
                      </div>
                    </Link>

                    {/* Tutor Details */}
                    <div className="space-y-2 flex-1 [transform:translateZ(15px)]">
                      <div className="flex flex-wrap items-center gap-2">
                        {/* Clickable Tutor Name Linking to Profile */}
                        <Link
                          href={tutorProfileHref}
                          className="font-serif text-lg sm:text-xl font-bold text-forest-900 dark:text-white hover:text-brand-500 transition-colors hover:underline underline-offset-4"
                        >
                          {tuition.tutorName }
                        </Link>
                        {tuition.tutor?.plan === 'pro' && (
                          <Badge variant="pro" className="text-[10px]">
                            <Sparkles className="h-3 w-3 mr-1" />
                            Verified Pro Mentor
                          </Badge>
                        )}
                      </div>

                      <p className="text-xs text-forest-800/70 dark:text-white/70 flex items-center gap-1.5 flex-wrap">
                        <ShieldCheck className="h-3.5 w-3.5 text-brand-600 dark:text-brand-100" />
                        <span>{tuition.tutorEmail}</span>
                        <span>•</span>
                        <span className="flex items-center text-brand-500 font-bold">
                          <Star className="h-3.5 w-3.5 fill-brand-500 mr-0.5" />
                          4.9 / 5.0 Rating
                        </span>
                      </p>

                      <p className="text-xs sm:text-sm text-forest-800/70 dark:text-white/70 leading-relaxed pt-1">
                        {tuition.tutor?.bio ||
                          'Dedicated teacher who makes hard ideas clear, builds confidence, and helps learners reach their goals.'}
                      </p>

                      <div className="pt-2 flex flex-wrap items-center gap-2">
                        <Link href={tutorProfileHref}>
                          <Button size="sm" variant="outline" className="text-xs font-bold gap-1.5 h-9 rounded-full border-forest-900/15 dark:border-white/15 text-forest-900 dark:text-white hover:bg-forest-900/5 cursor-pointer">
                            <UserCheck className="h-3.5 w-3.5 text-brand-500" />
                            See Their Batches &amp; Credentials
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </Tilt3DCard>
            </motion.div>

            {/* STUDENT REVIEWS & ACADEMIC FEEDBACK */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
              className="rounded-3xl border border-forest-900/10 dark:border-white/10 bg-white dark:bg-[#0F241E] p-6 sm:p-8 shadow-card space-y-6"
            >
              {/* Section Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-forest-900/10 dark:border-white/10 pb-5">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-brand-100 dark:bg-brand-500/20 flex items-center justify-center text-brand-600 dark:text-brand-100 shadow-sm">
                    <Star className="h-5 w-5 fill-brand-500" />
                  </div>
                  <div>
                    <h3 className="font-serif text-lg sm:text-xl font-bold text-forest-900 dark:text-[#F5F2EB]">
                      Student Reviews & Academic Feedback
                    </h3>
                    <p className="text-xs text-forest-800/60 dark:text-white/60 mt-0.5">
                      Ratings and comments from learners who joined this batch.
                    </p>
                  </div>
                </div>

                {tuition.averageRating || (tuition.reviews && tuition.reviews.length > 0) ? (
                  <div className="flex items-center gap-2.5 bg-cream dark:bg-[#153028] border border-forest-900/10 dark:border-white/10 px-4 py-2 rounded-2xl">
                    <div className="flex items-center text-brand-500">
                      <Star className="h-4 w-4 fill-brand-500 mr-1" />
                      <span className="font-serif text-lg font-bold text-forest-900 dark:text-white">
                        {tuition.averageRating
                          ? Number(tuition.averageRating).toFixed(1)
                          : (
                              tuition.reviews.reduce(
                                (acc: number, r: any) => acc + (r.rating || 5),
                                0
                              ) / tuition.reviews.length
                            ).toFixed(1)}
                      </span>
                      <span className="text-xs text-forest-800/60 dark:text-white/60 font-semibold ml-0.5">/ 5.0</span>
                    </div>
                    <span className="text-forest-800/40 dark:text-white/40">•</span>
                    <span className="text-xs font-bold text-forest-800/70 dark:text-white/70">
                      {tuition.totalReviews || tuition.reviews?.length || 0}{' '}
                      {(tuition.totalReviews || tuition.reviews?.length) === 1 ? 'Review' : 'Reviews'}
                    </span>
                  </div>
                ) : (
                  <Badge variant="outline" className="text-xs text-forest-800/60 dark:text-white/60 font-bold rounded-full">
                    Not Rated Yet
                  </Badge>
                )}
              </div>

              {/* Reviews List or Empty State */}
              {tuition.reviews && tuition.reviews.length > 0 ? (
                <div className="space-y-4">
                  {tuition.reviews.map((rev: any, idx: number) => {
                    const reviewerName =
                      rev.studentName || rev.studentEmail?.split('@')[0] || 'Learner';
                    const initials =
                      reviewerName
                        .split(' ')
                        .map((n: string) => n[0])
                        .slice(0, 2)
                        .join('')
                        .toUpperCase() || 'S';
                    const reviewDate = rev.createdAt
                      ? new Date(rev.createdAt).toLocaleDateString(undefined, {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                        })
                      : 'Just now';

                    return (
                      <div
                        key={rev._id || idx}
                        className="rounded-2xl border border-forest-900/10 dark:border-white/10 bg-cream/30 dark:bg-[#153028]/60 p-5 space-y-3 hover:border-brand-500/30 transition-colors"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex items-center gap-3">
                            {rev.studentImage ? (
                              <img
                                src={rev.studentImage}
                                alt={reviewerName}
                                className="h-10 w-10 rounded-full object-cover border border-forest-900/10 dark:border-white/10"
                              />
                            ) : (
                              <div className="h-10 w-10 rounded-full bg-forest-900 text-white dark:bg-cream dark:text-forest-900 flex items-center justify-center font-bold text-xs shrink-0">
                                {initials}
                              </div>
                            )}
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="text-sm font-bold text-forest-900 dark:text-white">
                                  {reviewerName}
                                </span>
                                <Badge variant="success" className="text-[10px] px-2 py-0.5">
                                  <ShieldCheck className="h-3 w-3 mr-0.5" />
                                  Verified Learner
                                </Badge>
                              </div>
                              <span className="text-[11px] text-forest-800/60 dark:text-white/60">{reviewDate}</span>
                            </div>
                          </div>

                          {/* Stars */}
                          <div className="flex items-center gap-0.5 text-brand-500">
                            {[1, 2, 3, 4, 5].map((s) => (
                              <Star
                                key={s}
                                className={`h-3.5 w-3.5 ${
                                  (rev.rating || 5) >= s
                                    ? 'fill-brand-500 text-brand-500'
                                    : 'text-forest-900/20 dark:text-white/20'
                                }`}
                              />
                            ))}
                          </div>
                        </div>

                        <p className="text-xs sm:text-sm text-forest-800/80 dark:text-white/80 leading-relaxed pl-13">
                          &ldquo;{rev.comment}&rdquo;
                        </p>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="rounded-2xl border border-dashed border-forest-900/15 dark:border-white/15 bg-cream/30 dark:bg-[#153028]/40 p-8 text-center space-y-2">
                  <Star className="h-8 w-8 text-forest-900/30 dark:text-white/30 mx-auto" />
                  <h4 className="font-serif text-sm font-bold text-forest-900 dark:text-white">No Reviews Yet</h4>
                  <p className="text-xs text-forest-800/65 dark:text-white/65 max-w-md mx-auto">
                    No Reviews Yet. Be the first enrolled student to share feedback once your tuition begins!
                  </p>
                </div>
              )}
            </motion.div>

            {/* Safety & Trust Assurance Card */}
            <div className="rounded-3xl border border-forest-900/10 dark:border-white/10 bg-cream/60 dark:bg-[#153028] p-6 space-y-3">
              <h4 className="text-xs font-black uppercase tracking-wider text-forest-900 dark:text-white flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-brand-600 dark:text-brand-100" />
                MentorLagbe Learner Protection
              </h4>
              <p className="text-xs text-forest-800/75 dark:text-[#F5F2EB]/75 leading-relaxed">
                MentorLagbe charges learners no upfront agency or broker fees. Apply directly to your chosen tutor, agree on a schedule, and settle payment once both sides are happy.
              </p>
            </div>
          </div>

          {/* RIGHT COLUMN: STICKY BOOKING / APPLICATION CARD (4 COLS) */}
          <div className="lg:col-span-4 space-y-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 }}
              className="sticky top-24"
            >
              <Tilt3DCard
                tiltMaxAngle={4}
                scaleOnHover={1.01}
                glareOpacity={0.08}
                className="rounded-3xl"
              >
                <Card className="p-6 sm:p-7 border border-forest-900/15 dark:border-white/15 shadow-card bg-white dark:bg-[#0F241E] space-y-6 rounded-3xl relative overflow-hidden">
                  {/* Popular Batch Tag */}
                  <div className="flex items-center justify-between [transform:translateZ(15px)]">
                    <span className="text-[11px] text-forest-800/60 dark:text-white/60 font-bold uppercase tracking-wider">
                      Monthly Fee
                    </span>
                    <Badge variant="default" className="text-[10px] font-bold uppercase tracking-wider">
                      <Flame className="h-3 w-3 mr-1" />
                      Seats Available
                    </Badge>
                  </div>

                  {/* Price Block */}
                  <div className="space-y-1 [transform:translateZ(20px)]">
                    <div className="flex items-baseline gap-1">
                      <p className="font-serif text-3xl sm:text-4xl font-black text-forest-900 dark:text-white tracking-tight">
                        {formatCurrency(tuition.monthlyFee)}
                      </p>
                      <span className="text-xs font-semibold text-forest-800/60 dark:text-white/60">/ month</span>
                    </div>
                    <p className="text-[11px] text-forest-800/65 dark:text-white/65">
                      Works out to about{' '}
                      <strong className="text-forest-900 dark:text-white">
                        {formatCurrency(Math.round(tuition.monthlyFee / ((tuition.daysPerWeek || 3) * 4)))}
                      </strong>{' '}
                      per class.
                    </p>
                  </div>

                  {/* Specifications Summary */}
                  <div className="space-y-3 text-xs text-forest-800/70 dark:text-white/70 border-y border-forest-900/10 dark:border-white/10 py-4 [transform:translateZ(12px)]">
                    <div className="flex justify-between items-center">
                      <span>Format:</span>
                      <strong className="text-forest-900 dark:text-white bg-cream dark:bg-[#153028] px-2.5 py-0.5 rounded-lg border border-forest-900/10 dark:border-white/10">
                        {tuition.mode}
                      </strong>
                    </div>

                    <div className="flex justify-between items-center">
                      <span>Schedule:</span>
                      <strong className="text-forest-900 dark:text-white">
                        {tuition.daysPerWeek} Days / Week
                      </strong>
                    </div>

                    <div className="flex justify-between items-center">
                      <span>Level:</span>
                      <strong className="text-forest-900 dark:text-white">{tuition.classLevel}</strong>
                    </div>

                    <div className="flex justify-between items-center">
                      <span>Subject:</span>
                      <strong className="text-forest-900 dark:text-white">{tuition.subject}</strong>
                    </div>

                    <div className="flex justify-between items-center">
                      <span>Location:</span>
                      <strong className="text-forest-900 dark:text-white truncate max-w-[150px]">
                        {tuition.location}
                      </strong>
                    </div>
                  </div>

                  {/* Application Actions with Role Guidance */}
                  <div className="space-y-3 [transform:translateZ(25px)]">
                    {!user ? (
                      <div className="space-y-2.5">
                        <Link href="/sign-in" className="w-full block">
                          <Button className="w-full font-bold h-12 rounded-full bg-forest-900 hover:bg-forest-800 text-white shadow-soft cursor-pointer">
                            Sign In to Apply
                          </Button>
                        </Link>
                        <Button
                          type="button"
                          variant="outline"
                          onClick={handleToggleBookmark}
                          disabled={bookmarkLoading}
                          className="w-full font-bold h-11 text-xs gap-2 rounded-full border border-forest-900/15 dark:border-white/15 text-forest-900 dark:text-white hover:bg-forest-900/5 cursor-pointer"
                        >
                          <Bookmark className="h-4 w-4" />
                          Save This Batch
                        </Button>
                        <p className="text-[11px] text-center text-forest-800/60 dark:text-white/60">
                          New here?{' '}
                          <Link href="/sign-up" className="text-brand-500 font-bold hover:underline">
                            Register as Student
                          </Link>
                        </p>
                      </div>
                    ) : isStudent ? (
                      <div className="space-y-2.5">
                        <Button
                          onClick={() => setModalOpen(true)}
                          variant="default"
                          className="w-full font-black h-12 rounded-full text-sm gap-2 shadow-[0_12px_30px_-6px_rgba(20,175,81,0.35)] cursor-pointer"
                        >
                          <Send className="h-4 w-4" />
                          Apply Now
                        </Button>
                        <Button
                          type="button"
                          variant="outline"
                          onClick={handleToggleBookmark}
                          disabled={bookmarkLoading}
                          className={`w-full font-bold h-11 text-xs gap-2 rounded-full border transition-all cursor-pointer ${
                            bookmarked
                              ? 'border-brand-500 text-brand-500 bg-brand-50 dark:bg-brand-500/20'
                              : 'border-forest-900/15 dark:border-white/15 text-forest-900 dark:text-white hover:bg-forest-900/5'
                          }`}
                        >
                          <Bookmark className={`h-4 w-4 ${bookmarked ? 'fill-current' : ''}`} />
                          {bookmarked ? 'Saved in Your Bookmarks' : 'Save This Batch'}
                        </Button>
                        <p className="text-[11px] text-center text-forest-800/70 dark:text-white/70 mt-2.5 flex items-center justify-center gap-1">
                          <CheckCircle2 className="h-3.5 w-3.5 text-brand-600 dark:text-brand-100" />
                          Free to apply • no agency cut
                        </p>
                      </div>
                    ) : isTutorOrAdmin ? (
                      <div className="rounded-2xl bg-cream dark:bg-[#153028] p-4 text-center border border-forest-900/10 dark:border-white/10 space-y-2">
                        <p className="text-xs font-bold text-forest-900 dark:text-white">
                          Student Role Required
                        </p>
                        <p className="text-[11px] text-forest-800/70 dark:text-white/70 leading-relaxed">
                          You&apos;re logged in with a{' '}
                          <span className="capitalize font-bold text-forest-900 dark:text-white">{user.role}</span> account. Student applications are restricted to student accounts.
                        </p>
                        <Button
                          disabled
                          className="w-full opacity-60 cursor-not-allowed text-xs font-bold rounded-full h-10 bg-forest-900/20 text-forest-900 dark:text-white"
                        >
                          Not Available for Your Role
                        </Button>
                      </div>
                    ) : null}
                  </div>

                  {/* Direct Tutor Profile Link at bottom of card */}
                  <div className="pt-2 text-center border-t border-forest-900/10 dark:border-white/10 [transform:translateZ(10px)]">
                    <Link
                      href={tutorProfileHref}
                      className="text-xs font-bold text-forest-800/70 dark:text-white/70 hover:text-brand-500 transition-colors inline-flex items-center gap-1"
                    >
                      <span>Have questions? See {tuition.tutorName}&apos;s profile</span>
                      <ChevronRight className="h-3 w-3" />
                    </Link>
                  </div>
                </Card>
              </Tilt3DCard>
            </motion.div>
          </div>
        </div>
      </div>

      {/* STUDENT APPLICATION MODAL WITH FRAMER-MOTION */}
      <AnimatePresence>
        {modalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setModalOpen(false)}
              className="absolute inset-0 bg-forest-950/70 backdrop-blur-md"
            />

            {/* Modal Dialog */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 350 }}
              className="relative w-full max-w-lg rounded-3xl border border-forest-900/10 dark:border-white/10 bg-white dark:bg-[#0F241E] p-6 sm:p-8 shadow-card space-y-5 z-10 overflow-hidden"
            >
              {/* Close Button */}
              <button
                onClick={() => setModalOpen(false)}
                className="absolute top-5 right-5 h-8 w-8 rounded-full border border-forest-900/10 dark:border-white/10 bg-cream/60 dark:bg-[#153028] flex items-center justify-center text-forest-800/60 dark:text-white/60 hover:text-forest-900 dark:hover:text-white transition-colors cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>

              <div>
                <Badge variant="default" className="mb-2 text-[11px] font-bold rounded-full">
                  Direct Application
                </Badge>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-forest-900 dark:text-[#F5F2EB]">
                  Apply to the {tuition.subject} Batch
                </h3>
                <p className="text-xs text-forest-800/70 dark:text-white/70 mt-1">
                  Mentor:{' '}
                  <Link
                    href={tutorProfileHref}
                    className="text-brand-500 font-bold hover:underline"
                    target="_blank"
                  >
                    {tuition.tutorName}
                  </Link>{' '}
                  • Fee: <strong className="text-forest-900 dark:text-white font-serif">{formatCurrency(tuition.monthlyFee)}/mo</strong>
                </p>
              </div>

              <form onSubmit={handleApplySubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-forest-900 dark:text-white mb-1.5">
                    Phone Number *
                  </label>
                  <Input
                    type="text"
                    placeholder="e.g. +880 1700 000000"
                    value={studentPhone}
                    onChange={(e) => setStudentPhone(e.target.value)}
                    required
                    className="h-11 rounded-2xl text-xs sm:text-sm bg-cream/40 dark:bg-[#153028] border-forest-900/15 dark:border-white/15 focus:ring-brand-500/40"
                  />
                  <p className="text-[10px] text-forest-800/60 dark:text-white/60 mt-1">
                    The mentor will call this number after reviewing your request.
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-bold text-forest-900 dark:text-white mb-1.5">
                    Preferred Class Times *
                  </label>
                  <Input
                    type="text"
                    placeholder="e.g. Mon / Wed / Fri, 6–7:30 PM"
                    value={preferredSchedule}
                    onChange={(e) => setPreferredSchedule(e.target.value)}
                    required
                    className="h-11 rounded-2xl text-xs sm:text-sm bg-cream/40 dark:bg-[#153028] border-forest-900/15 dark:border-white/15 focus:ring-brand-500/40"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-forest-900 dark:text-white mb-1.5">
                    Goals or Topics (Optional)
                  </label>
                  <Textarea
                    placeholder="Tell us your grade, syllabus focus, and tricky topics..."
                    value={studentNote}
                    onChange={(e) => setStudentNote(e.target.value)}
                    rows={3}
                    className="rounded-2xl text-xs sm:text-sm bg-cream/40 dark:bg-[#153028] border-forest-900/15 dark:border-white/15 focus:ring-brand-500/40"
                  />
                </div>

                <div className="pt-2 flex items-center justify-end gap-3">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setModalOpen(false)}
                    disabled={applying}
                    className="text-xs font-bold h-11 rounded-full border-forest-900/15 dark:border-white/15 text-forest-900 dark:text-white hover:bg-forest-900/5 cursor-pointer"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    variant="default"
                    disabled={applying}
                    className="font-black gap-2 text-xs h-11 px-6 rounded-full shadow-[0_12px_30px_-6px_rgba(20,175,81,0.35)] cursor-pointer"
                  >
                    {applying ? 'Sending...' : 'Send My Application'}
                    <Send className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}