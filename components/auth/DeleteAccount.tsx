'use client';
import { Button } from '@/components/ui/button';
import { authClient } from '@/lib/auth-client';

export const DeleteAccount = () => (
  <Button
    variant='destructive'
    onClick={async () => {
      await authClient.deleteUser({
        callbackURL: '/auth/signup',
      });
    }}
  >
    Delete Account
  </Button>
);
