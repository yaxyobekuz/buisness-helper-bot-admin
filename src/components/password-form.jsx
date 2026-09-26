'use client';

import { useActionState } from 'react';

import { changePasswordAction } from '@/app/actions/auth';
import { FormMessage } from './form-message';

const initialState = { error: null, success: null };

const inputClass =
  'w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm text-slate-900 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 focus:outline-none';

export function PasswordForm() {
  const [state, formAction, pending] = useActionState(changePasswordAction, initialState);

  // Muvaffaqiyatli o'zgartirishdan keyin maydonlar tozalanadi.
  const resetKey = state?.token ?? 'new';

  return (
    <form action={formAction} className="card flex flex-col gap-4 p-5">
      <h2 className="font-semibold text-slate-900">Parolni o'zgartirish</h2>

      <div>
        <label htmlFor="currentPassword" className="mb-1.5 block text-sm font-medium text-slate-700">
          Joriy parol
        </label>
        <input
          key={`current-${resetKey}`}
          id="currentPassword"
          name="currentPassword"
          type="password"
          autoComplete="current-password"
          required
          className={inputClass}
        />
      </div>

      <div>
        <label htmlFor="newPassword" className="mb-1.5 block text-sm font-medium text-slate-700">
          Yangi parol
        </label>
        <input
          key={`new-${resetKey}`}
          id="newPassword"
          name="newPassword"
          type="password"
          autoComplete="new-password"
          required
          className={inputClass}
        />
      </div>

      <div>
        <label htmlFor="repeatPassword" className="mb-1.5 block text-sm font-medium text-slate-700">
          Yangi parolni takrorlang
        </label>
        <input
          key={`repeat-${resetKey}`}
          id="repeatPassword"
          name="repeatPassword"
          type="password"
          autoComplete="new-password"
          required
          className={inputClass}
        />
      </div>

      <FormMessage state={state} />

      <button
        type="submit"
        disabled={pending}
        className="mt-auto self-start rounded-lg bg-brand-800 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-700 disabled:opacity-60"
      >
        {pending ? "O'zgartirilmoqda..." : "Parolni o'zgartirish"}
      </button>
    </form>
  );
}
