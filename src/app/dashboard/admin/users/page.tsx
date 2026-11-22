'use client';

import React, { useEffect, useState } from 'react';
import api from '@/lib/api';
import { formatDate } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { TableRowSkeleton } from '@/components/common/Skeleton';
import { toast } from 'sonner';
import { Users, Shield, UserCheck, AlertCircle } from 'lucide-react';

export default function AdminUsersPage() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const fetchUsers = () => {
    setLoading(true);
    api.get('/users/admin/all')
      .then((res) => {
        if (res.data.success) {
          setUsers(res.data.data || []);
        }
      })
      .catch((err) => {
        console.error('Failed to load users:', err);
        toast.error('Failed to load users list.');
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleRoleChange = async (userId: string, newRole: string) => {
    setUpdatingId(userId);
    try {
      const res = await api.patch(`/users/admin/${userId}/role`, { role: newRole });
      if (res.data.success) {
        toast.success(`Role updated to ${newRole}`);
        setUsers((prev) =>
          prev.map((u) => (u._id === userId ? { ...u, role: newRole } : u))
        );
      }
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Failed to update user role.');
    } finally {
      setUpdatingId(null);
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto font-sans">
      <div>
        <h1 className="text-2xl sm:text-3xl font-serif font-black text-foreground tracking-tight">
          User Management
        </h1>
        <p className="text-xs sm:text-sm text-muted-foreground mt-1">
          View all registered students, tutors, and administrators. Promote or adjust roles dynamically.
        </p>
      </div>

      <Card className="border border-forest-900/10 dark:border-white/10 shadow-card bg-card overflow-hidden rounded-3xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-sans">
            <thead className="bg-forest-900/5 dark:bg-white/5 text-muted-foreground uppercase text-[11px] font-bold border-b border-forest-900/10 dark:border-white/10">
              <tr>
                <th className="py-4 px-5">User</th>
                <th className="py-4 px-5">Email</th>
                <th className="py-4 px-5">Plan</th>
                <th className="py-4 px-5">Current Role</th>
                <th className="py-4 px-5">Joined Date</th>
                <th className="py-4 px-5 text-right">Change Role</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-forest-900/10 dark:divide-white/10">
              {loading ? (
                Array.from({ length: 4 }).map((_, i) => <TableRowSkeleton key={i} columns={6} />)
              ) : users.length > 0 ? (
                users.map((u) => (
                  <tr key={u._id} className="hover:bg-forest-900/5 dark:hover:bg-white/5 transition-colors">
                    <td className="py-4 px-5 font-semibold text-foreground">
                      <div className="flex items-center gap-3">
                        <img
                          src={u.image || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80'}
                          alt={u.name}
                          className="h-9 w-9 rounded-full object-cover border border-forest-900/15 dark:border-white/15"
                        />
                        <span className="font-bold text-foreground text-sm font-sans">{u.name}</span>
                      </div>
                    </td>
                    <td className="py-4 px-5 text-muted-foreground">{u.email}</td>
                    <td className="py-4 px-5">
                      {u.plan === 'pro' ? (
                        <Badge variant="pro" className="text-[10px] px-2.5 py-0.5">
                          PRO
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="text-[10px] rounded-full px-2.5 py-0.5">
                          FREE
                        </Badge>
                      )}
                    </td>
                    <td className="py-4 px-5">
                      <Badge
                        variant={u.role === 'admin' ? 'destructive' : u.role === 'tutor' ? 'secondary' : 'default'}
                        className="capitalize font-bold rounded-full text-[10px] px-2.5 py-0.5"
                      >
                        {u.role}
                      </Badge>
                    </td>
                    <td className="py-4 px-5 text-muted-foreground">
                      {formatDate(u.createdAt)}
                    </td>
                    <td className="py-4 px-5 text-right">
                      <select
                        value={u.role}
                        disabled={updatingId === u._id}
                        onChange={(e) => handleRoleChange(u._id, e.target.value)}
                        className="h-8 rounded-full border border-forest-900/15 dark:border-white/15 bg-background px-3 text-xs font-bold text-foreground focus:outline-none focus:ring-2 focus:ring-terracotta-500 shadow-sm"
                      >
                        <option value="student">Student</option>
                        <option value="tutor">Tutor</option>
                        <option value="admin">Admin</option>
                      </select>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="py-14 text-center text-muted-foreground">
                    <Users className="mx-auto h-8 w-8 text-muted-foreground/60 mb-2" />
                    <p className="font-serif font-bold text-foreground text-base">No users found</p>
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
