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
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
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
    const toastId = toast.loading(`Resetting password...`);
    await authClient.changePassword(
      {
        currentPassword,
        newPassword,
      },
      {
        onError: (context) => handleError(context, toastId),
        onSuccess: () => {
          toast.success(`Password Reset Successful`, {
            description: `You can now sign in with your new password!`,
            id: toastId,
          });
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
    <Form {...form}>
      <form
        className='flex w-100 flex-col gap-5 rounded-md p-4'
        onSubmit={void form.handleSubmit(onSubmit)}
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
        <Button type='submit'>Change Password</Button>
      </form>
    </Form>
  );
};
