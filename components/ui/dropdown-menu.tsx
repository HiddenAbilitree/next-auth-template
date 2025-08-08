'use client';

import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';
import { ComponentProps } from 'react';

import { ArrowRight } from '@/components/icons/arrow-right';
import { Check } from '@/components/icons/check';
import { Circle } from '@/components/icons/circle';
import { cn } from '@/utils';

const DropdownMenu = ({
  ...props
}: ComponentProps<typeof DropdownMenuPrimitive.Root>) => (
  <DropdownMenuPrimitive.Root data-slot='dropdown-menu' {...props} />
);

const DropdownMenuPortal = ({
  ...props
}: ComponentProps<typeof DropdownMenuPrimitive.Portal>) => (
  <DropdownMenuPrimitive.Portal data-slot='dropdown-menu-portal' {...props} />
);

const DropdownMenuTrigger = ({
  ...props
}: ComponentProps<typeof DropdownMenuPrimitive.Trigger>) => (
  <DropdownMenuPrimitive.Trigger data-slot='dropdown-menu-trigger' {...props} />
);

const DropdownMenuContent = ({
  className,
  sideOffset = 4,
  ...props
}: ComponentProps<typeof DropdownMenuPrimitive.Content>) => (
  <DropdownMenuPrimitive.Portal>
    <DropdownMenuPrimitive.Content
      className={cn(
        `text-popover-foreground z-50 max-h-(--radix-dropdown-menu-content-available-height) min-w-[8rem] origin-(--radix-dropdown-menu-content-transform-origin) overflow-x-hidden overflow-y-auto rounded-md border bg-popover p-1 shadow-md data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95`,
        className,
      )}
      data-slot='dropdown-menu-content'
      sideOffset={sideOffset}
      {...props}
    />
  </DropdownMenuPrimitive.Portal>
);

const DropdownMenuGroup = ({
  ...props
}: ComponentProps<typeof DropdownMenuPrimitive.Group>) => (
  <DropdownMenuPrimitive.Group data-slot='dropdown-menu-group' {...props} />
);

const DropdownMenuItem = ({
  className,
  inset,
  variant = `default`,
  ...props
}: ComponentProps<typeof DropdownMenuPrimitive.Item> & {
  inset?: boolean;
  variant?: `default` | `destructive`;
}) => (
  <DropdownMenuPrimitive.Item
    className={cn(
      `focus:text-accent-foreground relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none focus:bg-accent data-[disabled]:pointer-events-none data-[disabled]:opacity-50 data-[inset]:pl-8 data-[variant=destructive]:text-destructive data-[variant=destructive]:focus:bg-destructive/10 data-[variant=destructive]:focus:text-destructive dark:data-[variant=destructive]:focus:bg-destructive/20 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 [&_svg:not([class*='text-'])]:text-muted-foreground data-[variant=destructive]:*:[svg]:!text-destructive`,
      className,
    )}
    data-inset={inset}
    data-slot='dropdown-menu-item'
    data-variant={variant}
    {...props}
  />
);

const DropdownMenuCheckboxItem = ({
  checked,
  children,
  className,
  ...props
}: ComponentProps<typeof DropdownMenuPrimitive.CheckboxItem>) => (
  <DropdownMenuPrimitive.CheckboxItem
    checked={checked}
    className={cn(
      `focus:text-accent-foreground relative flex cursor-default items-center gap-2 rounded-sm py-1.5 pr-2 pl-8 text-sm outline-hidden select-none focus:bg-accent data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4`,
      className,
    )}
    data-slot='dropdown-menu-checkbox-item'
    {...props}
  >
    <span className='pointer-events-none absolute left-2 flex size-3.5 items-center justify-center'>
      <DropdownMenuPrimitive.ItemIndicator>
        <Check className='size-4' />
      </DropdownMenuPrimitive.ItemIndicator>
    </span>
    {children}
  </DropdownMenuPrimitive.CheckboxItem>
);

