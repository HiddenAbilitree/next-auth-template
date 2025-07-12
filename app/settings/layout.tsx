import { ShieldUser } from 'lucide-react';
import Link from 'next/link';
import { ReactNode } from 'react';

import { Separator } from '@/components/ui/separator';

const generalLinks = [
  {
    href: '/settings/account',
    icon: ShieldUser,
    name: 'Account and Security',
  },
];

export default function SettingsLayout({ children }: { children: ReactNode }) {
  return (
    <div className='container flex h-screen flex-col items-center'>
      <header className='flex w-full items-center justify-start p-4'>
        hii this is ur settings page
      </header>
      <div className='flex w-full'>
        <nav className='w-50 flex flex-col gap-2 p-4 text-sm'>
          {generalLinks.map((link, i) => (
            <Link
              className='inline-flex items-center gap-1'
              href={link.href}
              key={i}
            >
              <link.icon size={20} />
              {link.name}
            </Link>
          ))}

          <Separator />
        </nav>
        <main className='flex h-[300vh] flex-1 flex-col items-start justify-start p-4'>
          {children}
        </main>
      </div>
    </div>
  );
}
