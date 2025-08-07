'use client';

import { arktypeResolver } from '@hookform/resolvers/arktype';
import { Smartphone } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { TwoFactorForm } from '@/components/auth/forms/two-factor';
import { PasswordFormSchema } from '@/components/auth/types';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { useHasPassword } from '@/hooks/has-password';
import { authClient } from '@/lib/auth-client';

export const TwoFactor = ({
  twoFactorEnabled,
}: {
  twoFactorEnabled: boolean | null | undefined;
}) => (
  <div className='flex items-center gap-2'>
    <Smartphone />
    Authenticator
    {twoFactorEnabled && (
      <Badge
        className='border-green-[#3FB950] text-green-[#3FB950]'
        variant='outline'
      >
        Enabled
      </Badge>
    )}
  </div>
);

export const EnableTwoFactor = () => {
  const [openPasswordForm, setOpenPasswordForm] = useState(false);
  const [openTOTP, setOpenTOTP] = useState(false);
  const [totpURI, setTOTPURI] = useState<string | undefined>();

  const onSubmit = async (values: typeof PasswordFormSchema.infer) => {
    await authClient.twoFactor.enable(
      {
        password: values.password,
      },
      {
        onError: () => void toast.error(`Incorrect Password`),
        onSuccess: (context: { data: { totpURI: string } }) => {
          setTOTPURI(context.data.totpURI);
          setOpenPasswordForm(false);
          setOpenTOTP(true);
        },
      },
    );
  };

  const form = useForm<typeof PasswordFormSchema.infer>({
    defaultValues: {
      password: ``,
    },
    resolver: arktypeResolver(PasswordFormSchema),
  });

  const hasPassword = useHasPassword();
  return (
    <div className='relative'>
      {openTOTP && (
        <button
          className='absolute top-2 right-2 size-11 rounded-full border hover:cursor-pointer'
          onClick={() => {
            setOpenTOTP(false);
          }}
        >
          X
        </button>
      )}
      {!openTOTP && (
        <Dialog onOpenChange={setOpenPasswordForm} open={openPasswordForm}>
          <Tooltip>
            <TooltipTrigger>
              <Button
                disabled={!hasPassword}
                onClick={() => setOpenPasswordForm(true)}
                variant='outline'
              >
                Enable 2FA
              </Button>
            </TooltipTrigger>
            {!hasPassword && (
              <TooltipContent>
                <p>Set a password first</p>
              </TooltipContent>
            )}
          </Tooltip>
          <DialogContent className='sm:max-w-[425px]'>
            <DialogHeader>
              <DialogTitle>Enable 2FA</DialogTitle>
              <DialogDescription>
                Enter your password to enable 2FA
              </DialogDescription>
            </DialogHeader>

            <Form {...form}>
              <form
                className='flex flex-col gap-5 rounded-md'
                onSubmit={form.handleSubmit(onSubmit)}
              >
                <FormField
                  control={form.control}
                  name='password'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          placeholder='••••••••'
                          type='password'
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type='submit'>Enable TOTP 2fa</Button>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      )}
      {openTOTP && (
        <div className='flex gap-5'>
          <VerifyTOTP totpURI={totpURI ?? ``} /> <TwoFactorForm />
        </div>
      )}
    </div>
  );
};

export const VerifyTOTP = ({ totpURI }: { totpURI: string }) => (
  <div className='bg-white p-2'>
    <QRCodeSVG size={256} value={totpURI} />
  </div>
);
