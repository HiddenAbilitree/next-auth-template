import Link from 'next/link';

import { SignOut } from '@/components/auth/buttons/sign-out';
import { Button } from '@/components/ui/button';

export default function Home() {
  return (
    <section className='flex h-screen flex-col items-center justify-center gap-4'>
      <span className='text-9xl'>next-auth-template</span>
      <Button asChild>
        <Link href='/settings/account'>Auth Settings</Link>
      </Button>
      <SignOut />
    </section>
  );
}
