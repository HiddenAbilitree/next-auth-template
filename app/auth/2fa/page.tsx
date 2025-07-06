import { TwoFactorForm } from '@/components/auth/forms/two-factor';

export default function VerifyTwoFactor() {
  return (
    <div className='flex h-screen w-screen items-center justify-center'>
      <TwoFactorForm variant='card' />
    </div>
  );
}
