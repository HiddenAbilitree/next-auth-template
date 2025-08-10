'use client';

import { arktypeResolver } from '@hookform/resolvers/arktype';
import { type } from 'arktype';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { DiscordOAuth, GoogleOAuth } from '@/components/auth/oauth';
import { PasswordInput } from '@/components/auth/password-input';
import { Email } from '@/components/auth/types';
import { handleError } from '@/components/auth/utils';
import { Mail } from '@/components/icons/mail';
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
import { cardStyles } from '@/styles';

const SignInFormSchema = type({
  email: Email,
  password: `string`,
});

export const SignInForm = () => {
  const router = useRouter();

  const form = useForm<typeof SignInFormSchema.infer>({
    defaultValues: {
      email: ``,
      password: ``,
    },
    resolver: arktypeResolver(SignInFormSchema),
  });

  const onSubmit = async (values: typeof SignInFormSchema.infer) => {
    const toastId = toast.loading(`Signing in...`);

    // cant use toast.promise because authClient returns
    // something different to what is expected by sonner
    await authClient.signIn.email(
      {
        email: values.email,
        password: values.password,
      },
      {
        onError: (context) => handleError(context, toastId, `Sign In Failed`),
        onSuccess: (context: {
          data: { twoFactorRedirect: string /* cooked */ };
        }) => {
          if (context.data.twoFactorRedirect) {
            toast.dismiss(toastId);
            router.push(`/auth/2fa`);
          } else {
            toast.success(`Sign In Successful`, {
              id: toastId,
            });
            router.push(`/`);
          }
        },
      },
    );
  };

  // https://www.better-auth.com/docs/plugins/passkey#preload-the-passkeys
  useEffect(() => {
    const isPasskeyAvailable = async () =>
      PublicKeyCredential.isConditionalMediationAvailable();

    void isPasskeyAvailable().then((available) => {
      if (!available) return;
      void authClient.signIn.passkey(
        { autoFill: true },
        {
          onSuccess: () => {
            toast.success(`Welcome back!`);
            router.push(`/`);
          },
        },
      );
    });
  }, [router]);

  return (
    <Form {...form}>
      <form className={cardStyles} onSubmit={form.handleSubmit(onSubmit)}>
        <div className='flex w-full flex-col gap-4'>
          <h1 className='w-full text-xl font-semibold'>Sign In</h1>
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
                  placeholder='username@domain.tld'
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
                  className='underline transition-colors hover:text-foreground/80'
                  href='/auth/forgot-password'
                >
                  Forgot password?
                </Link>
              </FormLabel>
              <FormControl>
                <PasswordInput {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type='submit'>Sign In</Button>
        <div className='flex w-full items-center gap-3.5'>
          <Separator className='flex flex-1' />
          <span className='text-xs text-foreground/50'>OR</span>
          <Separator className='flex flex-1' />
        </div>
        <GoogleOAuth />
        <DiscordOAuth />
        <Button asChild variant='outline'>
          <Link href='/auth/magic-link'>
            <Mail />
            Sign in with Magic Link
          </Link>
        </Button>
        <span>
          Don{`'`}t have an account? Make one{` `}
          <Link
            className='text-foreground underline transition-colors hover:text-foreground/80'
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
