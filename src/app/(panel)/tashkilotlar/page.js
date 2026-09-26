import Link from 'next/link';

import { ClickableRow } from '@/components/clickable-row';
import { EmptyState } from '@/components/empty-state';
import { FilterTabs } from '@/components/filter-tabs';
import { PageHeader } from '@/components/page-header';
import { Pagination } from '@/components/pagination';
import { SearchField } from '@/components/search-field';
import { apiFetch } from '@/lib/api';
import { ACTIVITY_TYPES } from '@/lib/constants';
import { formatDate, formatPhone } from '@/lib/format';

export const metadata = { title: 'Tashkilotlar' };

export default async function OrganizationsPage({ searchParams }) {
  const params = await searchParams;
  const query = new URLSearchParams();

  if (params.activityType) query.set('activityType', params.activityType);
  if (params.search) query.set('search', params.search);
  query.set('page', params.page ?? '1');

  const data = await apiFetch(`/organizations?${query.toString()}`);

  return (
    <>
      <PageHeader title="Tashkilotlar" />

      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <FilterTabs name="activityType" options={ACTIVITY_TYPES} />
        <SearchField placeholder="Nomi, rahbar, INN..." />
      </div>

      <div className="card overflow-hidden">
        {data.items.length === 0 ? (
          <EmptyState
            title="Tashkilot topilmadi"
            description="Botda ro'yxatdan o'tgan tashkilotlar shu yerda ko'rinadi."
            icon="building"
          />
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-brand-900 text-xs tracking-wide text-white uppercase">
                  <tr>
                    <th className="px-4 py-3 font-medium">Tashkilot</th>
                    <th className="px-4 py-3 font-medium">Turi</th>
                    <th className="px-4 py-3 font-medium">Rahbar</th>
                    <th className="px-4 py-3 font-medium">INN</th>
                    <th className="px-4 py-3 font-medium">Telefon</th>
                    <th className="px-4 py-3 font-medium">Arizalar</th>
                    <th className="px-4 py-3 font-medium">Sana</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {data.items.map((item) => (
                    <ClickableRow key={item._id} href={`/tashkilotlar/${item._id}`}>
                      <td className="px-4 py-3">
                        <Link
                          href={`/tashkilotlar/${item._id}`}
                          className="font-medium text-slate-900 hover:text-brand-700"
                        >
                          {item.organizationName ?? '—'}
                        </Link>
                      </td>
                      <td className="px-4 py-3 text-slate-600">{item.activityType ?? '—'}</td>
                      <td className="px-4 py-3 text-slate-600">{item.directorFullName ?? '—'}</td>
                      <td className="px-4 py-3 text-slate-600">{item.inn ?? '—'}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-slate-600">{formatPhone(item.phone)}</td>
                      <td className="px-4 py-3 text-slate-600">{item.applicationsCount}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-slate-500">{formatDate(item.createdAt)}</td>
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
