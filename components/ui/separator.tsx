'use client';

import * as SeparatorPrimitive from '@radix-ui/react-separator';
import { ComponentProps } from 'react';

import { cn } from '@/utils';

const Separator = ({
  className,
  decorative = true,
  orientation = `horizontal`,
  ...props
}: ComponentProps<typeof SeparatorPrimitive.Root>) => (
  <SeparatorPrimitive.Root
    className={cn(
      `shrink-0 bg-border data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px`,
      className,
    )}
    data-slot='separator-root'
    decorative={decorative}
    orientation={orientation}
    {...props}
  />
);

export { Separator };
