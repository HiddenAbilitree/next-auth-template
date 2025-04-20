'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

import { authClient } from '@/lib/auth-client';

import { arktypeResolver } from '@hookform/resolvers/arktype';
import { useForm } from 'react-hook-form';
import { signIn } from '@/lib/schemas/auth';
import { Separator } from '../ui/separator';

export function SignInCard() {
  const form = useForm<typeof signIn.infer>({
    resolver: arktypeResolver(signIn),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  async function onSubmit(values: typeof signIn.infer) {
    // TODO remove name field whenever this issue is resolved :(
    // https://github.com/better-auth/better-auth/issues/424
    const { error } = await authClient.signIn.email({
      email: values.email,
      password: values.password,
    });
    if (error) {
      console.error(error);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='flex w-100 flex-col gap-5 rounded-md border bg-card p-4 shadow-md'
      >
        <div className='flex w-full flex-col gap-3.5'>
          <h1 className='w-full text-xl font-semibold'>Welcome Back</h1>
          <Separator />
        </div>
        <FormField
          control={form.control}
          name='email'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder='acme@example.com' {...field} />
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
        <Button type='submit'>Sign In</Button>
        <span>
          Don{"'"}t have an account? Make one{' '}
          <Link href='/auth/signup' className='underline hover:font-medium'>
            here
          </Link>
          .
        </span>
      </form>
    </Form>
  );
}
