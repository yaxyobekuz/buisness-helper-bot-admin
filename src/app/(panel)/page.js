import Link from 'next/link';

import { DailyChart } from '@/components/daily-chart';
import { EmptyState } from '@/components/empty-state';
import { PageHeader } from '@/components/page-header';
import { StatCard } from '@/components/stat-card';
import { StatusBadge } from '@/components/status-badge';
import { apiFetchPage } from '@/lib/api';
import { formatDateTime } from '@/lib/format';

export const metadata = { title: 'Bosh sahifa' };

export default async function DashboardPage() {
  const stats = await apiFetchPage('/stats/overview');

  return (
    <>
      <PageHeader title="Bosh sahifa" />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Jami arizalar" value={stats.totals.applications} icon="document" />
        <StatCard label="Tashkilotlar" value={stats.totals.organizations} icon="building" />
        <StatCard
          label="Faol yo'nalishlar"
          value={stats.totals.activeDirections}
          icon="settings"
          hint={`Jami ${stats.totals.directions} ta`}
        />
        <StatCard
          label="Yangi yo'nalishlar"
          value={stats.totals.newDirections}
          icon="clock"
          hint="Tasdiqlash kutilmoqda"
        />
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-3">
        {stats.byStatus.map((item) => (
          <div key={item.status} className="card flex items-center justify-between p-5">
            <div>
              <StatusBadge status={item.status} />
              <p className="mt-3 text-2xl font-semibold text-slate-900">{item.count}</p>
            </div>
            <Link
              href={`/arizalar?status=${encodeURIComponent(item.status)}`}
              className="text-sm font-medium text-brand-700 transition-colors hover:text-brand-800"
            >
              Ko'rish
            </Link>
          </div>
        ))}
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <DailyChart data={stats.daily} />
        </div>

        <div className="card p-5">
          <h2 className="mb-4 font-semibold text-slate-900">Ko'p murojaat qilingan yo'nalishlar</h2>
          {stats.byDirection.length === 0 ? (
            <p className="text-sm text-slate-500">Hozircha ma'lumot yo'q.</p>
          ) : (
            <ul className="space-y-3">
              {stats.byDirection.map((item) => {
                const max = stats.byDirection[0].count || 1;

                return (
                  <li key={item.name}>
                    <div className="mb-1 flex items-baseline justify-between gap-2">
                      <span className="truncate text-sm text-slate-700">{item.name}</span>
                      <span className="text-sm font-medium text-slate-900">{item.count}</span>
                    </div>
                    <div className="h-1.5 overflow-hidden rounded-full bg-slate-100">
                      <div
                        className="h-full rounded-full bg-brand-600"
                        style={{ width: `${(item.count / max) * 100}%` }}
                      />
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </div>

      <div className="card mt-4">
        <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
          <h2 className="font-semibold text-slate-900">So'nggi arizalar</h2>
          <Link href="/arizalar" className="text-sm font-medium text-brand-700 hover:text-brand-800">
            Barchasi
          </Link>
        </div>

        {stats.recent.length === 0 ? (
          <EmptyState title="Hozircha ariza yo'q" description="Botga kelgan arizalar shu yerda ko'rinadi." />
        ) : (
          <ul className="divide-y divide-slate-100">
            {stats.recent.map((item) => (
              <li key={item._id}>
                <Link
                  href={`/arizalar/${item._id}`}
                  className="flex items-center gap-4 px-5 py-4 transition-colors hover:bg-slate-50"
                >
                  <span className="w-12 shrink-0 text-sm font-semibold text-slate-400">#{item.number}</span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-slate-900">{item.direction ?? '—'}</p>
                    <p className="truncate text-sm text-slate-500">{item.organization ?? '—'}</p>
                  </div>
                  <span className="hidden text-sm text-slate-400 sm:block">{formatDateTime(item.createdAt)}</span>
                  <StatusBadge status={item.status} />
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}
