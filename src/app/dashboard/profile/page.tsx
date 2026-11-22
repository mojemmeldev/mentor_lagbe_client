'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import api from '@/lib/api';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import {
  User,
  Phone,
  Mail,
  Upload,
  Sparkles,
  Save,
  CheckCircle2,
  ShieldCheck,
} from 'lucide-react';

export default function ProfilePage() {
  const { user, updateLocalUser } = useAuth();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [bio, setBio] = useState('');
  const [image, setImage] = useState('');
  const [uploadingImage, setUploadingImage] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (user) {
      setName(user.name || '');
      setPhone(user.phone || '');
      setBio(user.bio || '');
      setImage(user.image || '');
    }
  }, [user]);

  // ImgBB Upload via secure backend proxy
  const handleAvatarFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast.error('Please select an image file.');
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
        setImage(res.data.url);
        toast.success('Avatar image uploaded successfully to ImgBB!');
      }
    } catch (err: any) {
      toast.error('Failed to upload image. You can also paste an image URL below.');
    } finally {
      setUploadingImage(false);
    }
  };

  const handleProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const res = await api.patch('/auth/profile', {
        name: name.trim(),
        phone: phone.trim(),
        bio: bio.trim(),
        image: image.trim(),
      });

      if (res.data.success) {
        toast.success('Profile updated successfully!');
        updateLocalUser({
          name: name.trim(),
          phone: phone.trim(),
          bio: bio.trim(),
          image: image.trim(),
        });
      }
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Failed to update profile.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-serif font-black text-foreground tracking-tight">
          Account Profile
        </h1>
        <p className="text-xs sm:text-sm text-muted-foreground mt-1">
          Manage your personal details, public bio, and avatar.
        </p>
      </div>

      <Card className="p-6 sm:p-8 border border-forest-900/10 dark:border-white/10 shadow-card bg-card rounded-3xl">
        <form onSubmit={handleProfileSubmit} className="space-y-6">
          {/* Avatar Upload Section */}
          <div className="flex flex-col sm:flex-row items-center gap-6 pb-6 border-b border-forest-900/10 dark:border-white/10">
            <div className="relative h-24 w-24 rounded-2xl overflow-hidden border-2 border-forest-900/15 dark:border-white/20 bg-muted/50 shrink-0 shadow-soft">
              <img
                src={image || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'}
                alt={name}
                className="h-full w-full object-cover"
              />
            </div>

            <div className="space-y-3 text-center sm:text-left flex-1 min-w-0">
              <div className="flex items-center gap-2 justify-center sm:justify-start flex-wrap">
                <Badge
                  variant={user?.role === 'admin' ? 'destructive' : user?.role === 'tutor' ? 'secondary' : 'default'}
                  className="capitalize font-bold text-xs"
                >
                  {user?.role} Account
                </Badge>
                {user?.plan === 'pro' && (
                  <Badge variant="pro" className="text-xs">
                    PRO MEMBER
                  </Badge>
                )}
              </div>

              <div className="flex flex-wrap items-center gap-3 pt-0.5 justify-center sm:justify-start">
                <label className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 rounded-full border border-forest-900/15 dark:border-white/15 bg-cream dark:bg-white/5 text-xs font-bold text-foreground hover:bg-forest-900/5 dark:hover:bg-white/10 transition-colors shadow-sm">
                  <Upload className="h-3.5 w-3.5 text-terracotta-500" />
                  <span>{uploadingImage ? 'Uploading...' : 'Upload via ImgBB'}</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleAvatarFileChange}
                    disabled={uploadingImage}
                    className="hidden"
                  />
                </label>

                <Input
                  type="url"
                  placeholder="Or paste image URL"
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                  className="max-w-xs h-9 text-xs rounded-full border-forest-900/15 dark:border-white/15"
                />
              </div>
            </div>
          </div>

          {/* Name & Email Fields */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-bold text-foreground mb-1.5 font-sans">
                Full Name
              </label>
              <Input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="rounded-xl border-forest-900/15 dark:border-white/15"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-foreground mb-1.5 font-sans">
                Email Address (Read Only)
              </label>
              <Input
                type="email"
                value={user?.email || ''}
                disabled
                className="opacity-70 cursor-not-allowed bg-muted/40 rounded-xl border-forest-900/15 dark:border-white/15"
              />
            </div>
          </div>

          {/* Contact Phone Number */}
          <div>
            <label className="block text-xs font-bold text-foreground mb-1.5 font-sans">
              Contact Phone Number
            </label>
            <Input
              type="text"
              placeholder="+880 1700 000000"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="rounded-xl border-forest-900/15 dark:border-white/15"
            />
          </div>

          {/* Bio */}
          <div>
            <label className="block text-xs font-bold text-foreground mb-1.5 font-sans">
              Bio / Academic Background
            </label>
            <Textarea
              rows={3}
              placeholder="Tell others about your university, subjects of interest, or teaching methodology..."
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="rounded-2xl border-forest-900/15 dark:border-white/15"
            />
          </div>

          <div className="pt-2 flex justify-end">
            <Button
              type="submit"
              disabled={saving || uploadingImage}
              variant="default"
              className="font-bold gap-2 px-6 rounded-full shadow-glow"
            >
              <Save className="h-4 w-4" />
              {saving ? 'Saving Changes...' : 'Save Profile'}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
