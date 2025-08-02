'use server';

import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

import { auth } from '@/lib/auth';

export const get2faEnabled = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) redirect(`/auth/sign-in`);

  return session.user.twoFactorEnabled;
};
