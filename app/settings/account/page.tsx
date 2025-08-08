import { AddPasskey } from '@/components/auth/buttons/add-passkey';
import { DeleteAccount } from '@/components/auth/buttons/delete-account';
import {
  EnableTwoFactor,
  TwoFactor,
} from '@/components/auth/buttons/enable-two-factor';
import { PasswordSettings } from '@/components/auth/forms/change-password';
import { PasskeySettings } from '@/components/settings/passkey';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';

export default function AuthSettings() {
  return (
    <div className='container flex flex-col items-center justify-center gap-4'>
      <Accordion className='w-full' type='multiple'>
        <AccordionItem asChild value='password'>
          <div className='flex flex-col gap-1'>
            <span className='inline-flex w-full items-center justify-between border-b p-1'>
              <h1 className='text-2xl font-medium'>Password</h1>
              <AccordionTrigger asChild>
                <Button size='sm' variant='secondary'>
                  Change Password
                </Button>
              </AccordionTrigger>
            </span>
            <AccordionContent className='border-none p-1'>
              <PasswordSettings />
            </AccordionContent>
            <span className='p-1'>Always Showing</span>
          </div>
        </AccordionItem>
      </Accordion>
      <div className='flex w-full flex-col gap-1'>
        <h1 className='inline-flex w-full items-center justify-between border-b p-1 text-2xl font-medium'>
          Passkeys
          <AddPasskey />
        </h1>
        <PasskeySettings />
      </div>
      <div className='flex w-full flex-col gap-1'>
        <h1 className='inline-flex w-full items-center justify-between border-b p-1 text-2xl font-medium'>
          Two Factor Methods
        </h1>
        <div className='flex justify-between p-1'>
          <TwoFactor />
          <EnableTwoFactor />
        </div>
      </div>
      <div className='flex w-full flex-col gap-2'>
        <h1 className='inline-flex w-full items-center justify-between border-b p-1 text-2xl font-medium'>
          Danger Zone
        </h1>
        <DeleteAccount />
      </div>
    </div>
  );
}
