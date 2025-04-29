import { DeleteAccount } from '@/components/auth/DeleteAccount';
import { EnableTwoFactor } from '@/components/auth/EnableTwoFactor';
import { AddPasskey } from '@/components/auth/Passkey';
import { SignOut } from '@/components/auth/SignOut';
import { Button } from '@/components/ui/button';
export default function Home() {
  return (
    <section className='flex h-screen flex-col items-center justify-center gap-4'>
      <span className='text-9xl'>Hi there</span>
      <Button>Button</Button>
      <SignOut />
      <DeleteAccount />
      <AddPasskey />
      <EnableTwoFactor />
    </section>
  );
}