const DropdownMenuRadioGroup = ({
  ...props
}: ComponentProps<typeof DropdownMenuPrimitive.RadioGroup>) => (
  <DropdownMenuPrimitive.RadioGroup
    data-slot='dropdown-menu-radio-group'
    {...props}
  />
);

const DropdownMenuRadioItem = ({
  children,
  className,
  ...props
}: ComponentProps<typeof DropdownMenuPrimitive.RadioItem>) => (
  <DropdownMenuPrimitive.RadioItem
    className={cn(
      `focus:text-accent-foreground relative flex cursor-default items-center gap-2 rounded-sm py-1.5 pr-2 pl-8 text-sm outline-hidden select-none focus:bg-accent data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4`,
      className,
    )}
    data-slot='dropdown-menu-radio-item'
    {...props}
  >
    <span className='pointer-events-none absolute left-2 flex size-3.5 items-center justify-center'>
      <DropdownMenuPrimitive.ItemIndicator>
        <Circle className='size-2 fill-current' />
      </DropdownMenuPrimitive.ItemIndicator>
    </span>
    {children}
  </DropdownMenuPrimitive.RadioItem>
);

const DropdownMenuLabel = ({
  className,
  inset,
  ...props
}: ComponentProps<typeof DropdownMenuPrimitive.Label> & {
  inset?: boolean;
}) => (
  <DropdownMenuPrimitive.Label
    className={cn(
      `px-2 py-1.5 text-sm font-medium data-[inset]:pl-8`,
      className,
    )}
    data-inset={inset}
    data-slot='dropdown-menu-label'
    {...props}
  />
);

const DropdownMenuSeparator = ({
  className,
  ...props
}: ComponentProps<typeof DropdownMenuPrimitive.Separator>) => (
  <DropdownMenuPrimitive.Separator
    className={cn(`-mx-1 my-1 h-px bg-border`, className)}
    data-slot='dropdown-menu-separator'
    {...props}
  />
);

const DropdownMenuShortcut = ({
  className,
  ...props
}: ComponentProps<`span`>) => (
  <span
    className={cn(
      `ml-auto text-xs tracking-widest text-muted-foreground`,
      className,
    )}
    data-slot='dropdown-menu-shortcut'
    {...props}
  />
);

const DropdownMenuSub = ({
  ...props
}: ComponentProps<typeof DropdownMenuPrimitive.Sub>) => (
  <DropdownMenuPrimitive.Sub data-slot='dropdown-menu-sub' {...props} />
);

const DropdownMenuSubTrigger = ({
  children,
  className,
  inset,
  ...props
}: ComponentProps<typeof DropdownMenuPrimitive.SubTrigger> & {
  inset?: boolean;
}) => (
  <DropdownMenuPrimitive.SubTrigger
    className={cn(
      `focus:text-accent-foreground data-[state=open]:text-accent-foreground flex cursor-default items-center rounded-sm px-2 py-1.5 text-sm outline-hidden select-none focus:bg-accent data-[inset]:pl-8 data-[state=open]:bg-accent`,
      className,
    )}
    data-inset={inset}
    data-slot='dropdown-menu-sub-trigger'
    {...props}
  >
    {children}
    <ArrowRight className='ml-auto size-4' />
  </DropdownMenuPrimitive.SubTrigger>
);

const DropdownMenuSubContent = ({
  className,
  ...props
}: ComponentProps<typeof DropdownMenuPrimitive.SubContent>) => (
  <DropdownMenuPrimitive.SubContent
    className={cn(
      `text-popover-foreground z-50 min-w-[8rem] origin-(--radix-dropdown-menu-content-transform-origin) overflow-hidden rounded-md border bg-popover p-1 shadow-lg data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95`,
      className,
    )}
    data-slot='dropdown-menu-sub-content'
    {...props}
  />
);

export {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
};
