'use client';

import { arktypeResolver } from '@hookform/resolvers/arktype';
import { QRCodeSVG } from 'qrcode.react';
import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from 'react';
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
  DialogClose,
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
import { authClient } from '@/lib/auth-client';

export const TwoFactor = () => {
  const { data } = authClient.useSession();
  const twoFactorEnabled = data?.user.twoFactorEnabled;

  return (
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
};

const TwoFactorContext = createContext<
  | undefined
  | {
      passwordOpen: boolean;
      setPasswordOpen: Dispatch<SetStateAction<boolean>>;
      setTotpUri: Dispatch<SetStateAction<string>>;
      setTwoFactorOpen: Dispatch<SetStateAction<boolean>>;
      totpUri: string;
      twoFactorOpen: boolean;
    }
>(undefined);

export const EnableTwoFactor = () => {
  const { data } = authClient.useSession();
  const twoFactorEnabled = data?.user.twoFactorEnabled;

  const [passwordOpen, setPasswordOpen] = useState(false);
  const [twoFactorOpen, setTwoFactorOpen] = useState(false);
  const [totpUri, setTotpUri] = useState<string>(``);

  const hasPassword = useHasPassword();

  const onSubmit = async (values: typeof PasswordFormSchema.infer) => {
    await authClient.twoFactor.disable(
      {
        password: values.password,
      },
      {
        onError: () => void toast.error(`Incorrect Password`),
        onSuccess: (context: { data: { totpURI: string } }) => {
          setTotpUri(context.data.totpURI);
          setTwoFactorOpen(true);
          setPasswordOpen(false);
        },
      },
    );
  };
  const passwordForm = useForm<typeof PasswordFormSchema.infer>({
    defaultValues: {
      password: ``,
    },
    resolver: arktypeResolver(PasswordFormSchema),
  });
  if (twoFactorEnabled) {
    return (
      <Dialog>
        <Button asChild>
          <DialogTrigger>Disable 2FA</DialogTrigger>
        </Button>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Disable 2FA</DialogTitle>
            <DialogDescription>
              Enter your password to disable 2FA.
            </DialogDescription>
          </DialogHeader>
          <Form {...passwordForm}>
            <form
              className='flex flex-col gap-5 rounded-md'
              id='disable-2fa-form'
              onSubmit={passwordForm.handleSubmit(onSubmit)}
            >
              <FormField
                control={passwordForm.control}
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
            <DialogClose>
              <Button variant='outline'>Cancel</Button>
            </DialogClose>
            <DialogClose>
              <Button
                form='disable-2fa-form'
                type='submit'
                variant='destructive'
              >
                Confirm
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <TwoFactorContext
      value={{
        passwordOpen,
        setPasswordOpen,
        setTotpUri,
        setTwoFactorOpen,
        totpUri,
        twoFactorOpen,
      }}
    >
      <Tooltip>
        <TooltipTrigger>
          <Button
            disabled={!hasPassword}
            onClick={() => setPasswordOpen(true)}
            variant='outline'
          >
            Enable 2FA
          </Button>
        </TooltipTrigger>
        {!hasPassword && (
          <TooltipContent className='border'>
            <p>Set a password first</p>
          </TooltipContent>
        )}
      </Tooltip>
      <TwoFactorDialog />
    </TwoFactorContext>
  );
};

const TwoFactorDialog = () => {
  const passwordForm = useForm<typeof PasswordFormSchema.infer>({
    defaultValues: {
      password: ``,
    },
    resolver: arktypeResolver(PasswordFormSchema),
  });

  const {
    passwordOpen,
    setPasswordOpen,
    setTotpUri,
    setTwoFactorOpen,
    totpUri,
    twoFactorOpen,
  } = useContext(TwoFactorContext)!;

  const onSubmit = async (values: typeof PasswordFormSchema.infer) => {
    await authClient.twoFactor.enable(
      {
        password: values.password,
      },
      {
        onError: () => void toast.error(`Incorrect Password`),
        onSuccess: (context: { data: { totpURI: string } }) => {
          setTotpUri(context.data.totpURI);
          setTwoFactorOpen(true);
          setPasswordOpen(false);
        },
      },
    );
  };

  if (totpUri) {
    const secret = new URL(totpUri).searchParams.get(`secret`) ?? ``;
    return (
      <Dialog onOpenChange={setTwoFactorOpen} open={twoFactorOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Enable 2FA</DialogTitle>
            <DialogDescription>
              Scan the QR code with your chosen authenticator app.
            </DialogDescription>
          </DialogHeader>
          <div className='flex w-full flex-col items-center justify-center'>
            <div className='size-min bg-white p-2'>
              {(totpUri && <QRCodeSVG size={256} value={totpUri} />) ?? (
                <span>Error: Invalid TOTP URI.</span>
              )}
            </div>
          </div>
          <DialogDescription>... or, copy the secret below</DialogDescription>

          <div className='flex w-full flex-col items-center justify-center'>
            <p
              className='flex w-min shrink items-center gap-2 rounded bg-accent p-2 text-2xs transition-colors hover:cursor-pointer hover:bg-accent/80'
              onClick={() => {
                navigator.clipboard.writeText(secret).then(
                  () => toast.success(`Copied to clipboard`),
                  () => toast.error(`Failed to copy to clipboard`),
                );
              }}
            >
              {secret}
              <Copy className='size-3' />
            </p>
          </div>

          <DialogDescription>Then, enter the code below</DialogDescription>

          <div className='flex w-full flex-col items-center justify-center'>
            <TwoFactorForm id='two-factor-form' />
          </div>
          <DialogFooter>
            <Button form='two-factor-form' type='submit'>
              Enable 2FA
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }
  return (
    <Dialog onOpenChange={setPasswordOpen} open={passwordOpen}>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>Enable 2FA</DialogTitle>
          <DialogDescription>
            Enter your password to enable 2FA
          </DialogDescription>
        </DialogHeader>

        <Form {...passwordForm}>
          <form
            className='flex flex-col gap-5 rounded-md'
            id='2fa-form'
            onSubmit={passwordForm.handleSubmit(onSubmit)}
          >
            <FormField
              control={passwordForm.control}
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
          <Button form='2fa-form' type='submit'>
            Enable 2FA
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
