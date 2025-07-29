'use client';

import { arktypeResolver } from '@hookform/resolvers/arktype';
import { cva, type VariantProps } from 'class-variance-authority';
import { REGEXP_ONLY_DIGITS } from 'input-otp';
import { useRouter } from 'next/navigation';
import { ComponentProps } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { TwoFactorFormSchema } from '@/components/auth/types';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from '@/components/ui/input-otp';
import { Separator } from '@/components/ui/separator';
import { authClient } from '@/lib/auth-client';
import { cn } from '@/utils';

const formVariants = cva(`flex w-100 flex-col gap-4`, {
  defaultVariants: {
    variant: `default`,
  },
  variants: {
    variant: {
      card: `rounded-md border bg-card p-4 shadow-sm`,
      default: ``,
    },
  },
});

export const TwoFactorForm = ({
  className,
  variant,
}: ComponentProps<`form`> & VariantProps<typeof formVariants>) => {
  const router = useRouter();
  const form = useForm<typeof TwoFactorFormSchema.infer>({
    defaultValues: {
      otp: ``,
      trust: false,
    },
    resolver: arktypeResolver(TwoFactorFormSchema),
  });

  const onSubmit = async (data: typeof TwoFactorFormSchema.infer) => {
    void (await authClient.twoFactor.verifyTotp(
      { code: data.otp },
      {
        onError: (context) => {
          toast.error(context.error.message);
        },
        onSuccess: () => {
          router.push(`/`);
        },
      },
    ));
  };

  return (
    <Form {...form}>
      <form
        className={cn(formVariants({ className, variant }))}
        onSubmit={void form.handleSubmit(onSubmit)}
      >
        <div className='flex w-full flex-col gap-1'>
          <h1 className='w-full text-xl font-semibold'>
            Two Factor Authentication
          </h1>
          <p className='text-sm text-foreground/70'>
            Please enter the one-time password found in your authenticator
            service.
          </p>
        </div>
        <Separator />
        <FormField
          control={form.control}
          name='otp'
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <InputOTP
                  maxLength={6}
                  {...field}
                  autoComplete='totp'
                  onComplete={form.handleSubmit(onSubmit)}
                  pattern={REGEXP_ONLY_DIGITS}
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
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='trust'
          render={({ field }) => (
            <FormItem className='flex items-center'>
              <FormControl>
                <Checkbox
                  checked={field.value}
                  id='trust'
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <label
                className='text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
                htmlFor='trust'
              >
                Trust this device for 30 days.
              </label>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type='submit'>Submit</Button>
      </form>
    </Form>
  );
};
