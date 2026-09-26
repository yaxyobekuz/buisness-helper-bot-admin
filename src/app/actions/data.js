'use server';

import { revalidatePath } from 'next/cache';

import { ApiRequestError, apiFetch } from '@/lib/api';

function toMessage(error) {
  return error instanceof ApiRequestError ? error.message : 'Xatolik yuz berdi';
}

export async function updateApplicationStatusAction(prevState, formData) {
  const id = String(formData.get('id') ?? '');
  const status = String(formData.get('status') ?? '');

  try {
    await apiFetch(`/applications/${id}`, { method: 'PATCH', body: { status } });
  } catch (error) {
    return { error: toMessage(error) };
  }

  revalidatePath('/arizalar');
  revalidatePath(`/arizalar/${id}`);
  revalidatePath('/');

  return { success: 'Holat yangilandi' };
}

export async function createDirectionAction(prevState, formData) {
  const name = String(formData.get('name') ?? '').trim();

  if (name.length < 2) {
    return { error: "Yo'nalish nomini kiriting" };
  }

  try {
    await apiFetch('/directions', { method: 'POST', body: { name } });
  } catch (error) {
    return { error: toMessage(error) };
  }

  revalidatePath('/sozlamalar');

  // token — formani tozalash uchun (har safar yangi qiymat)
  return { success: "Yo'nalish qo'shildi", token: Date.now() };
}

export async function updateDirectionAction(prevState, formData) {
  const id = String(formData.get('id') ?? '');
  const payload = {};

  if (formData.get('status')) payload.status = String(formData.get('status'));
  if (formData.get('name')) payload.name = String(formData.get('name')).trim();

  try {
    await apiFetch(`/directions/${id}`, { method: 'PATCH', body: payload });
  } catch (error) {
    return { error: toMessage(error) };
  }

  revalidatePath('/sozlamalar');

  return { success: 'Saqlandi' };
}
