'use server';

import { eq } from 'drizzle-orm';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

import { db, schema } from '@/db';
import { auth } from '@/lib/auth';

export const getPasskeys = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) redirect(`/auth/sign-in`);

  const passkey = schema.passkey;

  return await db
    .select({
      createdAt: passkey.createdAt,
      id: passkey.id,
      name: passkey.name,
    })
    .from(passkey)
    .where(eq(passkey.userId, session.user.id));
};
