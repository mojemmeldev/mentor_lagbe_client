'use client';

import React, { useEffect, useState } from 'react';
import api from '@/lib/api';
import { formatDate } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { TableRowSkeleton } from '@/components/common/Skeleton';
import { toast } from 'sonner';
import { CreditCard, DollarSign, CheckCircle2 } from 'lucide-react';

export default function AdminTransactionsPage() {
  const [transactions, setTransactions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/payments/admin/transactions')
      .then((res) => {
        if (res.data.success) {
          setTransactions(res.data.data || []);
        }
      })
      .catch((err) => {
        console.error('Failed to load transactions:', err);
        toast.error('Failed to load transaction records.');
      })
      .finally(() => setLoading(false));
  }, []);

  const totalRevenue = transactions.reduce((sum, item) => sum + (item.amount || 0), 0);

  return (
    <div className="space-y-6 max-w-7xl mx-auto font-sans">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-serif font-black text-foreground tracking-tight">
            Stripe Transaction Ledger
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground mt-1">
            Complete audit trail of all Pro subscription upgrades recorded via Stripe.
          </p>
        </div>

        <div className="rounded-2xl border border-emerald-500/30 bg-brand-500/10 px-5 py-2.5 text-right shadow-soft">
          <span className="text-[10px] uppercase font-bold text-emerald-800 dark:text-emerald-300 block tracking-wider">
            Total Settled Revenue
          </span>
          <span className="text-2xl font-serif font-black text-brand-600 dark:text-brand-100">
            ${totalRevenue} USD
          </span>
        </div>
      </div>

      <Card className="border border-forest-900/10 dark:border-white/10 shadow-card bg-card overflow-hidden rounded-3xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-sans">
            <thead className="bg-forest-900/5 dark:bg-white/5 text-muted-foreground uppercase text-[11px] font-bold border-b border-forest-900/10 dark:border-white/10">
              <tr>
                <th className="py-4 px-5">Customer</th>
                <th className="py-4 px-5">Role</th>
                <th className="py-4 px-5">Plan Name</th>
                <th className="py-4 px-5">Amount</th>
                <th className="py-4 px-5">Transaction ID</th>
                <th className="py-4 px-5">Status</th>
                <th className="py-4 px-5 text-right">Paid Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-forest-900/10 dark:divide-white/10">
              {loading ? (
                Array.from({ length: 3 }).map((_, i) => <TableRowSkeleton key={i} columns={7} />)
              ) : transactions.length > 0 ? (
                transactions.map((tx) => (
                  <tr key={tx._id} className="hover:bg-forest-900/5 dark:hover:bg-white/5 transition-colors">
                    <td className="py-4 px-5 font-semibold text-foreground">
                      <div className="font-bold text-foreground text-sm font-sans">{tx.userName}</div>
                      <span className="text-[10px] text-muted-foreground">{tx.userEmail}</span>
                    </td>
                    <td className="py-4 px-5">
                      <Badge variant="outline" className="capitalize text-[10px] rounded-full px-2.5 py-0.5">
                        {tx.userRole}
                      </Badge>
                    </td>
                    <td className="py-4 px-5 font-bold text-foreground font-sans">{tx.planName}</td>
                    <td className="py-4 px-5 font-serif font-black text-sm text-brand-600 dark:text-brand-100">
                      ${tx.amount} {tx.currency}
                    </td>
                    <td className="py-4 px-5 font-mono text-[11px] text-muted-foreground max-w-xs truncate">
                      {tx.transactionId}
                    </td>
                    <td className="py-4 px-5">
                      <Badge variant="success" className="gap-1 rounded-full text-[10px]">
                        <CheckCircle2 className="h-3 w-3" />
                        Paid
                      </Badge>
                    </td>
                    <td className="py-4 px-5 text-right text-muted-foreground">
                      {formatDate(tx.paidAt)}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="py-14 text-center text-muted-foreground">
                    <CreditCard className="mx-auto h-8 w-8 text-muted-foreground/60 mb-2" />
                    <p className="font-serif font-bold text-foreground text-base">No transactions found</p>
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
