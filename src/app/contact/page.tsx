'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Mail,
  Phone,
  MapPin,
  Send,
  CheckCircle2,
  MessageSquare,
} from 'lucide-react';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    role: 'student',
    subject: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      alert('Please fill in your name, email, and message.');
      return;
    }
    setSubmitted(true);
  };

  return (
    <div className="flex flex-col min-h-screen bg-cream/40 dark:bg-[#081612] transition-colors duration-300">
      {/* 1. Header Banner */}
      <section className="py-16 sm:py-20 border-b border-forest-900/10 dark:border-white/10 bg-cream/60 dark:bg-[#0B1E19]">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <Badge variant="default" className="mb-3 font-bold rounded-full text-xs">
            <MessageSquare className="h-3.5 w-3.5 mr-1" /> Academic Help, Day or Night
          </Badge>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-forest-900 dark:text-[#F5F2EB] tracking-tight">
            Support That&apos;s <span className="text-brand-500 underline decoration-brand-500/40 underline-offset-4">Easy to Reach</span>
          </h1>
          <p className="text-sm sm:text-base text-forest-800/75 dark:text-[#F5F2EB]/75 max-w-2xl mx-auto mt-3">
            Questions about finding a tutor, applying to a batch, or Pro plans? Our Dhaka team is ready to help.
          </p>
        </div>
      </section>

      {/* 2. Contact Grid */}
      <section className="py-16 sm:py-20 flex-1">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left Reach Us Directly */}
            <div className="lg:col-span-5 space-y-6">
              <div>
                <h2 className="font-serif text-2xl font-bold text-forest-900 dark:text-[#F5F2EB]">Reach Us Directly</h2>
                <p className="text-xs sm:text-sm text-forest-800/60 dark:text-white/60 mt-1 font-medium">
                  Talk to our Dhaka team by phone or email whenever you need a hand.
                </p>
              </div>

              <div className="space-y-4">
                <motion.div
                  whileHover={{ y: -3 }}
                  className="p-5 rounded-3xl border border-forest-900/10 dark:border-white/10 bg-white dark:bg-[#0F241E] shadow-card flex items-start gap-4"
                >
                  <div className="h-10 w-10 rounded-2xl bg-cream dark:bg-[#153028] border border-forest-900/10 dark:border-white/10 text-brand-500 flex items-center justify-center shrink-0">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-serif text-sm font-bold text-forest-900 dark:text-white">Learner & Mentor Helpline</h3>
                    <p className="text-xs font-semibold text-forest-800/80 dark:text-white/80 mt-0.5">+880 1700 000000</p>
                    <p className="text-[11px] text-forest-800/60 dark:text-white/60 mt-0.5">Every day, 9:00 AM – 10:00 PM</p>
                  </div>
                </motion.div>

                <motion.div
                  whileHover={{ y: -3 }}
                  className="p-5 rounded-3xl border border-forest-900/10 dark:border-white/10 bg-white dark:bg-[#0F241E] shadow-card flex items-start gap-4"
                >
                  <div className="h-10 w-10 rounded-2xl bg-cream dark:bg-[#153028] border border-forest-900/10 dark:border-white/10 text-brand-500 flex items-center justify-center shrink-0">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-serif text-sm font-bold text-forest-900 dark:text-white">Email Support</h3>
                    <p className="text-xs font-semibold text-forest-800/80 dark:text-white/80 mt-0.5">support@mentorlagbe.com</p>
                    <p className="text-[11px] text-forest-800/60 dark:text-white/60 mt-0.5">We usually answer within two hours</p>
                  </div>
                </motion.div>

                <motion.div
                  whileHover={{ y: -3 }}
                  className="p-5 rounded-3xl border border-forest-900/10 dark:border-white/10 bg-white dark:bg-[#0F241E] shadow-card flex items-start gap-4"
                >
                  <div className="h-10 w-10 rounded-2xl bg-cream dark:bg-[#153028] border border-forest-900/10 dark:border-white/10 text-brand-500 flex items-center justify-center shrink-0">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-serif text-sm font-bold text-forest-900 dark:text-white">Our Dhaka Office</h3>
                    <p className="text-xs text-forest-800/70 dark:text-white/70 mt-0.5 font-medium leading-relaxed">
                      House #42, Road #7/A, Dhanmondi, Dhaka - 1209, Bangladesh
                    </p>
                  </div>
                </motion.div>
              </div>

              {/* Safety Quick Link */}
              <div className="p-5 rounded-3xl border border-emerald-600/20 bg-brand-50 dark:bg-emerald-950/30 shadow-card">
                <h4 className="text-xs font-bold text-emerald-800 dark:text-emerald-300">
                  Stay Safe
                </h4>
                <p className="text-[11px] text-forest-800/70 dark:text-white/70 mt-1 leading-relaxed">
                  Our team will never ask for your password or Stripe card details by phone or email.
                </p>
              </div>
            </div>

            {/* Right Form with Warm Card */}
            <div className="lg:col-span-7">
              <div className="p-8 sm:p-10 rounded-3xl border border-forest-900/10 dark:border-white/10 bg-white dark:bg-[#0F241E] shadow-card">
                {submitted ? (
                  <div className="text-center py-12 space-y-4">
                    <div className="h-16 w-16 bg-emerald-100 dark:bg-brand-500/20 border border-emerald-500 text-brand-600 rounded-full flex items-center justify-center mx-auto shadow-soft">
                      <CheckCircle2 className="h-8 w-8" />
                    </div>
                    <h3 className="font-serif text-2xl font-bold text-forest-900 dark:text-white">Your Message Is With Us</h3>
                    <p className="text-xs sm:text-sm text-forest-800/75 dark:text-[#F5F2EB]/75 max-w-md mx-auto leading-relaxed">
                      Thanks for writing in, {formData.name}. Our support team has your note and will reply to <span className="font-bold text-forest-900 dark:text-white">{formData.email}</span> shortly.
                    </p>
                    <Button
                      variant="outline"
                      onClick={() => {
                        setSubmitted(false);
                        setFormData({
                          name: '',
                          email: '',
                          phone: '',
                          role: 'student',
                          subject: '',
                          message: '',
                        });
                      }}
                      className="mt-4 rounded-full border-forest-900/15 dark:border-white/15 text-forest-900 dark:text-white hover:bg-forest-900/5 cursor-pointer"
                    >
                      Write Another Note
                    </Button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                      <h3 className="font-serif text-xl sm:text-2xl font-bold text-forest-900 dark:text-[#F5F2EB]">Tell Us What You Need</h3>
                      <p className="text-xs text-forest-800/60 dark:text-white/60 mt-0.5">
                        Share a few details and we will get back to you shortly.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-forest-900 dark:text-white">Full Name *</label>
                        <input
                          placeholder="e.g. Ayesha Khan"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          required
                          className="w-full h-11 px-3.5 rounded-2xl border border-forest-900/15 dark:border-white/15 bg-cream/40 dark:bg-[#153028] text-xs text-forest-900 dark:text-white placeholder:text-forest-800/40 dark:placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-brand-500/40 transition-all"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-forest-900 dark:text-white">Email *</label>
                        <input
                          type="email"
                          placeholder="e.g. ayesha@example.com"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          required
                          className="w-full h-11 px-3.5 rounded-2xl border border-forest-900/15 dark:border-white/15 bg-cream/40 dark:bg-[#153028] text-xs text-forest-900 dark:text-white placeholder:text-forest-800/40 dark:placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-brand-500/40 transition-all"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-forest-900 dark:text-white">Phone (optional)</label>
                        <input
                          placeholder="e.g. 01712-345678"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="w-full h-11 px-3.5 rounded-2xl border border-forest-900/15 dark:border-white/15 bg-cream/40 dark:bg-[#153028] text-xs text-forest-900 dark:text-white placeholder:text-forest-800/40 dark:placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-brand-500/40 transition-all"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-forest-900 dark:text-white">My role:</label>
                        <select
                          value={formData.role}
                          onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                          className="w-full h-11 px-3.5 rounded-2xl border border-forest-900/15 dark:border-white/15 bg-cream/40 dark:bg-[#153028] text-xs text-forest-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500/40 transition-all cursor-pointer"
                        >
                          <option value="student" className="bg-white dark:bg-[#0F241E] text-forest-900 dark:text-white">Student / Parent</option>
                          <option value="tutor" className="bg-white dark:bg-[#0F241E] text-forest-900 dark:text-white">Tutor / Instructor</option>
                          <option value="other" className="bg-white dark:bg-[#0F241E] text-forest-900 dark:text-white">Someone Else</option>
                        </select>
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-forest-900 dark:text-white">Topic</label>
                      <input
                        placeholder="e.g. Verification or Pro plan question"
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        className="w-full h-11 px-3.5 rounded-2xl border border-forest-900/15 dark:border-white/15 bg-cream/40 dark:bg-[#153028] text-xs text-forest-900 dark:text-white placeholder:text-forest-800/40 dark:placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-brand-500/40 transition-all"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-forest-900 dark:text-white">Your Message *</label>
                      <textarea
                        rows={4}
                        placeholder="Tell us what you need help with..."
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        required
                        className="w-full p-3.5 rounded-2xl border border-forest-900/15 dark:border-white/15 bg-cream/40 dark:bg-[#153028] text-xs text-forest-900 dark:text-white placeholder:text-forest-800/40 dark:placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-brand-500/40 transition-all resize-none"
                      />
                    </div>

                    <Button
                      type="submit"
                      variant="default"
                      size="lg"
                      className="w-full gap-2 rounded-full font-bold shadow-[0_12px_30px_-6px_rgba(20,175,81,0.35)] cursor-pointer"
                    >
                      <Send className="h-4 w-4" />
                      Send Message
                    </Button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}