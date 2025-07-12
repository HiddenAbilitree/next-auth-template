'use client';

import { arktypeResolver } from '@hookform/resolvers/arktype';
import { type } from 'arktype';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { DiscordOAuth, GoogleOAuth } from '@/components/auth/oauth';
import { Email } from '@/components/auth/types';
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

const SignInFormSchema = type({
  email: Email,
  password: 'string',
});

export const SignInForm = () => {
  const router = useRouter();

  const form = useForm<typeof SignInFormSchema.infer>({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: arktypeResolver(SignInFormSchema),
  });

  const onSubmit = async (values: typeof SignInFormSchema.infer) => {
    const toastId = toast.loading('Signing in...');

    // cant use toast.promise because authClient returns
    // something different to what is expected by sonner
    await authClient.signIn.email(
      {
        email: values.email,
        password: values.password,
      },
      {
        onError: (context) => handleError(context, toastId, 'Sign In Failed'),
        onSuccess: async (context) => {
          if (context.data.twoFactorRedirect) {
            toast.dismiss(toastId);
            router.push('/auth/2fa');
          } else {
            toast.success('Sign In Successful', {
              id: toastId,
            });
            router.push('/');
          }
        },
      },
    );
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
          toast.success('Welcome back!');
          router.push('/');
        },
      },
    );
  }, [router]);

  return (
    <Form {...form}>
      <form
        className='w-100 bg-card flex flex-col gap-3.5 rounded-md border p-4 shadow-sm'
        onSubmit={form.handleSubmit(onSubmit)}
        tabIndex={0}
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
                  autoComplete='username webauthn'
                  placeholder='example@acme.com'
                  tabIndex={10}
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
                  className='underline hover:font-semibold'
                  href='/auth/forgot-password'
                >
                  Forgot password?
                </Link>
              </FormLabel>
              <FormControl>
                <Input
                  autoComplete='current-password webauthn'
                  placeholder={`\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022`}
                  tabIndex={10}
                  type='password'
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button tabIndex={10} type='submit'>
          Sign In
        </Button>
        <GoogleOAuth />
        <DiscordOAuth />
        <Link
          className="shadow-xs hover:bg-secondary/80 focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:hover:bg-primary/90 dark:aria-invalid:ring-destructive/40 inline-flex h-9 shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-md border bg-white px-4 py-2 text-sm font-medium text-black outline-none transition-all hover:cursor-pointer focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50 has-[>svg]:px-3 [&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0"
          href='/auth/magic-link'
        >
          Sign in with Magic Link
          <svg
            className='size-5'
            height='32'
            viewBox='0 0 24 24'
            width='32'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M4 20q-.825 0-1.412-.587T2 18V6q0-.825.588-1.412T4 4h16q.825 0 1.413.588T22 6v12q0 .825-.587 1.413T20 20zM20 8l-7.475 4.675q-.125.075-.262.113t-.263.037t-.262-.037t-.263-.113L4 8v10h16zm-8 3l8-5H4zM4 8v.25v-1.475v.025V6v.8v-.012V8.25zv10z'
              fill='currentColor'
            />
          </svg>
        </Link>
        <span>
          Don{"'"}t have an account? Make one{' '}
          <Link
            className='underline hover:font-medium hover:-tracking-[0.0565em]'
            href='/auth/sign-up'
          >
            here
          </Link>
          .
        </span>
      </form>
    </Form>
  );
};
