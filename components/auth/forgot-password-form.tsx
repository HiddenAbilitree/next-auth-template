'use client';

import { EmailForm as EmailFormSchema } from '@/components/auth/types';
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
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

export const ForgotPasswordForm = () => {
  const onSubmit = async (values: typeof EmailFormSchema.infer) => {
    const toastId = toast.loading('Sending email...');

    await authClient.forgetPassword(
      {
        email: values.email,
        redirectTo: '/auth/reset-password',
      },
      {
        onSuccess: () => {
          toast.success('Email sent!', {
            id: toastId,
            description: 'Please check your email to reset your password.',
          });
        },
        onError: (context) => handleError(context, toastId),
      },
    );
  };

  const form = useForm<typeof EmailFormSchema.infer>({
    resolver: arktypeResolver(EmailFormSchema),
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
          name='email'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder='example@acme.com' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type='submit'>Request Password Reset</Button>
      </form>
    </Form>
  );
};
