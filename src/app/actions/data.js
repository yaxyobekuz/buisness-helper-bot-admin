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

async function mutate(path, method, paths) {
  try {
    await apiFetch(path, { method });
  } catch (error) {
    return { error: toMessage(error) };
  }

  for (const target of paths) revalidatePath(target);

  return { success: true };
}

export async function deleteApplicationAction(id) {
  return mutate(`/applications/${id}`, 'DELETE', ['/arizalar', `/arizalar/${id}`, '/tadbirkorlar', '/']);
}

export async function restoreApplicationAction(id) {
  return mutate(`/applications/${id}/restore`, 'POST', ['/arizalar', `/arizalar/${id}`, '/tadbirkorlar', '/']);
}

export async function deleteEntrepreneurAction(id) {
  return mutate(`/entrepreneurs/${id}`, 'DELETE', ['/tadbirkorlar', `/tadbirkorlar/${id}`, '/arizalar', '/']);
}

export async function restoreEntrepreneurAction(id) {
  return mutate(`/entrepreneurs/${id}/restore`, 'POST', ['/tadbirkorlar', `/tadbirkorlar/${id}`, '/arizalar', '/']);
}
