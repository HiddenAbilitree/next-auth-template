'use client';

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
import { Separator } from '@/components/ui/separator';
import { authClient } from '@/lib/auth-client';
import { arktypeResolver } from '@hookform/resolvers/arktype';
import { type } from 'arktype';
import { useRouter, useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

export const ResetPasswordFormSchema = type({
  password: NewPassword,
  confirmPassword: 'string',
}).narrow(
  (data, ctx) =>
    data.password === data.confirmPassword ||
    ctx.reject({
      message: 'Must be identical to password.',
      path: ['confirmPassword'],
    }),
);

export const ResetPasswordForm = () => {
  const token = useSearchParams().get('token') ?? undefined;
  const router = useRouter();

  const onSubmit = async (values: typeof ResetPasswordFormSchema.infer) => {
    const toastId = toast.loading('Resetting password...');
    await authClient.resetPassword(
      {
        newPassword: values.password,
        token,
      },
      {
        onSuccess: () => {
          toast.success('Password Reset Successful', {
            id: toastId,
            description: 'You can now sign in with your new password!',
          });
          router.push('/auth/sign-in');
        },
        onError: (context) => {
          handleError(context, toastId);
        },
      },
    );
  };

  const form = useForm<typeof ResetPasswordFormSchema.infer>({
    resolver: arktypeResolver(ResetPasswordFormSchema),
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='w-100 bg-card flex flex-col gap-5 rounded-md border p-4 shadow-sm'
      >
        <div className='flex w-full flex-col gap-3.5'>
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
              <FormLabel>Confirm Password</FormLabel>
              <FormControl>
                <Input placeholder='••••••••' type='password' {...field} />
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
