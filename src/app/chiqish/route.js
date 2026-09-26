import { NextResponse } from 'next/server';

import { TOKEN_COOKIE } from '@/lib/constants';

/**
 * Sessiyani tozalab, kirish sahifasiga yuboradi.
 *
 * Cookie ni faqat route handler yoki server action o'zgartira oladi —
 * server komponentidan o'chirib bo'lmaydi. Shuning uchun token yaroqsiz
 * bo'lganda sahifalar shu manzilga yo'naltiradi: bu yerda cookie o'chadi
 * va proxy endi foydalanuvchini `/login` ga kiritadi.
 */
export async function GET(request) {
  const response = NextResponse.redirect(new URL('/login', request.url));

  response.cookies.delete(TOKEN_COOKIE);

  return response;
}
