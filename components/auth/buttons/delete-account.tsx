'use client';

import { toast } from 'sonner';

import { handleError } from '@/components/auth/utils';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { authClient } from '@/lib/auth-client';

export const DeleteAccount = () => (
  <Dialog>
    <DialogTrigger asChild>
      <Button variant='destructive'>Delete Account</Button>
    </DialogTrigger>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Are you absolutely sure?</DialogTitle>
        <DialogDescription>
          This action cannot be undone. This will permanently delete your
          account and remove your data from our servers.
        </DialogDescription>
      </DialogHeader>
      <div className='flex flex-row-reverse items-center gap-2'>
        <DialogClose asChild>
          <Button variant='default'>Cancel</Button>
        </DialogClose>
        <DialogClose asChild>
          <Button
            disabled
            onClick={() => {
              const toastId = toast.loading(
                'Sending Account Deletion Email...',
              );
              void authClient.deleteUser(
                {
                  callbackURL: '/auth/sign-up',
                },
                {
                  onError: (context) => handleError(context, toastId),
                  onSuccess: async () => {
                    toast.success('Email Sent', {
                      description:
                        'Please check your email to verify account deletion.',
                      id: toastId,
                    });
                  },
                },
              );
            }}
            variant='destructive'
          >
            Delete Account
          </Button>
        </DialogClose>
      </div>
    </DialogContent>
  </Dialog>
);
