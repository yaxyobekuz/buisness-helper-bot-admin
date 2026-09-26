import Link from 'next/link';
import { notFound } from 'next/navigation';

import { Breadcrumbs } from '@/components/breadcrumbs';
import { Icon } from '@/components/icons';
import { PageHeader } from '@/components/page-header';
import { StatusBadge } from '@/components/status-badge';
import { StatusForm } from '@/components/status-form';
import { ApiRequestError, apiFetchPage } from '@/lib/api';
import { formatBytes, formatDateTime, formatPhone } from '@/lib/format';

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
  const organization = application.user;

  return (
    <>
      <Breadcrumbs items={[{ label: 'Arizalar', href: '/arizalar' }, { label: `Ariza #${application.number}` }]} />

      <PageHeader title={`Ariza #${application.number}`}>
        <StatusBadge status={application.status} />
      </PageHeader>

      <div className="grid gap-4 lg:grid-cols-3">
        <div className="space-y-4 lg:col-span-2">
          <section className="card p-5">
            <h2 className="mb-4 font-semibold text-slate-900">Murojaat</h2>
            <dl className="space-y-4">
              <div>
                <dt className="text-sm text-slate-500">Yo'nalish</dt>
                <dd className="mt-1 flex items-center gap-2 font-medium text-slate-900">
                  {application.direction?.name ?? '—'}
                  {application.direction?.status ? (
                    <StatusBadge status={application.direction.status} kind="direction" />
                  ) : null}
                </dd>
              </div>
              <div>
                <dt className="text-sm text-slate-500">Mazmuni</dt>
                <dd className="mt-1 whitespace-pre-wrap text-slate-900">{application.content}</dd>
              </div>
              <div>
                <dt className="text-sm text-slate-500">Yuborilgan sana</dt>
                <dd className="mt-1 font-medium text-slate-900">
                  {formatDateTime(application.createdAt)}
                </dd>
              </div>
            </dl>
          </section>

          <section className="card p-5">
            <h2 className="mb-4 font-semibold text-slate-900">
              Fayllar
              <span className="ml-2 text-sm font-normal text-slate-400">
                {application.files.length} ta
              </span>
            </h2>

            {application.files.length === 0 ? (
              <p className="text-sm text-slate-500">Ariza bilan fayl yuborilmagan.</p>
            ) : (
              <ul className="grid gap-2 sm:grid-cols-2">
                {application.files.map((file) => (
                  <li key={file.fileName}>
                    <a
                      href={file.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 rounded-lg border border-slate-200 p-3 transition-colors hover:border-brand-300 hover:bg-brand-50"
                    >
                      <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-500">
                        <Icon name="file" className="size-4" />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-sm font-medium text-slate-900">
                          {file.originalName ?? file.fileName}
                        </span>
                        <span className="block text-xs text-slate-400">{formatBytes(file.size)}</span>
                      </span>
                      <Icon name="download" className="size-4 shrink-0 text-slate-400" />
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </section>
        </div>

        <div className="space-y-4">
          <section className="card p-5">
            <h2 className="mb-4 font-semibold text-slate-900">Holatni o'zgartirish</h2>
            <StatusForm id={application._id} status={application.status} />
          </section>

          <section className="card p-5">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="font-semibold text-slate-900">Tashkilot</h2>
              {organization?._id ? (
                <Link
                  href={`/tashkilotlar/${organization._id}`}
                  className="text-sm font-medium text-brand-700 hover:text-brand-800"
                >
                  Batafsil
                </Link>
              ) : null}
            </div>

            <dl className="space-y-3 text-sm">
              <Row label="Nomi" value={organization?.organizationName} />
              <Row label="Faoliyat turi" value={organization?.activityType} />
              <Row label="Rahbar" value={organization?.directorFullName} />
              <Row label="INN" value={organization?.inn} />
              <Row label="Telefon" value={formatPhone(organization?.phone)} />
              <Row label="Manzil" value={organization?.address} />
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
