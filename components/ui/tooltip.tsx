'use client';

import { cn } from '@/utils';
import * as TooltipPrimitive from '@radix-ui/react-tooltip';
import { ComponentProps } from 'react';

const TooltipProvider = ({
  delayDuration = 0,
  ...props
}: ComponentProps<typeof TooltipPrimitive.Provider>) => (
  <TooltipPrimitive.Provider
    data-slot='tooltip-provider'
    delayDuration={delayDuration}
    {...props}
  />
);

const Tooltip = ({
  ...props
}: ComponentProps<typeof TooltipPrimitive.Root>) => (
  <TooltipProvider>
    <TooltipPrimitive.Root data-slot='tooltip' {...props} />
  </TooltipProvider>
);

const TooltipTrigger = ({
  ...props
}: ComponentProps<typeof TooltipPrimitive.Trigger>) => (
  <TooltipPrimitive.Trigger data-slot='tooltip-trigger' {...props} />
);

const TooltipContent = ({
  className,
  sideOffset = 0,
  children,
  ...props
}: ComponentProps<typeof TooltipPrimitive.Content>) => (
  <TooltipPrimitive.Portal>
    <TooltipPrimitive.Content
      data-slot='tooltip-content'
      sideOffset={sideOffset}
      className={cn(
        'origin-(--radix-tooltip-content-transform-origin) animate-in bg-primary text-primary-foreground fade-in-0 zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 z-50 w-fit text-balance rounded-md px-3 py-1.5 text-xs',
        className,
      )}
      {...props}
    >
      {children}
      <TooltipPrimitive.Arrow className='bg-primary fill-primary z-50 size-2.5 translate-y-[calc(-50%_-_2px)] rotate-45 rounded-[2px]' />
    </TooltipPrimitive.Content>
  </TooltipPrimitive.Portal>
);

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider };
