import { Route } from 'next';
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
    <div className='mx-auto flex min-h-screen max-w-screen flex-col items-center'>
      <header className='flex w-full items-center justify-start p-4'>
        <Link href='/'>Go Home</Link>
      </header>
      <div className='container flex flex-col justify-center md:container md:flex-row'>
        <aside className='flex flex-col text-sm text-nowrap'>
          <nav className='sticky top-8 flex flex-col gap-2 px-4 md:w-3xs'>
            {generalLinks.map((link, i) => (
              <Link
                className='inline-flex items-center gap-1'
                href={link.href as Route}
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
