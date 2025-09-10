import Link from 'next/link';

import { Github } from '@/components/icons/github';
import { Button } from '@/components/ui/button';

export const GithubLink = () => (
  <Button asChild variant='outline'>
    <Link
      className='fixed bottom-3 left-3 rounded-full!'
      href='https://github.com/HiddenAbilitree/next-auth-template'
    >
      <Github />
      View on GitHub
    </Link>
  </Button>
);
