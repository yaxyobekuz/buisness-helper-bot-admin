import Link from 'next/link';

import { Icon } from './icons';

/**
 * Ichki sahifalar uchun yo'l ko'rsatkichi.
 *
 * @param {{ items: { label: string, href?: string }[] }} props
 */
export function Breadcrumbs({ items }) {
  return (
    <nav aria-label="Yo'l" className="mb-4">
      <ol className="flex flex-wrap items-center gap-1 text-sm text-slate-500">
        <li>
          <Link href="/" className="transition-colors hover:text-brand-700">
            Bosh sahifa
          </Link>
        </li>
        {items.map((item, index) => (
          <li key={`${item.label}-${index}`} className="flex items-center gap-1">
            <Icon name="chevron" className="size-4 text-slate-300" />
            {item.href && index < items.length - 1 ? (
              <Link href={item.href} className="transition-colors hover:text-brand-700">
                {item.label}
              </Link>
            ) : (
              <span className="font-medium text-slate-900">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
