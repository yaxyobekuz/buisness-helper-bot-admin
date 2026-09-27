import Link from 'next/link';
import { notFound } from 'next/navigation';

import { Breadcrumbs } from '@/components/breadcrumbs';
import { EmptyState } from '@/components/empty-state';
import { PageHeader } from '@/components/page-header';
import { StatusBadge } from '@/components/status-badge';
import { ApiRequestError, apiFetchPage } from '@/lib/api';
import { formatDate, formatDateTime, formatPhone } from '@/lib/format';

export async function generateMetadata({ params }) {
  const { id } = await params;

  try {
    const data = await apiFetchPage(`/organizations/${id}`);

    return { title: data.item.organizationName ?? 'Tashkilot' };
  } catch {
    return { title: 'Tashkilot' };
  }
}

export default async function OrganizationDetailPage({ params }) {
  const { id } = await params;

  let data;

  try {
    data = await apiFetchPage(`/organizations/${id}`);
  } catch (error) {
    if (error instanceof ApiRequestError && (error.status === 404 || error.status === 400)) {
      notFound();
    }

    throw error;
  }

  const organization = data.item;

  return (
    <>
      <Breadcrumbs
        items={[
          { label: 'Tashkilotlar', href: '/tashkilotlar' },
          { label: organization.organizationName ?? 'Tashkilot' },
        ]}
      />

      <PageHeader title={organization.organizationName ?? 'Tashkilot'} />

      <div className="grid gap-4 lg:grid-cols-3">
        <section className="card p-5">
          <h2 className="mb-4 font-semibold text-slate-900">Ma'lumotlar</h2>
          <dl className="space-y-3 text-sm">
            <Row label="Faoliyat turi" value={organization.activityType} />
            <Row label="Rahbar" value={organization.directorFullName} />
            <Row label="INN" value={organization.inn} />
            <Row label="Telefon" value={formatPhone(organization.phone)} />
            <Row label="Manzil" value={organization.address} />
            <Row label="Telegram" value={organization.username ? `@${organization.username}` : null} />
            <Row label="Ro'yxatdan o'tgan" value={formatDate(organization.createdAt)} />
          </dl>
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
            <EmptyState title="Ariza yo'q" description="Bu tashkilot hali ariza yubormagan." />
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
                      <p className="truncate text-sm font-medium text-slate-900">
                        {item.direction?.name ?? '—'}
                      </p>
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
