import { SignOut } from '@/components/auth/SignOut';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
export default function Home() {
  return (
    <section className='flex h-screen flex-col items-center justify-center gap-4'>
      <span className='text-9xl'>Hi there</span>
      <Button asChild>
        <Link href='/settings/auth'>Auth Settings</Link>
      </Button>
      <SignOut />
    </section>
  );
}
