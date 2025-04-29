'use client';
import { authClient } from '@/lib/auth-client';
import { Button } from '@/components/ui/button';
import { arktypeResolver } from '@hookform/resolvers/arktype';
import { PasswordFormSchema } from '@/lib/schemas/auth';
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { QRCodeSVG } from 'qrcode.react';
import { BaseSyntheticEvent, useState } from 'react';
import { TwoFactorForm } from '@/components/auth/TwoFactorForm';

export const EnableTwoFactor = () => {
  const [openPasswordForm, setOpenPasswordForm] = useState(false);
  const [openTOTP, setOpenTOTP] = useState(false);
  const [totpURI, setTOTPURI] = useState<string | undefined>();
  return (
    <>
      <Dialog open={openPasswordForm} onOpenChange={setOpenPasswordForm}>
        <Button variant='outline' onClick={() => setOpenPasswordForm(true)}>
          Enable 2FA
        </Button>
        <DialogContent className='sm:max-w-[425px]'>
          <DialogHeader>
            <DialogTitle>Enable 2FA</DialogTitle>
            <DialogDescription>
              Enter your password to enable 2FA
            </DialogDescription>
          </DialogHeader>
          <PasswordForm
            setOpenPasswordForm={setOpenPasswordForm}
            setOpenTOTP={setOpenTOTP}
            setTOTPURI={setTOTPURI}
          />
        </DialogContent>
      </Dialog>
      <Dialog open={openTOTP} onOpenChange={setOpenTOTP}>
        <DialogContent autoFocus className='sm:max-w-[425px]'>
          <DialogHeader>
            <DialogTitle>Enable 2FA</DialogTitle>
            <DialogDescription>
              Enter your password to enable 2FA
            </DialogDescription>
            <VerifyTOTP totpURI={totpURI ?? ''} />
            <TwoFactorForm />
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
};

export const PasswordForm = ({
  setOpenPasswordForm,
  setOpenTOTP,
  setTOTPURI,
}: {
  setOpenPasswordForm(val: boolean): void; //react is so trash holy
  setOpenTOTP(val: boolean): void;
  setTOTPURI(val: string): void;
}) => {
  const onSubmit = async (
    values: typeof PasswordFormSchema.infer,
    event?: BaseSyntheticEvent,
  ) => {
    await authClient.twoFactor.enable(
      {
        password: values.password,
      },
      {
        onSuccess: async (context) => {
          setTOTPURI(context.data.totpURI);
          setOpenPasswordForm(false);
          setOpenTOTP(true);
          event?.preventDefault();
        },
        onError: () => void toast.error('Incorrect Password'),
      },
    );
  };

  const form = useForm<typeof PasswordFormSchema.infer>({
    resolver: arktypeResolver(PasswordFormSchema),
    defaultValues: {
      password: '',
    },
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='flex flex-col gap-5 rounded-md'
      >
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
        <Button type='submit'>Enable TOTP 2fa</Button>
      </form>
    </Form>
  );
};

export const VerifyTOTP = ({ totpURI }: { totpURI: string }) => {
  return <QRCodeSVG value={totpURI} size={256} />;
};
