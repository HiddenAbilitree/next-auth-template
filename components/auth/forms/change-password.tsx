'use client';

import { arktypeResolver } from '@hookform/resolvers/arktype';
import { type } from 'arktype';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { NewPassword } from '@/components/auth/types';
import { handleError } from '@/components/auth/utils';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useHasPassword } from '@/hooks/has-password';
import { authClient } from '@/lib/auth-client';

export const ChangePasswordFormSchema = type({
  confirmPassword: `string`,
  currentPassword: `string`,
  newPassword: NewPassword,
}).narrow(
  (data, ctx) =>
    data.newPassword === data.confirmPassword ||
    ctx.reject({
      message: `Must be identical to the new password.`,
      path: [`confirmPassword`],
    }),
);

export const ChangePasswordForm = () => {
  const router = useRouter();
  const onSubmit = async ({
    currentPassword,
    newPassword,
  }: typeof ChangePasswordFormSchema.infer) => {
    const toastId = toast.loading(`Changing password...`);
    await authClient.changePassword(
      {
        currentPassword,
        newPassword,
        revokeOtherSessions: true,
      },
      {
        onError: (context) => handleError(context, toastId),
        onSuccess: () => {
          toast.success(`Password Change Successful`, {
            description: `You can now sign in with your new password!`,
            id: toastId,
          });
          void authClient.signOut();
          router.push(`/auth/sign-in`);
        },
      },
    );
  };

  const form = useForm<typeof ChangePasswordFormSchema.infer>({
    defaultValues: {
      confirmPassword: ``,
      currentPassword: ``,
      newPassword: ``,
    },
    resolver: arktypeResolver(ChangePasswordFormSchema),
  });

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size='sm'>Change Password</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Change Password</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            className='flex flex-col gap-4'
            id='change-password-form'
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <FormField
              control={form.control}
              name='currentPassword'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Current Password</FormLabel>
                  <FormControl>
                    <Input placeholder='••••••••' type='password' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='newPassword'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>New Password</FormLabel>
                  <FormControl>
                    <Input placeholder='••••••••' type='password' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='confirmPassword'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm New Password</FormLabel>
                  <FormControl>
                    <Input placeholder='••••••••' type='password' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
        <DialogFooter>
          <Button form='change-password-form' type='submit'>
            Change Password
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

const AddPasswordButton = () => {
  const { data: session } = authClient.useSession();

  const handleAddPassword = async () => {
    if (!session?.user.email) {
      toast.error(`Could not find an email associated with your account.`);
      return;
    }
    const toastId = toast.loading(`Sending password setup email...`);
    await authClient.requestPasswordReset(
      {
        email: session.user.email,
        redirectTo: `/auth/reset-password`,
      },
      {
        onError: (context) => handleError(context, toastId),
        onSuccess: () => {
          toast.success(`Email Sent`, {
            description: `Check your email to finish adding a password to this account.`,
            id: toastId,
          });
        },
      },
    );
  };

  return (
    <Button onClick={handleAddPassword} size='sm'>
      Add Password
    </Button>
  );
};

export const PasswordSettings = () => {
  const hasPassword = useHasPassword();

  return hasPassword ? <ChangePasswordForm /> : <AddPasswordButton />;
};
