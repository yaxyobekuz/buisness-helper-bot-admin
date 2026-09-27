import Link from 'next/link';
import { notFound } from 'next/navigation';

import { Breadcrumbs } from '@/components/breadcrumbs';
import { EmptyState } from '@/components/empty-state';
import { PageHeader } from '@/components/page-header';
import { StatusBadge } from '@/components/status-badge';
import { ApiRequestError, apiFetchPage } from '@/lib/api';
import { formatDate, formatDateTime, formatPhone } from '@/lib/format';

function displayName(entrepreneur) {
  return (
    entrepreneur.fullName ||
    [entrepreneur.firstName, entrepreneur.lastName].filter(Boolean).join(' ') ||
    'Tadbirkor'
  );
}

export async function generateMetadata({ params }) {
  const { id } = await params;

  try {
    const data = await apiFetchPage(`/entrepreneurs/${id}`);

    return { title: displayName(data.item) };
  } catch {
    return { title: 'Tadbirkor' };
  }
}

export default async function EntrepreneurDetailPage({ params }) {
  const { id } = await params;

  let data;

  try {
    data = await apiFetchPage(`/entrepreneurs/${id}`);
  } catch (error) {
    if (error instanceof ApiRequestError && (error.status === 404 || error.status === 400)) {
      notFound();
    }

    throw error;
  }

  const entrepreneur = data.item;

  return (
    <>
      <Breadcrumbs
        items={[{ label: 'Tadbirkorlar', href: '/tadbirkorlar' }, { label: displayName(entrepreneur) }]}
      />

      <PageHeader title={displayName(entrepreneur)} />

      <div className="grid gap-4 lg:grid-cols-3">
        <section className="card p-5">
          <h2 className="mb-4 font-semibold text-slate-900">Ma'lumotlar</h2>
          <dl className="space-y-3 text-sm">
            <Row label="F.I.Sh." value={entrepreneur.fullName} />
            <Row label="Telefon" value={formatPhone(entrepreneur.phone)} />
            <Row label="Manzil" value={entrepreneur.address} />
            <Row
              label="Telegram"
              value={[entrepreneur.firstName, entrepreneur.lastName].filter(Boolean).join(' ')}
            />
            <Row label="Username" value={entrepreneur.username ? `@${entrepreneur.username}` : null} />
            <Row label="Telegram ID" value={entrepreneur.telegramId} />
            <Row label="Qo'shilgan" value={formatDate(entrepreneur.createdAt)} />
          </dl>
          <p className="mt-4 text-xs text-slate-400">
            F.I.Sh., telefon va manzil oxirgi arizadagi ma'lumotlardan olinadi.
          </p>
        </section>

        <div className="card overflow-hidden lg:col-span-2">
          <div className="border-b border-slate-200 px-5 py-4">
            <h2 className="font-semibold text-slate-900">
              Arizalar
              <span className="ml-2 text-sm font-normal text-slate-400">
                {data.applications.length} ta
              </span>
            </h2>
          </div>

          {data.applications.length === 0 ? (
            <EmptyState title="Ariza yo'q" description="Bu tadbirkor hali ariza yubormagan." />
          ) : (
            <ul className="divide-y divide-slate-100">
              {data.applications.map((item) => (
                <li key={item._id}>
                  <Link
                    href={`/arizalar/${item._id}`}
                    className="flex items-center gap-4 px-5 py-4 transition-colors hover:bg-slate-50"
                  >
                    <span className="w-12 shrink-0 text-sm font-semibold text-slate-400">#{item.number}</span>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium text-slate-900">{item.fullName}</p>
                      <p className="truncate text-sm text-slate-500">{item.content}</p>
                    </div>
                    <span className="hidden text-sm text-slate-400 sm:block">
                      {formatDateTime(item.createdAt)}
                    </span>
                    <StatusBadge status={item.status} />
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </>
  );
}

function Row({ label, value }) {
  return (
    <div className="flex justify-between gap-3">
      <dt className="shrink-0 text-slate-500">{label}</dt>
      <dd className="text-right font-medium text-slate-900">{value || '—'}</dd>
    </div>
  );
}
