import { NextResponse } from 'next/server';

import { TOKEN_COOKIE } from '@/lib/constants';

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
    return NextResponse.redirect(new URL('/login', request.url));
  }

  if (token && isLoginPage) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)'],
};
