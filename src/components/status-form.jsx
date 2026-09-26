'use client';

import { useActionState } from 'react';

import { updateApplicationStatusAction } from '@/app/actions/data';
import { APPLICATION_STATUSES } from '@/lib/constants';

const initialState = { error: null, success: null };

/**
 * @param {{ id: string, status: string }} props
 */
export function StatusForm({ id, status }) {
  const [state, formAction, pending] = useActionState(updateApplicationStatusAction, initialState);

  return (
    <form action={formAction} className="space-y-3">
      <input type="hidden" name="id" value={id} />

      <div className="grid gap-2">
        {APPLICATION_STATUSES.map((option) => (
          <label
            key={option}
            className="flex cursor-pointer items-center gap-3 rounded-lg border border-slate-200 px-3 py-2.5 transition-colors has-checked:border-brand-500 has-checked:bg-brand-50"
          >
            <input
              type="radio"
              name="status"
              value={option}
              defaultChecked={option === status}
              className="size-4 accent-brand-700"
            />
            <span className="text-sm font-medium text-slate-700">{option}</span>
          </label>
        ))}
      </div>

      {state?.error ? (
        <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{state.error}</p>
      ) : null}
      {state?.success ? (
        <p className="rounded-lg bg-emerald-50 px-3 py-2 text-sm text-emerald-700">{state.success}</p>
      ) : null}

      <button
        type="submit"
        disabled={pending}
        className="w-full rounded-lg bg-brand-800 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-700 disabled:opacity-60"
      >
        {pending ? 'Saqlanmoqda...' : 'Holatni saqlash'}
      </button>
    </form>
  );
}
