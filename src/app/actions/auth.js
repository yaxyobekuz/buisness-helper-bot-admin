'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';

import { ApiRequestError, apiFetch } from '@/lib/api';
import { TOKEN_COOKIE } from '@/lib/constants';

const WEEK = 60 * 60 * 24 * 7;

export async function loginAction(prevState, formData) {
  const login = String(formData.get('login') ?? '').trim();
  const password = String(formData.get('password') ?? '');

  if (!login || !password) {
    return { error: 'Login va parolni kiriting' };
  }

  let data;

  try {
    data = await apiFetch('/auth/login', {
      method: 'POST',
      body: { login, password },
      auth: false,
    });
  } catch (error) {
    return { error: error instanceof ApiRequestError ? error.message : 'Xatolik yuz berdi' };
  }

  (await cookies()).set(TOKEN_COOKIE, data.token, {
    httpOnly: true,
    sameSite: 'lax',
    path: '/',
    maxAge: WEEK,
    secure: process.env.NODE_ENV === 'production',
  });

  redirect('/');
}

export async function logoutAction() {
  (await cookies()).delete(TOKEN_COOKIE);
  redirect('/login');
}

export async function updateAccountAction(prevState, formData) {
  const payload = {
    login: String(formData.get('login') ?? '').trim(),
    fullName: String(formData.get('fullName') ?? '').trim(),
  };

  try {
    await apiFetch('/auth/profile', { method: 'PATCH', body: payload });
  } catch (error) {
    return { error: error instanceof ApiRequestError ? error.message : 'Xatolik yuz berdi' };
  }

  revalidatePath('/profil');

  return { success: "Ma'lumotlar saqlandi" };
}

export async function changePasswordAction(prevState, formData) {
  const currentPassword = String(formData.get('currentPassword') ?? '');
  const newPassword = String(formData.get('newPassword') ?? '');
  const repeatPassword = String(formData.get('repeatPassword') ?? '');

  if (!currentPassword || !newPassword) {
    return { error: 'Joriy va yangi parolni kiriting' };
  }

  if (newPassword !== repeatPassword) {
    return { error: 'Yangi parollar mos kelmadi' };
  }

  try {
    await apiFetch('/auth/profile', {
      method: 'PATCH',
      body: { currentPassword, newPassword },
    });
  } catch (error) {
    return { error: error instanceof ApiRequestError ? error.message : 'Xatolik yuz berdi' };
  }

  // token — maydonlarni tozalash uchun (har safar yangi qiymat)
  return { success: "Parol o'zgartirildi", token: Date.now() };
}
