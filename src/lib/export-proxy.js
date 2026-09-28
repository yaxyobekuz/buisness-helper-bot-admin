import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

import { TOKEN_COOKIE } from './constants';

const BASE_URL = process.env.API_URL ?? 'http://localhost:4000/api';

/** Eksportga uzatiladigan parametrlar — boshqasi e'tiborsiz qoldiriladi. */
const ALLOWED = ['status', 'deleted', 'from', 'to'];

/**
 * Serverdagi xlsx eksportini brauzerga uzatadi. Token HTTP-only cookie da
 * bo'lgani uchun brauzer serverga to'g'ridan-to'g'ri murojaat qila olmaydi —
 * shuning uchun so'rov shu yerdan yuboriladi.
 *
 * @param {Request} request
 * @param {string} path
 */
export async function proxyExport(request, path) {
  const token = (await cookies()).get(TOKEN_COOKIE)?.value;

  if (!token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  const incoming = new URL(request.url).searchParams;
  const query = new URLSearchParams();

  for (const key of ALLOWED) {
    const value = incoming.get(key);
    if (value) query.set(key, value);
  }

  const response = await fetch(`${BASE_URL}${path}?${query.toString()}`, {
    headers: { Authorization: `Bearer ${token}` },
    cache: 'no-store',
  });

  if (!response.ok) {
    return NextResponse.json(
      { success: false, message: "Faylni yuklab bo'lmadi" },
      { status: response.status },
    );
  }

  return new NextResponse(response.body, {
    status: 200,
    headers: {
      'Content-Type':
        response.headers.get('content-type') ??
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'Content-Disposition':
        response.headers.get('content-disposition') ?? 'attachment; filename="export.xlsx"',
      'Cache-Control': 'no-store',
    },
  });
}
