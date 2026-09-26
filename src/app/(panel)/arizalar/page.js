import Link from 'next/link';

import { ClickableRow } from '@/components/clickable-row';
import { EmptyState } from '@/components/empty-state';
import { FilterTabs } from '@/components/filter-tabs';
import { PageHeader } from '@/components/page-header';
import { Pagination } from '@/components/pagination';
import { SearchField } from '@/components/search-field';
import { StatusBadge } from '@/components/status-badge';
import { apiFetchPage } from '@/lib/api';
import { APPLICATION_STATUSES } from '@/lib/constants';
import { formatDateTime } from '@/lib/format';

export const metadata = { title: 'Arizalar' };

export default async function ApplicationsPage({ searchParams }) {
  const params = await searchParams;
  const query = new URLSearchParams();

  if (params.status) query.set('status', params.status);
  if (params.search) query.set('search', params.search);
  query.set('page', params.page ?? '1');

  const data = await apiFetchPage(`/applications?${query.toString()}`);

  return (
    <>
      <PageHeader title="Arizalar" />

      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <FilterTabs name="status" options={APPLICATION_STATUSES} />
        <SearchField placeholder="Raqam yoki matn bo'yicha..." />
      </div>

      <div className="card overflow-hidden">
        {data.items.length === 0 ? (
          <EmptyState
            title="Ariza topilmadi"
            description="Filtrlarni o'zgartiring yoki botga yangi ariza kelishini kuting."
          />
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-brand-900 text-xs tracking-wide text-white uppercase">
                  <tr>
                    <th className="px-4 py-3 font-medium">№</th>
                    <th className="px-4 py-3 font-medium">Yo'nalish</th>
                    <th className="px-4 py-3 font-medium">Tashkilot</th>
                    <th className="px-4 py-3 font-medium">Mazmuni</th>
                    <th className="px-4 py-3 font-medium">Sana</th>
                    <th className="px-4 py-3 font-medium">Holat</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {data.items.map((item) => (
                    <ClickableRow key={item._id} href={`/arizalar/${item._id}`}>
                      <td className="px-4 py-3 font-semibold text-slate-400">
                        <Link href={`/arizalar/${item._id}`} className="hover:text-brand-700">
                          #{item.number}
                        </Link>
                      </td>
                      <td className="px-4 py-3 font-medium text-slate-900">
                        {item.direction?.name ?? '—'}
                      </td>
                      <td className="px-4 py-3 text-slate-600">
                        {item.user?.organizationName ?? '—'}
                      </td>
                      <td className="max-w-xs truncate px-4 py-3 text-slate-600">{item.content}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-slate-500">
                        {formatDateTime(item.createdAt)}
                      </td>
                      <td className="px-4 py-3">
                        <StatusBadge status={item.status} />
                      </td>
                    </ClickableRow>
                  ))}
                </tbody>
              </table>
            </div>
            <Pagination {...data.pagination} />
          </>
        )}
      </div>
    </>
  );
}
