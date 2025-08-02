import { ComponentProps } from 'react';

import { cn } from '@/utils';

const Skeleton = ({ className, ...props }: ComponentProps<`div`>) => (
  <div
    className={cn(`animate-pulse rounded-md bg-accent`, className)}
    data-slot='skeleton'
    {...props}
  />
);

export { Skeleton };
