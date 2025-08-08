'use client';

import { useRouter } from 'next/navigation';

import { TwoFactorForm } from '@/components/auth/forms/two-factor';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

export const TwoFactorSignIn = () => {
  const router = useRouter();
  return (
    <div className='relative z-40 flex w-100 flex-col gap-4 rounded-sm border bg-card p-8 backdrop-blur-3xl backdrop-grayscale-25'>
      <div className='flex w-full flex-col gap-4'>
        <div className='flex w-full flex-col gap-2'>
          <h1 className='w-full text-2xl font-semibold'>2FA Authentcation</h1>
          <p className='text-secondary-foreground'>
            Please enter your 2FA code below.
          </p>
        </div>
        <Separator />
      </div>
      <TwoFactorForm
        id='two-factor-sign-in'
        onSuccess={() => {
          router.push(`/`);
        }}
      />
      <div className='ml-auto flex'>
        <Button form='two-factor-sign-in' type='submit' variant='secondary'>
          Submit
        </Button>
      </div>
    </div>
  );
};
