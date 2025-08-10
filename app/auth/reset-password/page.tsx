import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

import { ResetPasswordForm } from '@/components/auth/forms/reset-password';
import { auth } from '@/lib/auth';
import { sectionStyles } from '@/styles';

export default async function ResetPassword() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) redirect(`/auth/sign-in`);

  return (
    <div className={sectionStyles}>
      <ResetPasswordForm />
    </div>
  );
}
