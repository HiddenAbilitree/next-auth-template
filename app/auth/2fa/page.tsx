import { TwoFactorForm } from '@/components/auth/two-factor-form';

export default function VerifyTwoFactor() {
  return (
    <div className='flex h-screen w-screen items-center justify-center'>
      <TwoFactorForm variant='card' />
    </div>
  );
}
