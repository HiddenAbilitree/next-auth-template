'use client';

import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { authClient } from '@/lib/auth-client';

export const SignOut = () => {
  const router = useRouter();
  return (
    <Button
      onClick={() => {
        void authClient.signOut({
          fetchOptions: {
            onSuccess: () => {
              router.push(`/auth/sign-in`);
            },
          },
        });
      }}
      variant='destructive'
    >
      Sign Out
    </Button>
  );
};
