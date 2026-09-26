'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

/**
 * @param {{ name: string, options: string[], allLabel?: string }} props
 */
export function FilterTabs({ name, options, allLabel = 'Barchasi' }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const current = searchParams.get(name) ?? '';

  function select(value) {
    const params = new URLSearchParams(searchParams);

    if (value) params.set(name, value);
    else params.delete(name);

    params.delete('page');

    const next = params.toString();
    router.replace(next ? `${pathname}?${next}` : pathname);
  }

  const items = [{ value: '', label: allLabel }, ...options.map((option) => ({ value: option, label: option }))];

  return (
    <div className="flex flex-wrap gap-1 rounded-lg bg-slate-100 p-1">
      {items.map((item) => (
        <button
          key={item.value || 'all'}
          type="button"
          onClick={() => select(item.value)}
          className={`rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
            current === item.value
              ? 'bg-white text-brand-800 shadow-sm'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          {item.label}
        </button>
      ))}
    </div>
  );
}
