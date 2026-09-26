import { NextResponse } from 'next/server';

import { TOKEN_COOKIE } from '@/lib/constants';

/**
 * Nisbiy yo'naltirish.
 *
 * `new URL(path, request.url)` ishlatilmaydi: reverse proxy (nginx) orqasida
 * `request.url` ichki manzilni beradi (masalan http://localhost:5824) va
 * brauzer o'sha manzilga ketib qoladi. Nisbiy `Location` sarlavhasi esa
 * brauzer tomonidan joriy domenga nisbatan hal qilinadi.
 *
 * @param {string} path
 */
function redirectTo(path) {
  return new NextResponse(null, { status: 307, headers: { location: path } });
}

export default function proxy(request) {
  const token = request.cookies.get(TOKEN_COOKIE)?.value;
  const { pathname } = request.nextUrl;
  const isLoginPage = pathname === '/login';

  // Sessiyani tozalash manzili har doim o'tkaziladi, aks holda yaroqsiz
  // cookie bilan /login <-> / o'rtasida cheksiz aylanish yuzaga keladi.
  if (pathname === '/chiqish') {
    return NextResponse.next();
  }

  if (!token && !isLoginPage) {
    return redirectTo('/login');
  }

  if (token && isLoginPage) {
    return redirectTo('/');
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)'],
};
