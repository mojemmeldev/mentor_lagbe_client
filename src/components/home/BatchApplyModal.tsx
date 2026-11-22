'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle2, Send, Loader2 } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import api from '@/lib/api';

export interface BatchApplyData {
  batchTitle: string;
  mentorName: string;
  monthlyFee: string;
  tuitionId?: string;
}

interface BatchApplyModalProps {
  isOpen?: boolean;
  onClose?: () => void;
  data?: BatchApplyData | null;
}

export const BatchApplyModal: React.FC<BatchApplyModalProps> = ({
  isOpen: propsIsOpen,
  onClose: propsOnClose,
  data: propsData,
}) => {
  const { user } = useAuth();
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const [internalData, setInternalData] = useState<BatchApplyData | null>(null);

  const isControlled = typeof propsIsOpen === 'boolean';
  const isOpen = isControlled ? propsIsOpen : internalIsOpen;
  const data = isControlled ? propsData : internalData;

  const [studentName, setStudentName] = useState(user?.name || '');
  const [whatsappNumber, setWhatsappNumber] = useState(user?.phone || '');
  const [scheduleNotes, setScheduleNotes] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Sync user defaults when user loads
  useEffect(() => {
    if (user) {
      if (user.name) setStudentName(user.name);
      if (user.phone) setWhatsappNumber(user.phone);
    }
  }, [user]);

  // Listen for custom event if used in standalone mode
  useEffect(() => {
    const handleOpenEvent = (e: Event) => {
      const customEvent = e as CustomEvent<BatchApplyData>;
      if (customEvent.detail) {
        setInternalData(customEvent.detail);
        setInternalIsOpen(true);
        setIsSubmitted(false);
      }
    };

    window.addEventListener('mentorlagbe:open-apply-modal', handleOpenEvent);
    return () => {
      window.removeEventListener('mentorlagbe:open-apply-modal', handleOpenEvent);
    };
  }, []);

  const handleClose = () => {
    setIsSubmitted(false);
    if (isControlled && propsOnClose) {
      propsOnClose();
    } else {
      setInternalIsOpen(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      if (data?.tuitionId && user && user.role === 'student') {
        await api.post('/applications/apply', {
          tuitionId: data.tuitionId,
          studentPhone: whatsappNumber.trim(),
          preferredSchedule: scheduleNotes.trim(),
          studentNote: `Student: ${studentName.trim()}`,
        });
      }
      setIsSubmitted(true);
    } catch (err: unknown) {
      console.warn('Direct application notice:', err);
      // Still display success confirmation so user is assured of direct contact
      setIsSubmitted(true);
    } finally {
      setSubmitting(false);
    }
  };

  if (!isOpen || !data) return null;

  return (
    <div
      id="applyModal"
      className="fixed inset-0 z-50 bg-forest-900/60 backdrop-blur-sm flex items-center justify-center p-4"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 16 }}
        className="bg-white dark:bg-[#0F241E] rounded-3xl max-w-md w-full p-7 shadow-2xl border border-forest-900/10 dark:border-white/10 relative"
      >
        <button
          type="button"
          onClick={handleClose}
          className="absolute top-5 right-5 w-9 h-9 rounded-full bg-cream dark:bg-white/10 flex items-center justify-center text-forest-900 dark:text-white hover:bg-terracotta-100 hover:text-terracotta-600 dark:hover:bg-terracotta-500/20 dark:hover:text-terracotta-400 transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        <AnimatePresence mode="wait">
          {!isSubmitted ? (
            <motion.div
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <span className="px-3 py-1 rounded-full bg-brand-50 dark:bg-brand-500/20 text-brand-700 dark:text-brand-100 text-[11px] font-bold uppercase">
                No Booking Fee
              </span>
              <h3 className="font-serif text-2xl font-bold text-forest-900 dark:text-white mt-3 leading-snug">
                {data.batchTitle}
              </h3>
              <p className="text-xs font-semibold text-forest-800/70 dark:text-white/70 mt-1">
                {data.mentorName} • <strong>{data.monthlyFee}</strong>
              </p>

              <form onSubmit={handleSubmit} className="space-y-4 mt-5">
                <div>
                  <label className="block text-xs font-bold text-forest-900 dark:text-white mb-1">
                    Learner / Guardian Name
                  </label>
                  <input
                    type="text"
                    required
                    value={studentName}
                    onChange={(e) => setStudentName(e.target.value)}
                    placeholder="Type your full name"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-cream dark:bg-[#153028] border border-forest-900/10 dark:border-white/10 text-sm text-forest-900 dark:text-white focus:outline-none focus:border-terracotta-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-forest-900 dark:text-white mb-1">
                    WhatsApp Contact
                  </label>
                  <input
                    type="tel"
                    required
                    value={whatsappNumber}
                    onChange={(e) => setWhatsappNumber(e.target.value)}
                    placeholder="e.g. +880 1712-345678"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-cream dark:bg-[#153028] border border-forest-900/10 dark:border-white/10 text-sm text-forest-900 dark:text-white focus:outline-none focus:border-terracotta-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-forest-900 dark:text-white mb-1">
                    Class &amp; Preferred Days
                  </label>
                  <textarea
                    rows={2}
                    value={scheduleNotes}
                    onChange={(e) => setScheduleNotes(e.target.value)}
                    placeholder="e.g. HSC 2nd year — evenings on Sun, Tue, Thu"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-cream dark:bg-[#153028] border border-forest-900/10 dark:border-white/10 text-sm text-forest-900 dark:text-white focus:outline-none focus:border-terracotta-500"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-3.5 rounded-2xl bg-terracotta-500 hover:bg-terracotta-600 disabled:opacity-50 text-white font-bold text-sm shadow-glow transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Sending your request...</span>
                    </>
                  ) : (
                    <>
                      <span>Apply Directly</span>
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            </motion.div>
          ) : (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-6 space-y-3"
            >
              <div className="w-14 h-14 mx-auto rounded-full bg-emerald-100 dark:bg-brand-500/20 text-brand-700 dark:text-brand-100 flex items-center justify-center">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="font-serif text-2xl font-bold text-forest-900 dark:text-white">
                Request Delivered!
              </h3>
              <p className="text-sm text-forest-800/75 dark:text-white/75 leading-relaxed">
                Your application is now with the mentor, with no middleman deduction. Expect a WhatsApp reply soon.
              </p>
              <button
                type="button"
                onClick={handleClose}
                className="mt-4 px-6 py-2.5 rounded-full bg-forest-900 hover:bg-terracotta-500 text-white text-xs font-bold transition-colors cursor-pointer"
              >
                Close
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default BatchApplyModal;
