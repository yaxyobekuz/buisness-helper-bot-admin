'use client';

import { useState } from 'react';

import { Modal } from './modal';

const inputClass =
  'w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm text-slate-900 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 focus:outline-none';

const VISIBILITY = [
  { value: '', label: "Faqat faol" },
  { value: '1', label: "Faqat o'chirilgan" },
  { value: 'all', label: 'Hammasi' },
];

/**
 * "Excelga yuklash" tugmasi va filtrli modal.
 *
 * @param {{ endpoint: string, title: string, statuses?: string[] }} props
 */
export function ExportDialog({ endpoint, title, statuses }) {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState('');
  const [deleted, setDeleted] = useState('');
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');

  const filtered = Boolean(status || deleted || from || to);

  function download() {
    const params = new URLSearchParams();

    if (status) params.set('status', status);
    if (deleted) params.set('deleted', deleted);
    if (from) params.set('from', from);
    if (to) params.set('to', to);

    const query = params.toString();

    window.location.href = query ? `${endpoint}?${query}` : endpoint;
    setOpen(false);
  }

  function reset() {
    setStatus('');
    setDeleted('');
    setFrom('');
    setTo('');
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 transition-colors hover:border-brand-300 hover:bg-brand-50 hover:text-brand-800"
      >
        <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 3v12m0 0 4-4m-4 4-4-4M4 19h16" />
        </svg>
        Excelga yuklash
      </button>

      <Modal open={open} onClose={() => setOpen(false)} title={title}>
        <div className="space-y-4">
          <p className="text-sm text-slate-500">
            Filtrlarni bo'sh qoldirsangiz — barchasi yuklanadi.
          </p>

          {statuses ? (
            <div>
              <label htmlFor="export-status" className="mb-1.5 block text-sm font-medium text-slate-700">
                Holati
              </label>
              <select
                id="export-status"
                value={status}
                onChange={(event) => setStatus(event.target.value)}
                className={inputClass}
              >
                <option value="">Barchasi</option>
                {statuses.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>
          ) : null}

          <div>
            <label htmlFor="export-deleted" className="mb-1.5 block text-sm font-medium text-slate-700">
              Ko'rinishi
            </label>
            <select
              id="export-deleted"
              value={deleted}
              onChange={(event) => setDeleted(event.target.value)}
              className={inputClass}
            >
              {VISIBILITY.map((item) => (
                <option key={item.label} value={item.value}>
                  {item.label}
                </option>
              ))}
            </select>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <div>
              <label htmlFor="export-from" className="mb-1.5 block text-sm font-medium text-slate-700">
                Sanadan
              </label>
              <input
                id="export-from"
                type="date"
                value={from}
                max={to || undefined}
                onChange={(event) => setFrom(event.target.value)}
                className={inputClass}
              />
            </div>
            <div>
              <label htmlFor="export-to" className="mb-1.5 block text-sm font-medium text-slate-700">
                Sanagacha
              </label>
              <input
                id="export-to"
                type="date"
                value={to}
                min={from || undefined}
                onChange={(event) => setTo(event.target.value)}
                className={inputClass}
              />
            </div>
          </div>

          <div className="flex items-center justify-between gap-2 pt-2">
            <button
              type="button"
              onClick={reset}
              disabled={!filtered}
              className="text-sm font-medium text-slate-500 transition-colors hover:text-slate-700 disabled:opacity-40"
            >
              Filtrlarni tozalash
            </button>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-lg border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50"
              >
                Bekor qilish
              </button>
              <button
                type="button"
                onClick={download}
                className="rounded-lg bg-brand-800 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-700"
              >
                {filtered ? 'Tanlanganini yuklash' : 'Barchasini yuklash'}
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
}
