'use client';

import React, { useEffect, useState } from 'react';
import api from '@/lib/api';
import { formatDate } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { DashboardTableSkeleton } from '@/components/common/Skeleton';
import { toast } from 'sonner';
import {
  Users,
  CheckCircle2,
  XCircle,
  Phone,
  Mail,
  Calendar,
  AlertCircle,
  Check,
  X,
} from 'lucide-react';

export default function TutorApplicantsPage() {
  const [applicants, setApplicants] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const fetchApplicants = () => {
    setLoading(true);
    api.get('/applications/tutor/applicants')
      .then((res) => {
        if (res.data.success) {
          setApplicants(res.data.data || []);
        }
      })
      .catch((err) => {
        console.error('Failed to load applicants:', err);
        toast.error('Failed to load applicants list.');
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchApplicants();
  }, []);

  const handleUpdateStatus = async (id: string, status: 'accepted' | 'rejected') => {
    setUpdatingId(id);
    try {
      const res = await api.patch(`/applications/tutor/${id}/status`, { status });
      if (res.data.success) {
        toast.success(`Application marked as ${status}.`);
        setApplicants((prev) =>
          prev.map((app) => (app._id === id ? { ...app, status } : app))
        );
      }
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Failed to update status.');
    } finally {
      setUpdatingId(null);
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
    <div className="space-y-6 max-w-7xl mx-auto font-sans">
      <div>
        <h1 className="text-2xl sm:text-3xl font-serif font-black text-foreground tracking-tight">
          Manage Student Applicants
        </h1>
        <p className="text-xs sm:text-sm text-muted-foreground mt-1">
          Review incoming student bookings for your batches and accept or decline requests.
        </p>
      </div>

      {loading ? (
        <DashboardTableSkeleton
          columns={6}
          rows={4}
          headers={[
            'Student Info',
            'Applied Tuition',
            'Preferred Schedule',
            'Student Note',
            'Status',
            'Review Action',
          ]}
        />
      ) : (
        <Card className="border border-forest-900/10 dark:border-white/10 shadow-card bg-card overflow-hidden rounded-3xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-sans">
              <thead className="bg-forest-900/5 dark:bg-white/5 text-muted-foreground uppercase text-[11px] font-bold border-b border-forest-900/10 dark:border-white/10">
                <tr>
                  <th className="py-4 px-5">Student Info</th>
                  <th className="py-4 px-5">Applied Tuition</th>
                  <th className="py-4 px-5">Preferred Schedule</th>
                  <th className="py-4 px-5">Student Note</th>
                  <th className="py-4 px-5">Status</th>
                  <th className="py-4 px-5 text-right">Review Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-forest-900/10 dark:divide-white/10">
                {applicants.length > 0 ? (
                  applicants.map((item) => (
                    <tr key={item._id} className="hover:bg-forest-900/5 dark:hover:bg-white/5 transition-colors">
                      <td className="py-4 px-5 font-semibold text-foreground">
                        <div className="text-sm font-bold text-foreground font-sans">{item.studentName}</div>
                        <div className="flex items-center gap-1.5 text-muted-foreground mt-0.5">
                          <Mail className="h-3 w-3 text-terracotta-500" />
                          <span>{item.studentEmail}</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-muted-foreground mt-0.5">
                          <Phone className="h-3 w-3 text-brand-600 dark:text-brand-100" />
                          <span>{item.studentPhone}</span>
                        </div>
                      </td>
                      <td className="py-4 px-5 max-w-xs">
                        <div className="font-serif font-bold text-sm text-foreground truncate">{item.tuitionTitle}</div>
                        <span className="text-[10px] text-terracotta-500 font-extrabold uppercase tracking-wide">
                          {item.subject}
                        </span>
                      </td>
                      <td className="py-4 px-5 text-muted-foreground">
                        <div className="flex items-center gap-1.5 text-foreground font-medium">
                          <Calendar className="h-3.5 w-3.5 text-terracotta-500 shrink-0" />
                          <span>{item.preferredSchedule}</span>
                        </div>
                        <span className="text-[10px] text-muted-foreground mt-0.5 block">
                          Applied {formatDate(item.appliedAt)}
                        </span>
                      </td>
                      <td className="py-4 px-5 text-muted-foreground max-w-xs">
                        <p className="line-clamp-2 italic text-xs leading-relaxed">
                          {item.studentNote ? `"${item.studentNote}"` : 'No custom note.'}
                        </p>
                      </td>
                      <td className="py-4 px-5">{getStatusBadge(item.status)}</td>
                      <td className="py-4 px-5 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleUpdateStatus(item._id, 'accepted')}
                            disabled={updatingId === item._id || item.status === 'accepted'}
                            className="text-brand-700 dark:text-emerald-300 hover:bg-brand-500/15 border-emerald-500/30 gap-1 h-8 px-3 font-bold rounded-full"
                            title="Accept Applicant"
                          >
                            <Check className="h-3.5 w-3.5 text-brand-600 dark:text-brand-100" />
                            Accept
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleUpdateStatus(item._id, 'rejected')}
                            disabled={updatingId === item._id || item.status === 'rejected'}
                            className="text-destructive hover:bg-destructive/15 border-destructive/30 gap-1 h-8 px-3 font-bold rounded-full"
                            title="Reject Applicant"
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
                      <Users className="mx-auto h-8 w-8 text-muted-foreground/60 mb-2" />
                      <p className="font-serif font-bold text-foreground text-base">No student applications yet</p>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        When students apply for your tuition postings, they will appear here.
                      </p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </Card>
      )}
    </div>
  );
}
