'use client';

import { useActionState } from 'react';

import { updateAccountAction } from '@/app/actions/auth';
import { FormMessage } from './form-message';

const initialState = { error: null, success: null };

const inputClass =
  'w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 focus:outline-none';

/**
 * @param {{ admin: { login: string, fullName: string | null } }} props
 */
export function AccountForm({ admin }) {
  const [state, formAction, pending] = useActionState(updateAccountAction, initialState);

  return (
    <form action={formAction} className="card flex flex-col gap-4 p-5">
      <h2 className="font-semibold text-slate-900">Hisob ma'lumotlari</h2>

      <div>
        <label htmlFor="login" className="mb-1.5 block text-sm font-medium text-slate-700">
          Login
        </label>
        <input id="login" name="login" defaultValue={admin.login} required className={inputClass} />
      </div>

      <div>
        <label htmlFor="fullName" className="mb-1.5 block text-sm font-medium text-slate-700">
          F.I.Sh.
        </label>
        <input
          id="fullName"
          name="fullName"
          defaultValue={admin.fullName ?? ''}
          placeholder="Ixtiyoriy"
          className={inputClass}
        />
      </div>

      <FormMessage state={state} />

      <button
        type="submit"
        disabled={pending}
        className="mt-auto self-start rounded-lg bg-brand-800 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-700 disabled:opacity-60"
      >
        {pending ? 'Saqlanmoqda...' : 'Saqlash'}
      </button>
    </form>
  );
}
