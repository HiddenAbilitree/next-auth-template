import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

import { ResetPasswordForm } from '@/components/auth/forms/reset-password';
import { auth } from '@/lib/auth';

export default async function ResetPassword() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) redirect(`/auth/sign-in`);
  return (
    <div className='flex h-screen w-screen items-center justify-center'>
      <ResetPasswordForm />
    </div>
  );
}
