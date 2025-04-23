import { NextRequest, NextResponse } from 'next/server';
import { headers } from 'next/headers';
import { auth } from '@/lib/auth';

export async function middleware(request: NextRequest) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return session
    ? NextResponse.next()
    : NextResponse.redirect(new URL('/auth/signin', request.url));
}


export const config = {
  runtime: 'nodejs',
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|auth).*)',
  ],
};
