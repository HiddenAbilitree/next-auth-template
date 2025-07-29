import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { ComponentProps } from 'react';

import { cn } from '@/utils';

const buttonVariants = cva(
  `inline-flex shrink-0 items-center justify-center gap-2 rounded-sm text-sm font-medium whitespace-nowrap transition-all outline-none hover:cursor-pointer focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4`,
  {
    defaultVariants: {
      size: `default`,
      variant: `default`,
    },
    variants: {
      size: {
        default: `h-9 px-4 py-2 has-[>svg]:px-3`,
        icon: `size-9`,
        lg: `h-10 px-6 has-[>svg]:px-4`,
        sm: `h-8 gap-1.5 px-3 has-[>svg]:px-2.5`,
        xs: `h-6 gap-1.5 px-2 has-[>svg]:px-2.5`,
      },
      variant: {
        blurple: `border bg-blurple text-white hover:bg-blurple-hover`,
        default: `bg-primary text-primary-foreground shadow-xs hover:bg-primary/80`,
        destructive: `bg-destructive text-white shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20`,
        ghost: `hover:text-accent-foreground hover:bg-accent`,
        link: `text-primary underline-offset-4 hover:underline`,
        outline: `hover:text-accent-foreground border shadow-xs hover:bg-foreground/5`,
        secondary: `bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80`,
        white: `border bg-white text-black shadow-xs hover:bg-white-hover`,
      },
    },
  },
);

const Button = ({
  asChild = false,
  className,
  size,
  variant,
  ...props
}: ComponentProps<`button`> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) => {
  const Comp = asChild ? Slot : `button`;

  return (
    <Comp
      className={cn(buttonVariants({ className, size, variant }))}
      data-slot='button'
      {...props}
    />
  );
};

export { Button, buttonVariants };
