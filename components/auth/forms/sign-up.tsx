'use client';

import { arktypeResolver } from '@hookform/resolvers/arktype';
import { type } from 'arktype';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { Email, NewPassword } from '@/components/auth/types';
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

// ripped straight from https://arktype.io/docs/expressions#narrow
// configure errors https://arktype.io/docs/configuration#errors
const SignUpFormSchema = type({
  confirmPassword: 'string',
  email: Email,
  password: NewPassword,
}).narrow(
  (data, ctx) =>
    data.password === data.confirmPassword ||
    ctx.reject({
      message: 'Must be identical to password.',
      path: ['confirmPassword'],
    }),
);

export const SignUpForm = () => {
  const router = useRouter();
  const form = useForm<typeof SignUpFormSchema.infer>({
    defaultValues: {
      confirmPassword: '',
      email: '',
      password: '',
    },
    resolver: arktypeResolver(SignUpFormSchema),
  });

  const onSubmit = async (values: typeof SignUpFormSchema.infer) => {
    const toastId = toast.loading('Signing up...');

    await authClient.signUp.email(
      {
        email: values.email,
        name: '',
        password: values.password,
      },
      {
        onError: (context) =>
          void toast.error('Sign Up Failed', {
            description:
              context.error.message === 'User already exists' ?
                'Email is already in use.'
              : context.error.message,
            id: toastId,
          }),
        onSuccess: () => {
          toast.dismiss(toastId);
          router.push('/auth/sign-up/complete');
        },
      },
    );
  };

  return (
    <Form {...form}>
      <form
        className='w-100 bg-card flex flex-col gap-5 rounded-md border p-4 shadow-sm'
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <div className='flex w-full flex-col gap-3.5'>
          <h1 className='w-full text-xl font-semibold'>Get Started</h1>
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
                <Input
                  placeholder={
                    '\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022'
                  }
                  type='password'
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type='submit'>Sign Up</Button>
        <span>
          Already have an account? Sign in{' '}
          <Link className='underline hover:font-medium' href='/auth/sign-in'>
            here
          </Link>
          .
        </span>
      </form>
    </Form>
  );
};
