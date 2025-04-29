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
import { toast } from 'sonner';
import { useEffect } from 'react';

import { authClient } from '@/lib/auth-client';

import { arktypeResolver } from '@hookform/resolvers/arktype';
import { useForm } from 'react-hook-form';
import { SignInFormSchema } from '@/lib/schemas/auth';
import { Separator } from '@/components/ui/separator';
import { useRouter } from 'next/navigation';

export const SignInForm = () => {
  const router = useRouter();

  const form = useForm<typeof SignInFormSchema.infer>({
    resolver: arktypeResolver(SignInFormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (values: typeof SignInFormSchema.infer) => {
    const toastId = toast.loading('Signing in...');
    const { error } = await authClient.signIn.email(
      {
        email: values.email,
        password: values.password,
      },
      {
        onSuccess: async (context) => {
          if (context.data.twoFactorRedirect) {
            toast.dismiss(toastId);
            router.push('/auth/2fa');
          }
        },
      },
    );

    if (error) {
      toast.error('Sign In Failed', {
        id: toastId,
        description: error.message,
      });
    } else {
      toast.success('Sign In Successful', {
        id: toastId,
      });
      router.push('/');
    }
  };

  // https://www.better-auth.com/docs/plugins/passkey#preload-the-passkeys
  useEffect(() => {
    if (
      !PublicKeyCredential.isConditionalMediationAvailable ||
      !PublicKeyCredential.isConditionalMediationAvailable()
    ) {
      return;
    }

    void authClient.signIn.passkey(
      { autoFill: true },
      {
        onSuccess: () => {
          toast.success('Sign In Successful!');
          router.push('/');
        },
      },
    );
  }, [router]);

  return (
    <Form {...form}>
      <form
        tabIndex={0}
        onSubmit={form.handleSubmit(onSubmit)}
        className='flex w-100 flex-col gap-5 rounded-md border bg-card p-4 shadow-sm'
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
                <Input
                  placeholder='example@acme.com'
                  autoComplete='username webauthn'
                  {...field}
                />
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
              <FormLabel className='flex w-full justify-between'>
                <p>Password</p>
                <Link
                  href='/auth/forgot-password'
                  className='underline hover:font-semibold hover:-tracking-[0.056em]'
                >
                  Forgot password?
                </Link>
              </FormLabel>
              <FormControl>
                <Input
                  placeholder='••••••••'
                  type='password'
                  autoComplete='current-password webauthn'
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type='submit'>Sign In</Button>
        <Button
          type='button'
          onClick={async () => {
            await authClient.signIn.social({
              provider: 'google',
            });
          }}
          variant='white'
        >
          Sign In with Google{' '}
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='31.27'
            height='32'
            viewBox='0 0 256 262'
          >
            <path
              fill='#4285F4'
              d='M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622l38.755 30.023l2.685.268c24.659-22.774 38.875-56.282 38.875-96.027'
            />
            <path
              fill='#34A853'
              d='M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055c-34.523 0-63.824-22.773-74.269-54.25l-1.531.13l-40.298 31.187l-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1'
            />
            <path
              fill='#FBBC05'
              d='M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82c0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602z'
            />
            <path
              fill='#EB4335'
              d='M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0C79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251'
            />
          </svg>
        </Button>
        <span>
          Don{"'"}t have an account? Make one{' '}
          <Link
            href='/auth/signup'
            className='underline hover:font-medium hover:-tracking-[0.0565em]'
          >
            here
          </Link>
          .
        </span>
      </form>
    </Form>
  );
};
