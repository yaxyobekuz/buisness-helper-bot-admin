'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import { Icon } from './icons';

/**
 * Qidiruv maydoni — yozilgan matnni URL query ga yozadi.
 *
 * @param {{ placeholder?: string }} props
 */
export function SearchField({ placeholder = 'Qidirish...' }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [value, setValue] = useState(searchParams.get('search') ?? '');

  useEffect(() => {
    // Faqat foydalanuvchi yozganda URL o'zgaradi. Bu tekshiruvsiz effekt
    // har qanday query o'zgarishida (masalan sahifa almashganda) ishga
    // tushib, `page` ni o'chirib yuborardi — pagination 1-sahifaga qaytardi.
    if (value === (searchParams.get('search') ?? '')) return undefined;

    const timer = setTimeout(() => {
      const params = new URLSearchParams(searchParams);

      if (value) params.set('search', value);
      else params.delete('search');

      params.delete('page');

      const next = params.toString();

      router.replace(next ? `${pathname}?${next}` : pathname);
    }, 350);

    return () => clearTimeout(timer);
  }, [value, pathname, router, searchParams]);

  return (
    <div className="relative">
      <Icon name="search" className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-slate-400" />
      <input
        type="search"
        value={value}
        onChange={(event) => setValue(event.target.value)}
        placeholder={placeholder}
        className="w-full rounded-lg border border-slate-200 bg-white py-2 pr-3 pl-9 text-sm text-slate-900 placeholder:text-slate-400 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 focus:outline-none sm:w-64"
      />
    </div>
  );
}
