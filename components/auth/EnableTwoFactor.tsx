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
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useForm } from 'react-hook-form';

export const EnableTwoFactor = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant='outline'>Enable 2FA</Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <PasswordForm />
        <DialogFooter>
          <Button type='submit'>Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export const PasswordForm = () => {
  const onSubmit = async (values: typeof PasswordFormSchema.infer) => {
    // const toastId = toast.loading('Sending email...');
    const { error } = await authClient.twoFactor.enable({
      password: values.password,
    });
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
