import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import { TOKEN_COOKIE } from './constants';

const BASE_URL = process.env.API_URL ?? 'http://localhost:4000/api';

export class ApiRequestError extends Error {
  constructor(status, message, details) {
    super(message);
    this.name = 'ApiRequestError';
    this.status = status;
    this.details = details;
  }
}

/**
 * Server API ga so'rov yuboradi. Faqat server tomonida ishlaydi —
 * token HTTP-only cookie dan olinadi va brauzerga chiqmaydi.
 *
 * @param {string} path
 * @param {RequestInit & { body?: unknown, auth?: boolean }} [options]
 */
export async function apiFetch(path, options = {}) {
  const { body, headers, auth = true, ...rest } = options;
  const token = auth ? (await cookies()).get(TOKEN_COOKIE)?.value : null;

  let response;

  try {
    response = await fetch(`${BASE_URL}${path}`, {
      ...rest,
      cache: 'no-store',
      headers: {
        ...(body ? { 'Content-Type': 'application/json' } : {}),
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...headers,
      },
      body: body ? JSON.stringify(body) : undefined,
    });
  } catch {
    throw new ApiRequestError(503, "Serverga ulanib bo'lmadi. Server ishga tushganini tekshiring.");
  }

  const isJson = response.headers.get('content-type')?.includes('application/json');
  const payload = isJson ? await response.json().catch(() => null) : null;

  if (!response.ok) {
    throw new ApiRequestError(
      response.status,
      payload?.message ?? response.statusText,
      payload?.details,
    );
  }

  return payload;
}

/**
 * Sahifalar va layout uchun. Token yaroqsiz bo'lsa (401) — sessiyani
 * tozalaydigan manzilga yo'naltiradi, shunda foydalanuvchi xato sahifasi
 * o'rniga kirish oynasiga tushadi.
 *
 * Server action larda ishlatilmaydi: u yerda `apiFetch` ning o'zi chaqirilib,
 * xato foydalanuvchiga xabar sifatida qaytariladi.
 *
 * @param {string} path
 * @param {Parameters<typeof apiFetch>[1]} [options]
 */
export async function apiFetchPage(path, options) {
  try {
    return await apiFetch(path, options);
  } catch (error) {
    if (error instanceof ApiRequestError && error.status === 401) {
      redirect('/chiqish');
    }

    throw error;
  }
}
