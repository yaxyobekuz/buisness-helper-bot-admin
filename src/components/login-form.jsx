'use client';

import Image from 'next/image';
import { useActionState } from 'react';

import { loginAction } from '@/app/actions/auth';

const initialState = { error: null };

export function LoginForm() {
  const [state, formAction, pending] = useActionState(loginAction, initialState);

  return (
    <div className="w-full max-w-sm">
      <div className="mb-8 flex flex-col items-center text-center">
        <Image src="/logo.svg" alt="" width={64} height={64} unoptimized />
        <h1 className="mt-4 text-xl font-semibold text-slate-900">Admin panel</h1>
        <p className="mt-1 text-sm text-slate-500">Davom etish uchun tizimga kiring</p>
      </div>

      <form action={formAction} className="card space-y-4 p-6">
        <div>
          <label htmlFor="login" className="mb-1.5 block text-sm font-medium text-slate-700">
            Login
          </label>
          <input
            id="login"
            name="login"
            autoComplete="username"
            required
            className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm text-slate-900 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 focus:outline-none"
          />
        </div>

        <div>
          <label htmlFor="password" className="mb-1.5 block text-sm font-medium text-slate-700">
            Parol
          </label>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm text-slate-900 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 focus:outline-none"
          />
        </div>

        {state?.error ? (
          <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{state.error}</p>
        ) : null}

        <button
          type="submit"
          disabled={pending}
          className="w-full rounded-lg bg-brand-800 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-700 disabled:opacity-60"
        >
          {pending ? 'Tekshirilmoqda...' : 'Kirish'}
        </button>
      </form>
    </div>
  );
}
