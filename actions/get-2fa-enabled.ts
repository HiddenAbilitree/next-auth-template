import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

export const get2faEnabled = async () => {
  'use server';

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) redirect('/auth/sign-in');

  return session.user.twoFactorEnabled;
};
