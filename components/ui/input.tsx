import { ComponentProps } from 'react';

import { cn } from '@/utils';

const Input = ({ className, type, ...props }: ComponentProps<`input`>) => (
  <input
    className={cn(
      `flex h-9 w-full min-w-0 rounded-sm border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm dark:bg-input/30`,
      `focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50`,
      `aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40`,
      className,
    )}
    data-slot='input'
    type={type}
    {...props}
  />
);

export { Input };
