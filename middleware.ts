import { headers } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

import { auth } from '@/lib/auth';

export const middleware = async (request: NextRequest) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  /**
   * Redirect to OAuth provider instead of sign in page.
   */
  // if (!session) {
  //   const res = await auth.api.signInSocial({
  //     body: {
  //       provider: 'discord',
  //     },
  //   });
  //   return NextResponse.redirect(res.url as string);
  // }

  return session ?
      NextResponse.next()
    : NextResponse.redirect(new URL(`/auth/sign-in`, request.url));
};

export const config = {
  matcher: [
    `/((?!api/auth|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|auth).*)`,
  ],
  runtime: `nodejs`,
};
