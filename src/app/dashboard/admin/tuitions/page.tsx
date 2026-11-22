'use client';

import React, { useEffect, useState } from 'react';
import api from '@/lib/api';
import { formatCurrency, formatDate } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { TableRowSkeleton } from '@/components/common/Skeleton';
import { toast } from 'sonner';
import { Check, X, CheckSquare, Clock, CheckCircle2, XCircle } from 'lucide-react';

export default function AdminTuitionsPage() {
  const [tuitions, setTuitions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionId, setActionId] = useState<string | null>(null);

  const fetchTuitions = () => {
    setLoading(true);
    api.get('/tuitions/admin/all')
      .then((res) => {
        if (res.data.success) {
          setTuitions(res.data.data || []);
        }
      })
      .catch((err) => {
        console.error('Failed to load tuitions:', err);
        toast.error('Failed to load tuitions list.');
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchTuitions();
  }, []);

  const handleUpdateStatus = async (id: string, status: 'approved' | 'rejected') => {
    setActionId(id);
    try {
      const res = await api.patch(`/tuitions/admin/${id}/status`, { status });
      if (res.data.success) {
        toast.success(`Tuition post marked as ${status}.`);
        setTuitions((prev) =>
          prev.map((t) => (t._id === id ? { ...t, approvalStatus: status } : t))
        );
      }
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Failed to update approval status.');
    } finally {
      setActionId(null);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'approved':
        return (
          <Badge variant="success" className="gap-1 rounded-full text-[10px]">
            <CheckCircle2 className="h-3 w-3" />
            Approved
          </Badge>
        );
      case 'rejected':
        return (
          <Badge variant="destructive" className="gap-1 rounded-full text-[10px]">
            <XCircle className="h-3 w-3" />
            Rejected
          </Badge>
        );
      default:
        return (
          <Badge variant="warning" className="gap-1 rounded-full text-[10px]">
            <Clock className="h-3 w-3" />
            Pending
          </Badge>
        );
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto font-sans">
      <div>
        <h1 className="text-2xl sm:text-3xl font-serif font-black text-foreground tracking-tight">
          Tuition Listing Moderation
        </h1>
        <p className="text-xs sm:text-sm text-muted-foreground mt-1">
          Review, approve, or reject tutor submissions before they go live on the public Browse page.
        </p>
      </div>

      <Card className="border border-forest-900/10 dark:border-white/10 shadow-card bg-card overflow-hidden rounded-3xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-sans">
            <thead className="bg-forest-900/5 dark:bg-white/5 text-muted-foreground uppercase text-[11px] font-bold border-b border-forest-900/10 dark:border-white/10">
              <tr>
                <th className="py-4 px-5">Tuition Title & Subject</th>
                <th className="py-4 px-5">Tutor Details</th>
                <th className="py-4 px-5">Fee / Month</th>
                <th className="py-4 px-5">Schedule</th>
                <th className="py-4 px-5">Status</th>
                <th className="py-4 px-5 text-right">Moderation Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-forest-900/10 dark:divide-white/10">
              {loading ? (
                Array.from({ length: 4 }).map((_, i) => <TableRowSkeleton key={i} columns={6} />)
              ) : tuitions.length > 0 ? (
                tuitions.map((t) => (
                  <tr key={t._id} className="hover:bg-forest-900/5 dark:hover:bg-white/5 transition-colors">
                    <td className="py-4 px-5 font-semibold text-foreground max-w-xs">
                      <div className="truncate font-serif font-bold text-sm text-foreground">{t.title}</div>
                      <span className="text-[10px] text-terracotta-500 font-extrabold uppercase tracking-wide">
                        {t.subject}
                      </span>
                    </td>
                    <td className="py-4 px-5 text-muted-foreground">
                      <div className="font-bold text-foreground">{t.tutorName}</div>
                      <span className="text-[10px] text-muted-foreground">{t.tutorEmail}</span>
                    </td>
                    <td className="py-4 px-5 font-serif font-black text-sm text-foreground">
                      {formatCurrency(t.monthlyFee)}
                    </td>
                    <td className="py-4 px-5 text-muted-foreground">
                      <div className="font-medium text-foreground">{t.daysPerWeek} Days / Week</div>
                      <span className="text-[10px] text-muted-foreground">{t.mode}</span>
                    </td>
                    <td className="py-4 px-5">{getStatusBadge(t.approvalStatus)}</td>
                    <td className="py-4 px-5 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleUpdateStatus(t._id, 'approved')}
                          disabled={actionId === t._id || t.approvalStatus === 'approved'}
                          className="text-brand-700 dark:text-emerald-300 hover:bg-brand-500/15 border-emerald-500/30 gap-1 h-8 px-3 font-bold rounded-full"
                          title="Approve Listing"
                        >
                          <Check className="h-3.5 w-3.5 text-brand-600 dark:text-brand-100" />
                          Approve
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleUpdateStatus(t._id, 'rejected')}
                          disabled={actionId === t._id || t.approvalStatus === 'rejected'}
                          className="text-destructive hover:bg-destructive/15 border-destructive/30 gap-1 h-8 px-3 font-bold rounded-full"
                          title="Reject Listing"
                        >
                          <X className="h-3.5 w-3.5 text-destructive" />
                          Reject
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="py-14 text-center text-muted-foreground">
                    <CheckSquare className="mx-auto h-8 w-8 text-muted-foreground/60 mb-2" />
                    <p className="font-serif font-bold text-foreground text-base">No tuitions to display</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
