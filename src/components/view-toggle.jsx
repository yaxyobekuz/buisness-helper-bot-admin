'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

/**
 * "Faol" / "O'chirilgan" ko'rinishini almashtiradi va har birining
 * sonini ko'rsatadi — o'tmasdan turib nechtaligi bilinadi.
 *
 * @param {{ counts?: { active: number, deleted: number } }} props
 */
export function ViewToggle({ counts }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const deleted = searchParams.get('deleted') === '1';

  function select(value) {
    const params = new URLSearchParams(searchParams);

    if (value) params.set('deleted', '1');
    else params.delete('deleted');

    params.delete('page');

    const next = params.toString();
    router.replace(next ? `${pathname}?${next}` : pathname);
  }

  return (
    <div className="flex gap-1 rounded-lg bg-slate-100 p-1">
      {[
        { value: false, label: 'Faol', count: counts?.active },
        { value: true, label: "O'chirilgan", count: counts?.deleted },
      ].map((item) => (
        <button
          key={item.label}
          type="button"
          onClick={() => select(item.value)}
          className={`rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
            deleted === item.value
              ? 'bg-white text-brand-800 shadow-sm'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          {item.label}
          {typeof item.count === 'number' ? (
            <span
              className={`ml-1.5 text-xs ${
                deleted === item.value ? 'text-brand-600' : 'text-slate-400'
              }`}
            >
              {item.count}
            </span>
          ) : null}
        </button>
      ))}
    </div>
  );
}
