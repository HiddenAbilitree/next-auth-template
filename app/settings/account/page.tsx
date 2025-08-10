import { AddPasskey } from '@/components/auth/buttons/add-passkey';
import { DeleteAccount } from '@/components/auth/buttons/delete-account';
import { PasswordSettings } from '@/components/auth/forms/change-password';
import { PasskeySettings } from '@/components/settings/passkey';
import { Sessions } from '@/components/settings/sessions';
import { TwoFactorSettings } from '@/components/settings/two-factor';

export default function AuthSettings() {
  return (
    <div className='container flex max-w-full flex-col items-center justify-center gap-4'>
      <div className='flex w-full flex-col gap-1'>
        <span className='inline-flex w-full items-center justify-between border-b p-1'>
          <h1 className='text-2xl font-medium'>Password</h1>
          <PasswordSettings />
        </span>
      </div>
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
          <TwoFactorSettings />
        </div>
      </div>
      <div className='flex w-full flex-col gap-2'>
        <h1 className='inline-flex w-full items-center justify-between border-b p-1 text-2xl font-medium'>
          Sessions
        </h1>
        <Sessions />
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
