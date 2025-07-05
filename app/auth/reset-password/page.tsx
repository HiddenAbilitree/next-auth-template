import { ResetPasswordForm } from '@/components/auth/reset-password-form';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function ResetPassword() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) redirect('/auth/sign-in');

  return (
    <div className='flex h-screen w-screen items-center justify-center'>
      <ResetPasswordForm />
    </div>
  );
}
