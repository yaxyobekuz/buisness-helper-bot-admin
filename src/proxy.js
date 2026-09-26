import { NextResponse } from 'next/server';

import { TOKEN_COOKIE } from '@/lib/constants';

/**
 * Yo'naltirish manzilini quradi.
 *
 * Next proxy qatlami `Location` ni absolyut ko'rinishda talab qiladi, lekin
 * reverse proxy (nginx) orqasida `request.url` ichki manzilni beradi
 * (masalan http://localhost:5824). Shuning uchun avval `X-Forwarded-Host` va
 * `X-Forwarded-Proto` sarlavhalariga qaraymiz — nginx ularni uzatsa, brauzer
 * ko'rgan haqiqiy domen o'shalarda bo'ladi.
 *
 * @param {import('next/server').NextRequest} request
 * @param {string} path
 */
function redirectTo(request, path) {
  const url = request.nextUrl.clone();

  url.pathname = path;
  url.search = '';

  const forwardedHost = request.headers.get('x-forwarded-host');
  const forwardedProto = request.headers.get('x-forwarded-proto');

  if (forwardedHost) {
    // `url.host = 'domen'` portni saqlab qoladi, shuning uchun alohida yoziladi.
    const [hostname, port = ''] = forwardedHost.split(',')[0].trim().split(':');

    url.hostname = hostname;
    url.port = port;
  }

  if (forwardedProto) {
    url.protocol = `${forwardedProto.split(',')[0].trim()}:`;
  }

  return NextResponse.redirect(url);
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
    return redirectTo(request, '/login');
  }

  if (token && isLoginPage) {
    return redirectTo(request, '/');
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)'],
};
