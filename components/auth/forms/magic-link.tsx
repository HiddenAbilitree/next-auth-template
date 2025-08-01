'use client';

import { arktypeResolver } from '@hookform/resolvers/arktype';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

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

export const MagicLinkForm = () => {
  const onSubmit = async (values: typeof EmailFormSchema.infer) => {
    const toastId = toast.loading(`Sending email...`);

    await authClient.signIn.magicLink(
      {
        email: values.email,
      },
      {
        onError: (context) => handleError(context, toastId),
        onSuccess: () => {
          toast.success(`Email sent!`, {
            description: `Please check your email to sign in.`,
            id: toastId,
          });
        },
      },
    );
  };

  const form = useForm<typeof EmailFormSchema.infer>({
    resolver: arktypeResolver(EmailFormSchema),
  });

  return (
    <Form {...form}>
      <form
        className='flex w-100 flex-col gap-5 rounded-md border bg-card p-4 shadow-sm'
        onSubmit={void form.handleSubmit(onSubmit)}
      >
        <div className='flex w-full flex-col gap-3.5'>
          <h1 className='w-full text-xl font-semibold'>
            Sign In with Magic Link
          </h1>
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
        <Button type='submit'>Send Email</Button>
      </form>
    </Form>
  );
};
