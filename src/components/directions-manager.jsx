'use client';

import { useActionState, useState, useTransition } from 'react';

import { createDirectionAction, updateDirectionAction } from '@/app/actions/data';
import { DIRECTION_STATUSES } from '@/lib/constants';
import { EmptyState } from './empty-state';
import { FormMessage } from './form-message';
import { Modal } from './modal';
import { StatusBadge } from './status-badge';

const initialState = { error: null, success: null };

const inputClass =
  'w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 focus:outline-none';

function EditDialog({ direction, onClose }) {
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState(null);

  function handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    startTransition(async () => {
      const result = await updateDirectionAction(null, formData);

      if (result?.error) {
        setError(result.error);
        return;
      }

      setError(null);
      onClose();
    });
  }

  return (
    <Modal open={Boolean(direction)} onClose={onClose} title="Yo'nalishni tahrirlash">
      {direction ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="hidden" name="id" value={direction._id} />

          <div>
            <label htmlFor="direction-name" className="mb-1.5 block text-sm font-medium text-slate-700">
              Nomi
            </label>
            <input
              id="direction-name"
              name="name"
              defaultValue={direction.name}
              required
              autoFocus
              className={inputClass}
            />
          </div>

          <div>
            <label htmlFor="direction-status" className="mb-1.5 block text-sm font-medium text-slate-700">
              Holati
            </label>
            <select
              id="direction-status"
              name="status"
              defaultValue={direction.status}
              className={inputClass}
            >
              {DIRECTION_STATUSES.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
            <p className="mt-1.5 text-xs text-slate-500">
              Botda faqat «Faol» yo'nalishlar ko'rsatiladi.
            </p>
          </div>

          <FormMessage state={{ error }} />

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50"
            >
              Bekor qilish
            </button>
            <button
              type="submit"
              disabled={pending}
              className="rounded-lg bg-brand-800 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-700 disabled:opacity-60"
            >
              {pending ? 'Saqlanmoqda...' : 'Saqlash'}
            </button>
          </div>
        </form>
      ) : null}
    </Modal>
  );
}

/**
 * @param {{ directions: any[] }} props
 */
export function DirectionsManager({ directions }) {
  const [state, formAction, pending] = useActionState(createDirectionAction, initialState);
  const [editing, setEditing] = useState(null);

  return (
    <div className="space-y-4">
      <form action={formAction} className="card flex flex-wrap items-start gap-3 p-4">
        <div className="min-w-48 flex-1">
          <input
            key={state?.token ?? 'new'}
            name="name"
            placeholder="Yangi yo'nalish nomi"
            required
            className={inputClass}
          />
          {state?.error ? <p className="mt-1.5 text-sm text-red-600">{state.error}</p> : null}
          {state?.success ? <p className="mt-1.5 text-sm text-emerald-600">{state.success}</p> : null}
        </div>
        <button
          type="submit"
          disabled={pending}
          className="rounded-lg bg-brand-800 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-700 disabled:opacity-60"
        >
          {pending ? "Qo'shilmoqda..." : "Qo'shish"}
        </button>
      </form>

      <div className="card overflow-hidden">
        {directions.length === 0 ? (
          <EmptyState
            title="Yo'nalish yo'q"
            description="Yuqoridagi maydon orqali birinchi yo'nalishni qo'shing — u darhol faol bo'ladi."
            icon="settings"
          />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-brand-900 text-xs tracking-wide text-white uppercase">
                <tr>
                  <th className="px-4 py-3 font-medium">Nomi</th>
                  <th className="px-4 py-3 font-medium">Holati</th>
                  <th className="px-4 py-3 font-medium">Arizalar</th>
                  <th className="px-4 py-3 text-right font-medium">Amal</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {directions.map((direction) => (
                  <tr key={direction._id} className="transition-colors hover:bg-slate-50">
                    <td className="px-4 py-3 font-medium text-slate-900">{direction.name}</td>
                    <td className="px-4 py-3">
                      <StatusBadge status={direction.status} kind="direction" />
                    </td>
                    <td className="px-4 py-3 text-slate-600">{direction.applicationsCount}</td>
                    <td className="px-4 py-3 text-right">
                      <button
                        type="button"
                        onClick={() => setEditing(direction)}
                        className="rounded-lg border border-slate-200 px-3 py-1.5 text-sm font-medium text-slate-700 transition-colors hover:border-brand-300 hover:bg-brand-50 hover:text-brand-800"
                      >
                        Tahrirlash
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <EditDialog direction={editing} onClose={() => setEditing(null)} />
    </div>
  );
}
