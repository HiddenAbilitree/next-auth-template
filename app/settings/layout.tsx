import Link from 'next/link';
import { ReactNode } from 'react';

import { ShieldUser } from '@/components/icons/shield-user';
import { Separator } from '@/components/ui/separator';

const generalLinks = [
  {
    href: `/settings/account`,
    icon: ShieldUser,
    name: `Account and Security`,
  },
];

export default function SettingsLayout({ children }: { children: ReactNode }) {
  return (
    <div className='mx-auto flex min-h-screen flex-col items-center'>
      <header className='flex w-full items-center justify-start p-4'>
        <Link href='/'>Go Home</Link>
      </header>
      <div className='relative flex w-full max-w-5xl justify-center'>
        <aside className='absolute left-0 h-full w-3xs -translate-x-full px-4 text-sm'>
          <nav className='sticky top-8 flex grow flex-col gap-2'>
            {generalLinks.map((link, i) => (
              <Link
                className='inline-flex items-center gap-1'
                href={link.href}
                key={i}
              >
                <link.icon className='size-6' />
                {link.name}
              </Link>
            ))}

            <Separator />
          </nav>
        </aside>
        <main className='flex h-[300vh] flex-1 flex-col items-start justify-start p-4'>
          {children}
        </main>
      </div>
    </div>
  );
}
