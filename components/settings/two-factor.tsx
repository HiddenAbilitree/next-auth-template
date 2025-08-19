'use client';

import { arktypeResolver } from '@hookform/resolvers/arktype';
import { QRCodeSVG } from 'qrcode.react';
import { Dispatch, ReactNode, SetStateAction, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { TwoFactorForm } from '@/components/auth/forms/two-factor';
import { PasswordInput } from '@/components/auth/password-input';
import { PasswordFormSchema } from '@/components/auth/types';
import { Copy } from '@/components/icons/copy';
import { Smartphone } from '@/components/icons/smartphone';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { useHasPassword } from '@/hooks/has-password';
import { useTwoFactorStatus } from '@/hooks/two-factor';
import { authClient } from '@/lib/auth-client';
import { tryCatch } from '@/utils/try-catch';

export const TwoFactorSettings = () => {
  const twoFactorEnabled = useTwoFactorStatus();

  return (
    <div className='flex w-full items-center justify-between gap-8'>
      <div className='flex flex-wrap items-center gap-2.5'>
        <span className='flex items-center gap-1'>
          <Smartphone />
          Authenticator
        </span>
        {twoFactorEnabled && (
          <Badge
            className='border-green-500 bg-[--var(gray-1)] text-green-500'
            variant='outline'
          >
            Enabled
          </Badge>
        )}
      </div>
      <div>
        {twoFactorEnabled ?
          <Disable2FAButton />
        : <Enable2FAButton />}
      </div>
    </div>
  );
};

const Enable2FAButton = () => {
  const hasPassword = useHasPassword();
  const [showPasswordDialog, setShowPasswordDialog] = useState(false);
  const [showSetupDialog, setShowSetupDialog] = useState(false);
  const [totpUri, setTotpUri] = useState(``);

  const handleSubmit = async (values: typeof PasswordFormSchema.infer) => {
    const result = await authClient.twoFactor.enable(
      { password: values.password },
      {
        onError: () => void toast.error(`Incorrect Password`),
        onSuccess: (context: { data: { totpURI: string } }) => {
          setTotpUri(context.data.totpURI);
          setShowSetupDialog(true);
          setShowPasswordDialog(false);
        },
      },
    );
    return result;
  };

  return hasPassword ?
      <>
        <Button onClick={() => setShowPasswordDialog(true)} variant='outline'>
          Enable 2FA
        </Button>
        <PasswordDialog
          description='Please enter your password to proceed with enabling 2FA.'
          onConfirm={handleSubmit}
          open={showPasswordDialog}
          setOpen={setShowPasswordDialog}
          submitText='Continue'
          title='Enable Two-Factor Authentication'
        />
        <Setup2FADialog
          open={showSetupDialog}
          setOpen={setShowSetupDialog}
          totpUri={totpUri}
        />
      </>
    : <Tooltip>
        <TooltipTrigger asChild>
          <div>
            <Button disabled variant='outline'>
              Enable 2FA
            </Button>
          </div>
        </TooltipTrigger>
        <TooltipContent className='border'>
          <p>Set a password first to enable 2FA.</p>
        </TooltipContent>
      </Tooltip>;
};

const Disable2FAButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSubmit = async (values: typeof PasswordFormSchema.infer) => {
    await authClient.twoFactor.disable(
      { password: values.password },
      {
        onError: () => void toast.error(`Incorrect Password`),
        onSuccess: () => {
          toast.success(`Two-factor authentication has been disabled.`);
          setIsOpen(false);
        },
      },
    );
  };

  return (
    <PasswordDialog
      description='Enter your password to disable 2FA. This will reduce your account security.'
      onConfirm={handleSubmit}
      open={isOpen}
      setOpen={setIsOpen}
      submitText='Disable 2FA'
      title='Disable Two-Factor Authentication'
      trigger={<Button variant='destructive'>Disable 2FA</Button>}
      variant='destructive'
    />
  );
};

const PasswordDialog = ({
  description,
  onConfirm,
  open,
  setOpen,
  submitText,
  title,
  trigger,
  variant = `default`,
}: {
  description: string;
  onConfirm: (_values: typeof PasswordFormSchema.infer) => void;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  submitText: string;
  title: string;
  trigger?: ReactNode;
  variant?: `default` | `destructive`;
}) => {
  const form = useForm<typeof PasswordFormSchema.infer>({
    defaultValues: { password: `` },
    resolver: arktypeResolver(PasswordFormSchema),
  });

  const { isSubmitting } = form.formState;

  const handleSubmit = (values: typeof PasswordFormSchema.infer) => {
    void onConfirm(values);
    form.reset();
  };

  const content = (
    <DialogContent className='sm:max-w-[425px]'>
      <DialogHeader>
        <DialogTitle>{title}</DialogTitle>
        <DialogDescription>{description}</DialogDescription>
      </DialogHeader>
      <Form {...form}>
        <form
          id='password-confirm-form'
          onSubmit={form.handleSubmit(handleSubmit)}
        >
          <FormField
            control={form.control}
            name='password'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <PasswordInput {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
      <DialogFooter>
        <Button
          disabled={isSubmitting}
          onClick={() => setOpen(false)}
          variant='outline'
        >
          Cancel
        </Button>
        <Button
          disabled={isSubmitting}
          form='password-confirm-form'
          type='submit'
          variant={variant}
        >
          {submitText}
        </Button>
      </DialogFooter>
    </DialogContent>
  );

  return trigger ?
      <Dialog onOpenChange={setOpen} open={open}>
        <DialogTrigger asChild>{trigger}</DialogTrigger>
        {content}
      </Dialog>
    : <Dialog onOpenChange={setOpen} open={open}>
        {content}
      </Dialog>;
};

const Setup2FADialog = ({
  open,
  setOpen,
  totpUri,
}: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  totpUri: string;
}) => {
  const secret = useMemo(() => {
    const [secret] = tryCatch(() =>
      new URL(totpUri).searchParams.get(`secret`),
    );

    return secret ?? ``;
  }, [totpUri]);

  const handleCopy = () => {
    navigator.clipboard.writeText(secret).then(
      () => toast.success(`Secret copied to clipboard`),
      () => toast.error(`Failed to copy secret`),
    );
  };

  if (!totpUri || !secret) return;

  return (
    <Dialog onOpenChange={setOpen} open={open}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Set Up Two-Factor Authentication</DialogTitle>
          <DialogDescription>
            Scan the QR code with your authenticator app, then enter the
            generated code to finish setup.
          </DialogDescription>
        </DialogHeader>
        <div className='flex flex-col items-center gap-4 py-4'>
          <div className='rounded-lg bg-white p-2'>
            <QRCodeSVG size={220} value={totpUri} />
          </div>
          <Button className='bg-muted' onClick={handleCopy} variant='secondary'>
            Or copy the secret key
            <Copy className='size-4' />
          </Button>
        </div>
        <TwoFactorForm id='two-factor-form' onSuccess={() => setOpen(false)} />
        <DialogFooter>
          <Button onClick={() => setOpen(false)} variant='outline'>
            Cancel
          </Button>
          <Button form='two-factor-form' type='submit'>
            Verify & Enable
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
