'use server';

import { revalidatePath } from 'next/cache';

import { ApiRequestError, apiFetch } from '@/lib/api';

function toMessage(error) {
  if (error instanceof ApiRequestError) {
    return error.status === 401 ? 'Sessiya tugagan. Qaytadan kiring.' : error.message;
  }

  return 'Xatolik yuz berdi';
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
