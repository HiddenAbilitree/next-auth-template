'use client';

import { cn } from '@/utils';
import * as LabelPrimitive from '@radix-ui/react-label';
import { ComponentProps } from 'react';

const Label = ({
  className,
  ...props
}: ComponentProps<typeof LabelPrimitive.Root>) => (
  <LabelPrimitive.Root
    data-slot='label'
    className={cn(
      'flex select-none items-center gap-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-50 group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50',
      className,
    )}
    {...props}
  />
);

export { Label };
