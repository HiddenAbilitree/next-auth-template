'use client';

import { arktypeResolver } from '@hookform/resolvers/arktype';
import { useForm } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from '@/components/ui/input-otp';
import { TwoFactorFormSchema } from '@/lib/schemas/auth';
import { authClient } from '@/lib/auth-client';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { REGEXP_ONLY_DIGITS } from 'input-otp';
import { cn } from '@/lib/utils';
import { cva, type VariantProps } from 'class-variance-authority';
import { ComponentProps } from 'react';

const formVariants = cva('flex w-100 flex-col gap-5', {
  variants: {
    variant: {
      default: '',
      card: 'rounded-md border bg-card p-4 shadow-sm',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

export const TwoFactorForm = ({
  className,
  variant,
}: ComponentProps<'form'> & VariantProps<typeof formVariants>) => {
  const router = useRouter();
  const form = useForm<typeof TwoFactorFormSchema.infer>({
    resolver: arktypeResolver(TwoFactorFormSchema),
    defaultValues: {
      otp: '',
    },
  });

  const onSubmit = async (data: typeof TwoFactorFormSchema.infer) => {
    void (await authClient.twoFactor.verifyTotp(
      { code: data.otp },
      {
        onSuccess: () => {
          router.push('/');
        },
        onError: (context) => {
          toast.error(context.error.message);
        },
      },
    ));
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn(formVariants({ variant, className }))}
      >
        <FormField
          control={form.control}
          name='otp'
          render={({ field }) => (
            <FormItem>
              <FormLabel>One-Time Password</FormLabel>
              <FormControl>
                <InputOTP
                  maxLength={6}
                  {...field}
                  pattern={REGEXP_ONLY_DIGITS}
                  autoComplete='totp'
                >
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>
              </FormControl>
              <FormDescription>
                Please enter the one-time password found in your authenticator
                service.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type='submit'>Submit</Button>
      </form>
    </Form>
  );
};
