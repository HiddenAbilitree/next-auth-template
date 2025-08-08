'use client';

import { arktypeResolver } from '@hookform/resolvers/arktype';
import { REGEXP_ONLY_DIGITS } from 'input-otp';
import { ComponentProps } from 'react';
import { ControllerRenderProps, FieldValues, useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { TwoFactorFormSchema } from '@/components/auth/types';
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
import { authClient } from '@/lib/auth-client';
import { cn } from '@/utils';

export const TwoFactorInput = <T extends FieldValues>(
  props: ControllerRenderProps<T>,
) => (
  <InputOTP
    maxLength={6}
    {...props}
    autoComplete='totp'
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
);

export const TwoFactorForm = ({
  className,
  id,
  onSuccess,
  ...props
}: ComponentProps<`form`> & { onSuccess: () => void }) => {
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
        onSuccess: onSuccess,
      },
    ));
  };

  return (
    <Form {...form}>
      <form
        id={id}
        {...props}
        className={cn(className, `w-full`)}
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name='otp'
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <TwoFactorInput {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
};
