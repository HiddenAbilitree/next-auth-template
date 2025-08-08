'use client';

import { arktypeResolver } from '@hookform/resolvers/arktype';
import { type } from 'arktype';
import { useRouter, useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { PasswordInput } from '@/components/auth/password-input';
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
import { Separator } from '@/components/ui/separator';
import { authClient } from '@/lib/auth-client';

export const ResetPasswordFormSchema = type({
  confirmPassword: `string`,
  password: NewPassword,
}).narrow(
  (data, ctx) =>
    data.password === data.confirmPassword ||
    ctx.reject({
      message: `Must be identical to password.`,
      path: [`confirmPassword`],
    }),
);

export const ResetPasswordForm = () => {
  const token = useSearchParams().get(`token`) ?? undefined;

  const router = useRouter();
  const onSubmit = async (values: typeof ResetPasswordFormSchema.infer) => {
    const toastId = toast.loading(`Resetting password...`);
    await authClient.resetPassword(
      {
        newPassword: values.password,
        token,
      },
      {
        onError: (context) => {
          handleError(context, toastId);
        },
        onSuccess: async () => {
          toast.success(`Password Reset Successful`, {
            description: `You can now sign in with your new password!`,
            id: toastId,
          });
          await authClient.signOut();
          router.push(`/`);
        },
      },
    );
  };

  const form = useForm<typeof ResetPasswordFormSchema.infer>({
    defaultValues: {
      confirmPassword: ``,
      password: ``,
    },
    resolver: arktypeResolver(ResetPasswordFormSchema),
  });

  return (
    <Form {...form}>
      <form
        className='flex w-100 flex-col gap-4 rounded-md border bg-card p-8 shadow-sm'
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <div className='flex w-full flex-col gap-4'>
          <h1 className='w-full text-xl font-semibold'>Reset Password</h1>
          <Separator />
        </div>
        <FormField
          control={form.control}
          name='password'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <PasswordInput {...field} />
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
              <FormLabel>Confirm Password</FormLabel>
              <FormControl>
                <PasswordInput {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type='submit'>Reset Password</Button>
      </form>
    </Form>
  );
};
