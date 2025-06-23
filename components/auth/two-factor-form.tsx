'use client';

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
import { arktypeResolver } from '@hookform/resolvers/arktype';
import { type VariantProps, cva } from 'class-variance-authority';
import { REGEXP_ONLY_DIGITS } from 'input-otp';
import { useRouter } from 'next/navigation';
import { ComponentProps } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

const formVariants = cva('w-100 flex flex-col gap-4', {
  variants: {
    variant: {
      default: '',
      card: 'bg-card rounded-md border p-4 shadow-sm',
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
      trust: false,
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
        <div className='flex w-full flex-col gap-1'>
          <h1 className='w-full text-xl font-semibold'>
            Two Factor Authentication
          </h1>
          <p className='text-foreground/70 text-sm'>
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
                  pattern={REGEXP_ONLY_DIGITS}
                  autoComplete='totp'
                  onComplete={form.handleSubmit(onSubmit)}
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
                  id='trust'
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <label
                htmlFor='trust'
                className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
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
