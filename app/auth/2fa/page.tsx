import { TwoFactorForm } from '@/components/auth/TwoFactorForm';

export default function VerifyTwoFactor() {
  return (
    <div className='flex h-screen w-screen items-center justify-center'>
      <TwoFactorForm variant='card' />
    </div>
  );
}
