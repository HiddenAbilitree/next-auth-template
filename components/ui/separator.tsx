'use client';

import { cn } from '@/utils';
import * as SeparatorPrimitive from '@radix-ui/react-separator';
import { ComponentProps } from 'react';

const Separator = ({
  className,
  orientation = 'horizontal',
  decorative = true,
  ...props
}: ComponentProps<typeof SeparatorPrimitive.Root>) => (
  <SeparatorPrimitive.Root
    data-slot='separator-root'
    decorative={decorative}
    orientation={orientation}
    className={cn(
      'bg-border shrink-0 data-[orientation=horizontal]:h-px data-[orientation=vertical]:h-full data-[orientation=horizontal]:w-full data-[orientation=vertical]:w-px',
      className,
    )}
    {...props}
  />
);

export { Separator };
