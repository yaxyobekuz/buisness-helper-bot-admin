import Link from 'next/link';
import { notFound } from 'next/navigation';

import { Breadcrumbs } from '@/components/breadcrumbs';
import { PageHeader } from '@/components/page-header';
import { StatusBadge } from '@/components/status-badge';
import { StatusForm } from '@/components/status-form';
import { ApiRequestError, apiFetchPage } from '@/lib/api';
import { formatDateTime, formatPhone } from '@/lib/format';

export async function generateMetadata({ params }) {
  const { id } = await params;

  return { title: `Ariza — ${id.slice(-6)}` };
}

export default async function ApplicationDetailPage({ params }) {
  const { id } = await params;

  let data;

  try {
    data = await apiFetchPage(`/applications/${id}`);
  } catch (error) {
    if (error instanceof ApiRequestError && (error.status === 404 || error.status === 400)) {
      notFound();
    }

    throw error;
  }

  const application = data.item;
  const entrepreneur = application.user;

  return (
    <>
      <Breadcrumbs items={[{ label: 'Arizalar', href: '/arizalar' }, { label: `Ariza #${application.number}` }]} />

      <PageHeader title={`Ariza #${application.number}`}>
        <StatusBadge status={application.status} />
      </PageHeader>

      <div className="grid gap-4 lg:grid-cols-3">
        <section className="card p-5 lg:col-span-2">
          <h2 className="mb-4 font-semibold text-slate-900">Murojaat</h2>
          <dl className="space-y-4">
            <div>
              <dt className="text-sm text-slate-500">F.I.Sh.</dt>
              <dd className="mt-1 font-medium text-slate-900">{application.fullName ?? '—'}</dd>
            </div>
            <div>
              <dt className="text-sm text-slate-500">Manzil</dt>
              <dd className="mt-1 font-medium text-slate-900">{application.address ?? '—'}</dd>
            </div>
            <div>
              <dt className="text-sm text-slate-500">Telefon</dt>
              <dd className="mt-1 font-medium text-slate-900">{formatPhone(application.phone)}</dd>
            </div>
            <div>
              <dt className="text-sm text-slate-500">Mazmuni</dt>
              <dd className="mt-1 whitespace-pre-wrap text-slate-900">{application.content}</dd>
            </div>
            <div>
              <dt className="text-sm text-slate-500">Yuborilgan sana</dt>
              <dd className="mt-1 font-medium text-slate-900">{formatDateTime(application.createdAt)}</dd>
            </div>
          </dl>
        </section>

        <div className="space-y-4">
          <section className="card p-5">
            <h2 className="mb-4 font-semibold text-slate-900">Holatni o'zgartirish</h2>
            <StatusForm id={application._id} status={application.status} />
          </section>

          <section className="card p-5">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="font-semibold text-slate-900">Tadbirkor</h2>
              {entrepreneur?._id ? (
                <Link
                  href={`/tadbirkorlar/${entrepreneur._id}`}
                  className="text-sm font-medium text-brand-700 hover:text-brand-800"
                >
                  Batafsil
                </Link>
              ) : null}
            </div>

            <dl className="space-y-3 text-sm">
              <Row
                label="Telegram"
                value={[entrepreneur?.firstName, entrepreneur?.lastName].filter(Boolean).join(' ')}
              />
              <Row label="Username" value={entrepreneur?.username ? `@${entrepreneur.username}` : null} />
              <Row label="Telegram ID" value={entrepreneur?.telegramId} />
            </dl>
          </section>
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
