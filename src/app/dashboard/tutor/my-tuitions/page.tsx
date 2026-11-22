'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import api from '@/lib/api';
import { formatCurrency, formatDate } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { DashboardTableSkeleton } from '@/components/common/Skeleton';
import { toast } from 'sonner';
import {
  PlusCircle,
  Edit2,
  Trash2,
  Power,
  AlertCircle,
  X,
  Save,
  CheckCircle2,
  Clock,
  XCircle,
} from 'lucide-react';

export default function MyTuitionsPage() {
  const [tuitions, setTuitions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Edit Modal State
  const [editingTuition, setEditingTuition] = useState<any>(null);
  const [editTitle, setEditTitle] = useState('');
  const [editFee, setEditFee] = useState('');
  const [editDays, setEditDays] = useState('3');
  const [editDesc, setEditDesc] = useState('');
  const [savingEdit, setSavingEdit] = useState(false);

  const fetchMyTuitions = () => {
    setLoading(true);
    api.get('/tuitions/tutor/my-tuitions')
      .then((res) => {
        if (res.data.success) {
          setTuitions(res.data.data || []);
        }
      })
      .catch((err) => {
        console.error('Failed to load tuitions:', err);
        toast.error('Failed to load your tuitions.');
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchMyTuitions();
  }, []);

  const handleToggleStatus = async (id: string, currentStatus: boolean) => {
    try {
      const res = await api.patch(`/tuitions/${id}/toggle-status`);
      if (res.data.success) {
        toast.success(res.data.message);
        setTuitions((prev) =>
          prev.map((t) => (t._id === id ? { ...t, isActive: !currentStatus } : t))
        );
      }
    } catch (err: any) {
      toast.error('Failed to toggle status.');
    }
  };

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Are you sure you want to delete "${title}"? This cannot be undone.`)) {
      return;
    }

    try {
      const res = await api.delete(`/tuitions/${id}`);
      if (res.data.success) {
        toast.success(res.data.message || 'Tuition deleted.');
        setTuitions((prev) => prev.filter((t) => t._id !== id));
      }
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Failed to delete tuition.');
    }
  };

  const openEditModal = (tuition: any) => {
    setEditingTuition(tuition);
    setEditTitle(tuition.title);
    setEditFee(tuition.monthlyFee.toString());
    setEditDays(tuition.daysPerWeek.toString());
    setEditDesc(tuition.description);
  };

  const handleSaveEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingTuition) return;

    setSavingEdit(true);
    try {
      const res = await api.patch(`/tuitions/${editingTuition._id}`, {
        title: editTitle.trim(),
        monthlyFee: Number(editFee),
        daysPerWeek: Number(editDays),
        description: editDesc.trim(),
      });

      if (res.data.success) {
        toast.success('Tuition updated successfully.');
        setTuitions((prev) =>
          prev.map((t) => (t._id === editingTuition._id ? { ...t, ...res.data.data } : t))
        );
        setEditingTuition(null);
      }
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Failed to update tuition.');
    } finally {
      setSavingEdit(false);
    }
  };

  const getApprovalBadge = (status: string) => {
    switch (status) {
      case 'approved':
        return (
          <Badge variant="success" className="gap-1">
            <CheckCircle2 className="h-3 w-3" />
            Approved
          </Badge>
        );
      case 'rejected':
        return (
          <Badge variant="destructive" className="gap-1">
            <XCircle className="h-3 w-3" />
            Rejected
          </Badge>
        );
      default:
        return (
          <Badge variant="warning" className="gap-1">
            <Clock className="h-3 w-3" />
            Pending Approval
          </Badge>
        );
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto font-sans">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-serif font-black text-foreground tracking-tight">
            My Created Tuitions
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground mt-1">
            Full control over your tuition listings, approval status, and visibility.
          </p>
        </div>

        <Link href="/dashboard/tutor/post-tuition" className="shrink-0">
          <Button size="sm" variant="default" className="font-bold gap-1.5 rounded-full shadow-glow">
            <PlusCircle className="h-4 w-4" />
            Create New Tuition
          </Button>
        </Link>
      </div>

      {loading ? (
        <DashboardTableSkeleton
          columns={6}
          rows={4}
          headers={[
            'Tuition Title & Subject',
            'Fee / Month',
            'Schedule & Mode',
            'Admin Status',
            'Listing State',
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
                  <th className="py-4 px-5">Fee / Month</th>
                  <th className="py-4 px-5">Schedule & Mode</th>
                  <th className="py-4 px-5">Admin Status</th>
                  <th className="py-4 px-5">Listing State</th>
                  <th className="py-4 px-5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-forest-900/10 dark:divide-white/10">
                {tuitions.length > 0 ? (
                  tuitions.map((t) => (
                    <tr key={t._id} className="hover:bg-forest-900/5 dark:hover:bg-white/5 transition-colors">
                      <td className="py-4 px-5 font-semibold text-foreground max-w-xs">
                        <div className="truncate font-serif text-sm font-bold text-foreground">{t.title}</div>
                        <span className="text-[10px] text-terracotta-500 font-extrabold uppercase tracking-wide">
                          {t.subject}
                        </span>
                      </td>
                      <td className="py-4 px-5 font-serif font-black text-sm text-foreground">
                        {formatCurrency(t.monthlyFee)}
                      </td>
                      <td className="py-4 px-5 text-muted-foreground">
                        <div className="font-medium text-foreground">{t.daysPerWeek} Days / Week</div>
                        <span className="text-[10px] text-muted-foreground">{t.mode}</span>
                      </td>
                      <td className="py-4 px-5">{getApprovalBadge(t.approvalStatus)}</td>
                      <td className="py-4 px-5">
                        <button
                          onClick={() => handleToggleStatus(t._id, t.isActive)}
                          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold transition-all border ${
                            t.isActive
                              ? 'bg-brand-500/15 text-brand-700 dark:text-emerald-300 border-emerald-500/30'
                              : 'bg-muted text-muted-foreground border-border'
                          }`}
                          title="Click to toggle Active / Closed state"
                        >
                          <Power className="h-3 w-3" />
                          {t.isActive ? 'Active' : 'Closed'}
                        </button>
                      </td>
                      <td className="py-4 px-5 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => openEditModal(t)}
                            className="h-8 w-8 p-0 rounded-full hover:bg-forest-900/10 dark:hover:bg-white/10"
                            title="Edit"
                          >
                            <Edit2 className="h-3.5 w-3.5" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDelete(t._id, t.title)}
                            className="h-8 w-8 p-0 text-destructive hover:bg-destructive/10 rounded-full"
                            title="Delete"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="py-14 text-center text-muted-foreground">
                      <AlertCircle className="mx-auto h-8 w-8 text-muted-foreground/60 mb-2" />
                      <p className="font-serif font-bold text-foreground text-base">No tuitions posted yet</p>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        Publish your first batch to start receiving student applications.
                      </p>
                      <Link href="/dashboard/tutor/post-tuition" className="inline-block mt-4">
                        <Button size="sm" variant="default" className="rounded-full font-bold shadow-glow">
                          Post a Tuition
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

      {/* Edit Tuition Modal */}
      {editingTuition && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="w-full max-w-lg rounded-3xl border border-forest-900/15 dark:border-white/15 bg-card p-6 sm:p-8 shadow-2xl relative space-y-5 animate-in zoom-in-95 duration-150">
            <button
              onClick={() => setEditingTuition(null)}
              className="absolute top-5 right-5 h-8 w-8 rounded-full border border-forest-900/10 dark:border-white/10 bg-cream/60 dark:bg-white/5 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
            >
              <X className="h-4 w-4" />
            </button>

            <div>
              <h3 className="text-xl font-serif font-black text-foreground">Edit Tuition Details</h3>
              <p className="text-xs text-muted-foreground mt-0.5">{editingTuition.subject} • {editingTuition.classLevel}</p>
            </div>

            <form onSubmit={handleSaveEdit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-foreground mb-1.5 font-sans">Title</label>
                <Input
                  type="text"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  required
                  className="rounded-xl border-forest-900/15 dark:border-white/15"
                />
              </div>

              <div className="grid grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-bold text-foreground mb-1.5 font-sans">
                    Monthly Fee (BDT)
                  </label>
                  <Input
                    type="number"
                    value={editFee}
                    onChange={(e) => setEditFee(e.target.value)}
                    required
                    className="rounded-xl border-forest-900/15 dark:border-white/15"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-foreground mb-1.5 font-sans">
                    Days / Week
                  </label>
                  <select
                    value={editDays}
                    onChange={(e) => setEditDays(e.target.value)}
                    className="w-full h-11 rounded-xl border border-forest-900/15 dark:border-white/15 bg-background px-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-terracotta-500"
                  >
                    <option value="1">1 Day</option>
                    <option value="2">2 Days</option>
                    <option value="3">3 Days</option>
                    <option value="4">4 Days</option>
                    <option value="5">5 Days</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-foreground mb-1.5 font-sans">Description</label>
                <Textarea
                  rows={3}
                  value={editDesc}
                  onChange={(e) => setEditDesc(e.target.value)}
                  required
                  className="rounded-2xl border-forest-900/15 dark:border-white/15"
                />
              </div>

              <div className="flex justify-end gap-2.5 pt-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setEditingTuition(null)}
                  disabled={savingEdit}
                  className="rounded-full px-5 font-bold"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={savingEdit}
                  variant="default"
                  className="font-bold gap-2 rounded-full px-6 shadow-glow"
                >
                  <Save className="h-4 w-4" />
                  {savingEdit ? 'Saving...' : 'Save Changes'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
