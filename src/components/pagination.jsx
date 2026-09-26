'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

/**
 * @param {{ page: number, pages: number, total: number }} props
 */
export function Pagination({ page, pages, total }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  if (pages <= 1) {
    return (
      <div className="border-t border-slate-200 px-4 py-3 text-sm text-slate-500">
        Jami: {total} ta
      </div>
    );
  }

  function go(next) {
    const params = new URLSearchParams(searchParams);
    params.set('page', String(next));
    router.replace(`${pathname}?${params.toString()}`);
  }

  return (
    <div className="flex items-center justify-between border-t border-slate-200 px-4 py-3">
      <p className="text-sm text-slate-500">
        Jami: {total} ta — {page}/{pages} sahifa
      </p>
      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => go(page - 1)}
          disabled={page <= 1}
          className="rounded-lg border border-slate-200 px-3 py-1.5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
        >
          Oldingi
        </button>
        <button
          type="button"
          onClick={() => go(page + 1)}
          disabled={page >= pages}
          className="rounded-lg border border-slate-200 px-3 py-1.5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
        >
          Keyingi
        </button>
      </div>
    </div>
  );
}
