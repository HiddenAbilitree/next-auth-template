'use client';

import * as LabelPrimitive from '@radix-ui/react-label';
import { ComponentProps } from 'react';

import { cn } from '@/utils';

const Label = ({
  className,
  ...props
}: ComponentProps<typeof LabelPrimitive.Root>) => (
  <LabelPrimitive.Root
    className={cn(
      `flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50`,
      className,
    )}
    data-slot='label'
    {...props}
  />
);

export { Label };
