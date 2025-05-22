import { ResetPasswordForm } from '@/components/auth/ResetPasswordForm';
import { Suspense } from 'react';

export default function ResetPassword() {
  return (
    <div className='flex h-screen w-screen items-center justify-center'>
      <Suspense>
        <ResetPasswordForm />
      </Suspense>
    </div>
  );
}
