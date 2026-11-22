'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import api from '@/lib/api';
import { formatCurrency, formatDate } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { DashboardTableSkeleton } from '@/components/common/Skeleton';
import { toast } from 'sonner';
import { Trash2, AlertCircle, ExternalLink, Calendar, Search, Star, X, Send } from 'lucide-react';

export default function StudentApplicationsPage() {
  const [applications, setApplications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [cancellingId, setCancellingId] = useState<string | null>(null);

  // Review Modal State
  const [selectedApp, setSelectedApp] = useState<any>(null);
  const [reviewModalOpen, setReviewModalOpen] = useState(false);
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState('');
  const [submittingReview, setSubmittingReview] = useState(false);

  const fetchApplications = () => {
    setLoading(true);
    api.get('/applications/my-applications')
      .then((res) => {
        if (res.data.success) {
          setApplications(res.data.data || []);
        }
      })
      .catch((err) => {
        console.error('Failed to load applications:', err);
        toast.error('Failed to load your applications.');
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  const handleCancel = async (id: string, title: string) => {
    if (!confirm(`Are you sure you want to cancel your application for "${title}"?`)) {
      return;
    }

    setCancellingId(id);
    try {
      const res = await api.delete(`/applications/${id}`);
      if (res.data.success) {
        toast.success(res.data.message || 'Application cancelled successfully.');
        setApplications((prev) => prev.filter((item) => item._id !== id));
      }
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Failed to cancel application.');
    } finally {
      setCancellingId(null);
    }
  };

  const openReviewModal = (app: any) => {
    setSelectedApp(app);
    setRating(5);
    setHoverRating(0);
    setComment('');
    setReviewModalOpen(true);
  };

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedApp) return;

    if (!rating || rating < 1 || rating > 5) {
      toast.error('Please choose a rating between 1 and 5 stars.');
      return;
    }

    if (!comment.trim()) {
      toast.error('Please share your experience in the review comment.');
      return;
    }

    setSubmittingReview(true);
    const targetTuitionId =
      typeof selectedApp.tuitionId === 'object' && selectedApp.tuitionId !== null
        ? selectedApp.tuitionId._id
        : selectedApp.tuitionId;

    try {
      const res = await api.post(`/tuitions/${targetTuitionId}/reviews`, {
        rating,
        comment: comment.trim(),
      });

      if (res.data?.success) {
        toast.success(res.data.message || 'Thank you! Your mentorship review has been submitted.');
        setReviewModalOpen(false);
        fetchApplications();
      }
    } catch (err: any) {
      const message = err.response?.data?.message || 'Failed to submit review.';
      toast.error(message);
    } finally {
      setSubmittingReview(false);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'accepted':
        return <Badge variant="success">Accepted</Badge>;
      case 'rejected':
        return <Badge variant="destructive">Rejected</Badge>;
      default:
        return <Badge variant="warning">Pending Review</Badge>;
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="relative overflow-hidden rounded-[2rem] border border-brand-500/15 bg-white dark:bg-[#0F241E] p-6 sm:p-7 shadow-card">
        <div className="absolute -top-20 -right-16 h-44 w-44 rounded-full bg-brand-500/10 blur-3xl pointer-events-none" />
        <div className="relative flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-widest text-brand-600 dark:text-brand-100 mb-1">Student Dashboard</p>
            <h1 className="text-2xl sm:text-3xl font-serif font-black text-foreground tracking-tight">
              My Applications
            </h1>
            <p className="text-xs sm:text-sm text-muted-foreground mt-1">
              Track and manage your tuition booking applications.
            </p>
          </div>
          <Link href="/tuitions" className="shrink-0">
            <Button size="sm" variant="default" className="font-bold gap-1.5 rounded-full bg-brand-500 hover:bg-brand-600 text-white shadow-[0_12px_30px_-6px_rgba(20,175,81,0.35)]">
              <Search className="h-4 w-4" />
              Apply for More
            </Button>
          </Link>
        </div>
      </div>

      {loading ? (
        <DashboardTableSkeleton
          columns={6}
          rows={5}
          headers={[
            'Tuition Title & Subject',
            'Tutor Details',
            'Monthly Fee',
            'Applied Date',
            'Status',
            'Actions',
          ]}
        />
      ) : (
        <Card className="border border-forest-900/10 dark:border-white/10 shadow-card bg-card overflow-hidden rounded-3xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-sans">
              <thead className="bg-forest-900/5 dark:bg-white/5 text-muted-foreground uppercase text-[11px] font-bold border-b border-forest-900/10 dark:border-white/10">
                <tr>
                  <th className="py-4 px-5">Tuition Title & Subject</th>
                  <th className="py-4 px-5">Tutor Details</th>
                  <th className="py-4 px-5">Monthly Fee</th>
                  <th className="py-4 px-5">Applied Date</th>
                  <th className="py-4 px-5">Status</th>
                  <th className="py-4 px-5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-forest-900/10 dark:divide-white/10">
                {applications.length > 0 ? (
                  applications.map((app) => (
                    <tr key={app._id} className="hover:bg-forest-900/5 dark:hover:bg-white/5 transition-colors">
                      <td className="py-4 px-5 font-semibold text-foreground max-w-xs">
                        <div className="truncate font-serif text-sm font-bold text-foreground">{app.tuitionTitle}</div>
                        <span className="text-[10px] text-brand-600 dark:text-brand-100 font-extrabold uppercase tracking-wide">
                          {app.subject}
                        </span>
                      </td>
                      <td className="py-4 px-5 text-muted-foreground">
                        <div className="font-bold text-foreground">{app.tutorEmail}</div>
                        <span className="text-[10px] text-muted-foreground">{app.preferredSchedule}</span>
                      </td>
                      <td className="py-4 px-5 font-serif font-black text-sm text-foreground">
                        {formatCurrency(app.monthlyFee)}
                      </td>
                      <td className="py-4 px-5 text-muted-foreground">
                        {formatDate(app.appliedAt)}
                      </td>
                      <td className="py-4 px-5">{getStatusBadge(app.status)}</td>
                      <td className="py-4 px-5 text-right">
                        {app.status === 'pending' ? (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleCancel(app._id, app.tuitionTitle)}
                            disabled={cancellingId === app._id}
                            className="text-destructive hover:bg-destructive/10 font-bold gap-1 rounded-full"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                            {cancellingId === app._id ? 'Cancelling...' : 'Cancel'}
                          </Button>
                        ) : app.status === 'accepted' ? (
                          <div className="flex items-center justify-end gap-2">
                            <Button
                              variant="default"
                              size="sm"
                              onClick={() => openReviewModal(app)}
                              className="bg-brand-500 hover:bg-brand-600 text-white font-bold gap-1.5 text-xs rounded-full shadow-sm"
                            >
                              <Star className="h-3.5 w-3.5 fill-current" />
                              Rate & Review
                            </Button>
                          </div>
                        ) : (
                          <span className="text-[11px] text-muted-foreground italic">
                            Locked ({app.status})
                          </span>
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="py-14 text-center text-muted-foreground">
                      <AlertCircle className="mx-auto h-8 w-8 text-muted-foreground/60 mb-2" />
                      <p className="font-serif font-bold text-foreground text-base">No applications found</p>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        You haven&apos;t applied for any tuition batches yet.
                      </p>
                      <Link href="/tuitions" className="inline-block mt-4">
                        <Button size="sm" variant="outline" className="rounded-full font-bold">
                          Browse Available Tuitions
                        </Button>
                      </Link>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {/* STUDENT RATING & REVIEW MODAL */}
      <AnimatePresence>
        {reviewModalOpen && selectedApp && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setReviewModalOpen(false)}
              className="absolute inset-0 bg-black/70 backdrop-blur-md"
            />

            {/* Modal Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 350 }}
              className="relative w-full max-w-lg rounded-3xl border border-forest-900/15 dark:border-white/15 bg-card p-6 sm:p-8 shadow-2xl space-y-5 z-10 overflow-hidden"
            >
              {/* Close Button */}
              <button
                onClick={() => setReviewModalOpen(false)}
                className="absolute top-5 right-5 h-8 w-8 rounded-full border border-forest-900/10 dark:border-white/10 bg-cream/60 dark:bg-white/5 flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-forest-900/10 transition-colors"
                aria-label="Close review modal"
              >
                <X className="h-4 w-4" />
              </button>

              <div>
                <Badge variant="warning" className="mb-2 text-[11px] font-bold">
                  Verified Student Feedback
                </Badge>
                <h3 className="text-xl sm:text-2xl font-serif font-black text-foreground">
                  Rate Your Mentorship with {selectedApp.tuitionTitle}
                </h3>
                <p className="text-xs text-muted-foreground mt-1">
                  Mentor: <strong className="text-foreground">{selectedApp.tutorEmail}</strong> • Subject: <strong className="text-brand-600 dark:text-brand-100">{selectedApp.subject}</strong>
                </p>
              </div>

              <form onSubmit={handleReviewSubmit} className="space-y-5">
                {/* 5-Star Interactive Selector */}
                <div>
                  <label className="block text-xs font-bold text-foreground mb-2 font-sans">
                    Overall Mentorship Rating (1 - 5 Stars) *
                  </label>
                  <div className="flex items-center gap-1.5 py-1">
                    {[1, 2, 3, 4, 5].map((star) => {
                      const isFilled = (hoverRating || rating) >= star;
                      return (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setRating(star)}
                          onMouseEnter={() => setHoverRating(star)}
                          onMouseLeave={() => setHoverRating(0)}
                          className="p-1 transition-transform hover:scale-125 focus:outline-none"
                        >
                          <Star
                            className={`h-7 w-7 transition-colors ${
                              isFilled
                                ? 'fill-amber-400 text-amber-400'
                                : 'text-muted-foreground/30 hover:text-amber-400/60'
                            }`}
                          />
                        </button>
                      );
                    })}
                    <span className="ml-3 text-xs font-bold text-brand-500">
                      {rating === 5 && '5.0 - Excellent'}
                      {rating === 4 && '4.0 - Very Good'}
                      {rating === 3 && '3.0 - Good'}
                      {rating === 2 && '2.0 - Fair'}
                      {rating === 1 && '1.0 - Poor'}
                    </span>
                  </div>
                </div>

                {/* Review Comment Textarea */}
                <div>
                  <label className="block text-xs font-bold text-foreground mb-1.5 font-sans">
                    Your Review & Experience *
                  </label>
                  <Textarea
                    placeholder="Share your learning experience, tutor's punctuality, and teaching quality..."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    rows={4}
                    required
                    className="rounded-2xl text-xs sm:text-sm border-forest-900/15 dark:border-white/15"
                  />
                  <p className="text-[10px] text-muted-foreground mt-1">
                    Your review will appear publicly on the tuition listing page to guide other prospective students.
                  </p>
                </div>

                {/* Actions */}
                <div className="pt-2 flex items-center justify-end gap-3">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setReviewModalOpen(false)}
                    disabled={submittingReview}
                    className="text-xs font-bold h-11 rounded-full px-5"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    disabled={submittingReview}
                    variant="default"
                    className="font-black gap-2 text-xs h-11 px-6 rounded-full bg-brand-500 hover:bg-brand-600 text-white shadow-[0_12px_30px_-6px_rgba(20,175,81,0.35)]"
                  >
                    {submittingReview ? 'Submitting...' : 'Submit Review'}
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
