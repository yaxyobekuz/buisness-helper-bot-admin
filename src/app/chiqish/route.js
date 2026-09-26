import { NextResponse } from 'next/server';

import { TOKEN_COOKIE } from '@/lib/constants';

/**
 * Sessiyani tozalab, kirish sahifasiga yuboradi.
 *
 * Cookie ni faqat route handler yoki server action o'zgartira oladi —
 * server komponentidan o'chirib bo'lmaydi. Shuning uchun token yaroqsiz
 * bo'lganda sahifalar shu manzilga yo'naltiradi: bu yerda cookie o'chadi
 * va proxy endi foydalanuvchini `/login` ga kiritadi.
 *
 * `Location` ataylab nisbiy — reverse proxy orqasida absolyut manzil
 * ichki portga (masalan http://localhost:5824) ishora qilib qolardi.
 */
export async function GET() {
  const response = new NextResponse(null, {
    status: 307,
    headers: { location: '/login' },
  });

  response.cookies.delete(TOKEN_COOKIE);

  return response;
}
