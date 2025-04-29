'use client';
import { Button } from '@/components/ui/button';
import { authClient } from '@/lib/auth-client';
import { toast } from 'sonner';

export const DeleteAccount = () => (
  <Button
    variant='destructive'
    onClick={() =>
      void authClient.deleteUser(
        {
          callbackURL: '/auth/signup',
        },
        {
          onSuccess: async () => {
            toast.success('Email Sent', {
              description: 'Please check your email to verify account deletion',
            });
          },
          onError: (context) => {
            toast.error(context.error.message);
          },
        },
      )
    }
  >
    Delete Account
  </Button>
);
