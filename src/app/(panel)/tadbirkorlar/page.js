import Link from 'next/link';

import { ClickableRow } from '@/components/clickable-row';
import { EmptyState } from '@/components/empty-state';
import { PageHeader } from '@/components/page-header';
import { Pagination } from '@/components/pagination';
import { SearchField } from '@/components/search-field';
import { apiFetchPage } from '@/lib/api';
import { formatDate, formatPhone } from '@/lib/format';

export const metadata = { title: 'Tadbirkorlar' };

export default async function EntrepreneursPage({ searchParams }) {
  const params = await searchParams;
  const query = new URLSearchParams();

  if (params.search) query.set('search', params.search);
  query.set('page', params.page ?? '1');

  const data = await apiFetchPage(`/entrepreneurs?${query.toString()}`);

  return (
    <>
      <PageHeader title="Tadbirkorlar" />

      <div className="mb-4 flex justify-end">
        <SearchField placeholder="F.I.Sh., username, telefon..." />
      </div>

      <div className="card overflow-hidden">
        {data.items.length === 0 ? (
          <EmptyState
            title="Tadbirkor topilmadi"
            description="Botga /start bosgan foydalanuvchilar shu yerda ko'rinadi."
            icon="user"
          />
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-brand-900 text-xs tracking-wide text-white uppercase">
                  <tr>
                    <th className="px-4 py-3 font-medium">F.I.Sh.</th>
                    <th className="px-4 py-3 font-medium">Telegram</th>
                    <th className="px-4 py-3 font-medium">Telefon</th>
                    <th className="px-4 py-3 font-medium">Arizalar</th>
                    <th className="px-4 py-3 font-medium">Qo'shilgan</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {data.items.map((item) => {
                    const telegramName =
                      [item.firstName, item.lastName].filter(Boolean).join(' ') || '—';

                    return (
                      <ClickableRow key={item._id} href={`/tadbirkorlar/${item._id}`}>
                        <td className="px-4 py-3">
                          <Link
                            href={`/tadbirkorlar/${item._id}`}
                            className="font-medium text-slate-900 hover:text-brand-700"
                          >
                            {item.fullName ?? telegramName}
                          </Link>
                        </td>
                        <td className="px-4 py-3 text-slate-600">
                          {item.username ? `@${item.username}` : telegramName}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-slate-600">
                          {formatPhone(item.phone)}
                        </td>
                        <td className="px-4 py-3 text-slate-600">{item.applicationsCount}</td>
                        <td className="px-4 py-3 whitespace-nowrap text-slate-500">
                          {formatDate(item.createdAt)}
                        </td>
                      </ClickableRow>
                    );
                  })}
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
