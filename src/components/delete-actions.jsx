'use client';

import { useState, useTransition } from 'react';

import { Modal } from './modal';

/**
 * Soft delete / tiklash tugmalari. O'chirish tasdiqlash oynasi orqali.
 *
 * @param {{
 *   id: string,
 *   deleted: boolean,
 *   title: string,
 *   warning: string,
 *   onDelete: (id: string) => Promise<{ error?: string } | void>,
 *   onRestore: (id: string) => Promise<{ error?: string } | void>,
 * }} props
 */
export function DeleteActions({ id, deleted, title, warning, onDelete, onRestore }) {
  const [pending, startTransition] = useTransition();
  const [confirming, setConfirming] = useState(false);
  const [error, setError] = useState(null);

  function run(action) {
    startTransition(async () => {
      const result = await action(id);

      if (result?.error) {
        setError(result.error);
        return;
      }

      setError(null);
      setConfirming(false);
    });
  }

  if (deleted) {
    return (
      <div className="flex flex-col items-end gap-1">
        <button
          type="button"
          disabled={pending}
          onClick={() => run(onRestore)}
          className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-emerald-700 disabled:opacity-60"
        >
          {pending ? 'Tiklanmoqda...' : 'Tiklash'}
        </button>
        {error ? <p className="text-xs text-red-600">{error}</p> : null}
      </div>
    );
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setConfirming(true)}
        className="rounded-lg border border-red-200 px-4 py-2 text-sm font-medium text-red-700 transition-colors hover:border-red-300 hover:bg-red-50"
      >
        O'chirish
      </button>

      <Modal open={confirming} onClose={() => setConfirming(false)} title={title}>
        <p className="text-sm text-slate-600">{warning}</p>

        {error ? (
          <p className="mt-3 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>
        ) : null}

        <div className="mt-5 flex justify-end gap-2">
          <button
            type="button"
            onClick={() => setConfirming(false)}
            className="rounded-lg border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50"
          >
            Bekor qilish
          </button>
          <button
            type="button"
            disabled={pending}
            onClick={() => run(onDelete)}
            className="rounded-lg bg-red-600 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-red-700 disabled:opacity-60"
          >
            {pending ? "O'chirilmoqda..." : "Ha, o'chirish"}
          </button>
        </div>
      </Modal>
    </>
  );
}
