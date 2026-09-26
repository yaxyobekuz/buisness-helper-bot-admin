'use client';

import { useRouter } from 'next/navigation';

/**
 * Butun qatori bosiladigan jadval qatori.
 *
 * Qator ichidagi haqiqiy havola/tugma bosilsa aralashmaydi, Cmd/Ctrl yoki
 * o'rta tugma bilan bosilganda yangi oynada ochadi, klaviaturadan Enter va
 * Probel ishlaydi.
 *
 * @param {{ href: string, children: React.ReactNode, className?: string }} props
 */
export function ClickableRow({ href, children, className = '' }) {
  const router = useRouter();

  const fromInteractive = (event) =>
    event.target instanceof Element &&
    event.target.closest('a, button, input, select, textarea, label');

  function handleClick(event) {
    if (fromInteractive(event)) return;

    if (event.metaKey || event.ctrlKey || event.shiftKey || event.button === 1) {
      window.open(href, '_blank', 'noopener,noreferrer');
      return;
    }

    router.push(href);
  }

  function handleKeyDown(event) {
    if (fromInteractive(event)) return;

    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      router.push(href);
    }
  }

  return (
    <tr
      tabIndex={0}
      onClick={handleClick}
      onAuxClick={handleClick}
      onKeyDown={handleKeyDown}
      onMouseEnter={() => router.prefetch(href)}
      className={`cursor-pointer transition-colors hover:bg-slate-50 focus:outline-none focus-visible:bg-brand-50 ${className}`}
    >
      {children}
    </tr>
  );
}
