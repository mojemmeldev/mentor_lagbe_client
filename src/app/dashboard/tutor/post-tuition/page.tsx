'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import api from '@/lib/api';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import {
  Upload,
  Image as ImageIcon,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  ArrowRight,
  BookOpen,
} from 'lucide-react';

export default function PostTuitionPage() {
  const router = useRouter();
  const { user } = useAuth();

  const [title, setTitle] = useState('');
  const [subject, setSubject] = useState('Mathematics');
  const [classLevel, setClassLevel] = useState('Class 11-12 (HSC)');
  const [mode, setMode] = useState<'Online' | 'Offline'>('Online');
  const [location, setLocation] = useState('Online via Zoom / Meet');
  const [monthlyFee, setMonthlyFee] = useState('3500');
  const [daysPerWeek, setDaysPerWeek] = useState('3');
  const [description, setDescription] = useState('');
  const [bannerImage, setBannerImage] = useState('');
  const [uploadingImage, setUploadingImage] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Direct file upload to ImgBB via secure server proxy
  const handleImageFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast.error('Please select an image file (PNG, JPG, WEBP).');
      return;
    }

    if (file.size > 8 * 1024 * 1024) {
      toast.error('Image size should be less than 8MB.');
      return;
    }

    setUploadingImage(true);
    const formData = new FormData();
    formData.append('image', file);

    try {
      const res = await api.post('/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      if (res.data.success && res.data.url) {
        setBannerImage(res.data.url);
        toast.success('Banner image uploaded successfully to ImgBB!');
      }
    } catch (err: any) {
      console.error('Image upload failed:', err);
      toast.error(err.response?.data?.message || 'Failed to upload image. You can also paste an image URL below.');
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim() || !description.trim() || !monthlyFee || !daysPerWeek) {
      toast.error('Please complete all required fields.');
      return;
    }

    setSubmitting(true);
    try {
      const res = await api.post('/tuitions', {
        title: title.trim(),
        subject,
        classLevel,
        mode,
        location: location.trim(),
        monthlyFee: Number(monthlyFee),
        daysPerWeek: Number(daysPerWeek),
        bannerImage: bannerImage.trim() || 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=80',
        description: description.trim(),
      });

      if (res.data.success) {
        toast.success('Tuition submitted! Awaiting Admin approval.');
        router.push('/dashboard/tutor/my-tuitions');
      }
    } catch (err: any) {
      const errorData = err.response?.data;
      if (errorData?.code === 'PLAN_LIMIT_REACHED') {
        toast.error('Free plan limit reached (max 2 tuitions). Please upgrade to Pro.');
        router.push('/pricing');
      } else {
        toast.error(errorData?.message || 'Failed to create tuition post.');
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 font-sans">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <Badge variant="secondary" className="mb-1 rounded-full px-3 text-xs font-bold">
            New Listing
          </Badge>
          <h1 className="text-2xl sm:text-3xl font-serif font-black text-foreground tracking-tight">
            Post a New Tuition Batch
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground mt-1">
            Share your expertise. Fill in subject, schedule, location, and fees to attract learners.
          </p>
        </div>

        {user?.plan === 'free' && (
          <div className="rounded-2xl border border-brand-500/40 bg-brand-500/10 px-4 py-2 text-xs font-bold text-brand-500 shadow-sm">
            Free Plan: <strong>Max 2 tuitions</strong>
          </div>
        )}
      </div>

      <Card className="p-6 sm:p-8 border border-forest-900/10 dark:border-white/10 shadow-card bg-card rounded-3xl">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Tuition Title */}
          <div>
            <label className="block text-xs font-bold text-foreground mb-1.5 font-sans">
              Tuition Title *
            </label>
            <Input
              type="text"
              placeholder="e.g. HSC Higher Mathematics: Calculus & Algebra Special Batch"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="rounded-xl border-forest-900/15 dark:border-white/15"
            />
          </div>

          {/* Subject & Class Level */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-bold text-foreground mb-1.5 font-sans">
                Subject Category *
              </label>
              <select
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full h-11 rounded-xl border border-forest-900/15 dark:border-white/15 bg-background px-3.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-terracotta-500"
              >
                <option value="Mathematics">Mathematics</option>
                <option value="Physics">Physics</option>
                <option value="Chemistry">Chemistry</option>
                <option value="Biology">Biology</option>
                <option value="Programming">Programming</option>
                <option value="English">English & IELTS</option>
                <option value="ICT">ICT</option>
                <option value="Accounting">Accounting & Finance</option>
                <option value="General Science">General Science</option>
                <option value="Bangla">Bangla</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-foreground mb-1.5 font-sans">
                Target Class Level *
              </label>
              <select
                value={classLevel}
                onChange={(e) => setClassLevel(e.target.value)}
                className="w-full h-11 rounded-xl border border-forest-900/15 dark:border-white/15 bg-background px-3.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-terracotta-500"
              >
                <option value="Class 11-12 (HSC)">Class 11-12 (HSC)</option>
                <option value="Class 9-10 (SSC)">Class 9-10 (SSC)</option>
                <option value="Admission & HSC">Admission & HSC</option>
                <option value="O/A Level (Cambridge/Edexcel)">O/A Level (Cambridge/Edexcel)</option>
                <option value="Class 6-10">Class 6-10</option>
                <option value="Undergraduate / Adults">Undergraduate / Adults</option>
                <option value="All Levels">All Levels</option>
              </select>
            </div>
          </div>

          {/* Mode & Location */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-bold text-foreground mb-1.5 font-sans">
                Teaching Mode *
              </label>
              <div className="grid grid-cols-2 gap-2.5">
                <button
                  type="button"
                  onClick={() => {
                    setMode('Online');
                    setLocation('Online via Zoom / Meet');
                  }}
                  className={`h-11 rounded-xl text-xs font-bold transition-all border ${
                    mode === 'Online'
                      ? 'bg-forest-900 text-white dark:bg-white dark:text-forest-900 border-transparent shadow-sm'
                      : 'border-forest-900/15 dark:border-white/15 text-muted-foreground hover:bg-forest-900/5'
                  }`}
                >
                  Online
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setMode('Offline');
                    setLocation('Dhanmondi, Dhaka');
                  }}
                  className={`h-11 rounded-xl text-xs font-bold transition-all border ${
                    mode === 'Offline'
                      ? 'bg-forest-900 text-white dark:bg-white dark:text-forest-900 border-transparent shadow-sm'
                      : 'border-forest-900/15 dark:border-white/15 text-muted-foreground hover:bg-forest-900/5'
                  }`}
                >
                  Offline (In-Person)
                </button>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-foreground mb-1.5 font-sans">
                Location Details *
              </label>
              <Input
                type="text"
                placeholder={mode === 'Online' ? 'e.g. Online via Zoom / Meet' : 'e.g. Dhanmondi, Dhaka'}
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                required
                className="rounded-xl border-forest-900/15 dark:border-white/15"
              />
            </div>
          </div>

          {/* Monthly Fee & Days/Week */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-bold text-foreground mb-1.5 font-sans">
                Monthly Fee (BDT) *
              </label>
              <Input
                type="number"
                min="500"
                step="100"
                placeholder="e.g. 3500"
                value={monthlyFee}
                onChange={(e) => setMonthlyFee(e.target.value)}
                required
                className="rounded-xl border-forest-900/15 dark:border-white/15"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-foreground mb-1.5 font-sans">
                Days per Week *
              </label>
              <select
                value={daysPerWeek}
                onChange={(e) => setDaysPerWeek(e.target.value)}
                className="w-full h-11 rounded-xl border border-forest-900/15 dark:border-white/15 bg-background px-3.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-terracotta-500"
              >
                <option value="1">1 Day / Week</option>
                <option value="2">2 Days / Week</option>
                <option value="3">3 Days / Week</option>
                <option value="4">4 Days / Week</option>
                <option value="5">5 Days / Week</option>
              </select>
            </div>
          </div>

          {/* ImgBB Banner Upload */}
          <div className="space-y-3 pt-3 border-t border-forest-900/10 dark:border-white/10">
            <label className="block text-xs font-bold text-foreground font-sans">
              Banner Image (Upload via ImgBB or Paste URL)
            </label>

            <div className="flex flex-col sm:flex-row items-center gap-4">
              <label className="cursor-pointer inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-forest-900/15 dark:border-white/15 bg-cream dark:bg-white/5 text-xs font-bold text-foreground hover:bg-forest-900/5 transition-colors shadow-sm shrink-0">
                <Upload className="h-4 w-4 text-terracotta-500" />
                <span>{uploadingImage ? 'Uploading to ImgBB...' : 'Upload Image File'}</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageFileChange}
                  disabled={uploadingImage}
                  className="hidden"
                />
              </label>

              <span className="text-xs text-muted-foreground">or direct image URL:</span>

              <Input
                type="url"
                placeholder="https://images.unsplash.com/..."
                value={bannerImage}
                onChange={(e) => setBannerImage(e.target.value)}
                className="flex-1 rounded-xl border-forest-900/15 dark:border-white/15"
              />
            </div>

            {bannerImage && (
              <div className="relative h-44 w-full max-w-sm rounded-3xl overflow-hidden border border-forest-900/15 dark:border-white/15 bg-muted mt-2 shadow-soft">
                <img
                  src={bannerImage}
                  alt="Banner preview"
                  className="h-full w-full object-cover"
                />
              </div>
            )}
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-bold text-foreground mb-1.5 font-sans">
              Tuition Description & Course Plan *
            </label>
            <Textarea
              rows={4}
              placeholder="Outline what you will cover, prerequisite knowledge, mock test schedules, and teaching approach..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              className="rounded-2xl border-forest-900/15 dark:border-white/15"
            />
          </div>

          <div className="pt-4 flex items-center justify-end gap-3 border-t border-forest-900/10 dark:border-white/10">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.push('/dashboard/tutor/my-tuitions')}
              className="rounded-full px-5 font-bold"
            >
              Cancel
            </Button>

            <Button
              type="submit"
              disabled={submitting || uploadingImage}
              variant="default"
              className="font-bold gap-2 rounded-full px-6 shadow-glow"
            >
              <BookOpen className="h-4 w-4" />
              {submitting ? 'Submitting...' : 'Publish Tuition Post'}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
