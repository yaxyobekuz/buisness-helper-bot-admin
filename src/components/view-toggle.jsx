'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

/** "Faol" / "O'chirilgan" ko'rinishini almashtiradi. */
export function ViewToggle() {
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
        { value: false, label: 'Faol' },
        { value: true, label: "O'chirilgan" },
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
        </button>
      ))}
    </div>
  );
}
