'use client';

import { OTPInput, OTPInputContext } from 'input-otp';
import { MinusIcon } from 'lucide-react';
import * as React from 'react';

import { cn } from '@/utils';

const InputOTP = ({
  className,
  containerClassName,
  ...props
}: React.ComponentProps<typeof OTPInput> & {
  containerClassName?: string;
}) => (
  <OTPInput
    className={cn(`disabled:cursor-not-allowed`, className)}
    containerClassName={cn(
      `flex items-center gap-2 has-disabled:opacity-50`,
      containerClassName,
    )}
    data-slot='input-otp'
    {...props}
  />
);

const InputOTPGroup = ({
  className,
  ...props
}: React.ComponentProps<`div`>) => (
  <div
    className={cn(`flex w-full items-center`, className)}
    data-slot='input-otp-group'
    {...props}
  />
);

const InputOTPSlot = ({
  className,
  index,
  ...props
}: React.ComponentProps<`div`> & {
  index: number;
}) => {
  const inputOTPContext = React.useContext(OTPInputContext);
  const { char, hasFakeCaret, isActive } = inputOTPContext?.slots[index] ?? {};

  return (
    <div
      className={cn(
        `relative flex h-12 flex-1 items-center justify-center border-y border-r border-border text-lg font-medium shadow-xs transition-all outline-none first:rounded-l-md first:border-l last:rounded-r-md aria-invalid:border-destructive data-[active=true]:z-10 data-[active=true]:border-ring data-[active=true]:ring-[3px] data-[active=true]:ring-ring/50 data-[active=true]:aria-invalid:border-destructive data-[active=true]:aria-invalid:ring-destructive/20 dark:bg-input/30 dark:data-[active=true]:aria-invalid:ring-destructive/40`,
        className,
      )}
      data-active={isActive}
      data-slot='input-otp-slot'
      {...props}
    >
      {char}
      {hasFakeCaret && (
        <div className='pointer-events-none absolute inset-0 flex items-center justify-center'>
          <div className='h-4 w-px animate-caret-blink bg-foreground duration-1000' />
        </div>
      )}
    </div>
  );
};

const InputOTPSeparator = ({ ...props }: React.ComponentProps<`div`>) => (
  <div data-slot='input-otp-separator' role='separator' {...props}>
    <MinusIcon />
  </div>
);

export { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot };
