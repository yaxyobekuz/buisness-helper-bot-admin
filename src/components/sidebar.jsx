'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

import { NAV_ITEMS } from '@/lib/constants';
import { Icon } from './icons';

function isActive(pathname, href) {
  return href === '/' ? pathname === '/' : pathname.startsWith(href);
}

/**
 * @param {{ adminName: string, logoutAction: () => Promise<void> }} props
 */
export function Sidebar({ adminName, logoutAction }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Mobil sarlavha */}
      <header className="sticky top-0 z-30 flex items-center gap-3 border-b border-slate-200 bg-white px-4 py-3 lg:hidden">
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="rounded-lg p-2 text-slate-600 transition-colors hover:bg-slate-100"
          aria-label="Menyuni ochish"
        >
          <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
            <path d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <Image src="/logo.svg" alt="" width={28} height={28} unoptimized />
        <span className="font-semibold text-slate-900">Admin panel</span>
      </header>

      {open ? (
        <button
          type="button"
          aria-label="Menyuni yopish"
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-40 bg-slate-900/50 lg:hidden"
        />
      ) : null}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col bg-brand-950 transition-transform duration-200 lg:translate-x-0 ${
          open ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center gap-3 px-5 py-5">
          <Image src="/logo.svg" alt="" width={40} height={40} unoptimized className="shrink-0" />
          <p className="min-w-0 truncate text-sm font-semibold text-white">Admin panel</p>
        </div>

        <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-2">
          {NAV_ITEMS.map((item) => {
            const active = isActive(pathname, item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                  active
                    ? 'bg-brand-700 text-white'
                    : 'text-brand-200 hover:bg-brand-900 hover:text-white'
                }`}
              >
                <Icon name={item.icon} className="size-5 shrink-0" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="border-t border-brand-900 p-3">
          <p className="mb-2 truncate px-3 text-sm font-medium text-white">{adminName}</p>
          <form action={logoutAction}>
            <button
              type="submit"
              className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-brand-200 transition-colors hover:bg-brand-900 hover:text-white"
            >
              <Icon name="logout" className="size-5" />
              Chiqish
            </button>
          </form>
        </div>
      </aside>
    </>
  );
}
