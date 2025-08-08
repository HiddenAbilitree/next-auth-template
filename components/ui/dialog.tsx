'use client';

import * as DialogPrimitive from '@radix-ui/react-dialog';
import * as React from 'react';

import { X } from '@/components/icons/x';
import { cn } from '@/utils';

const Dialog = ({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Root>) => (
  <DialogPrimitive.Root data-slot='dialog' {...props} />
);

const DialogTrigger = ({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Trigger>) => (
  <DialogPrimitive.Trigger data-slot='dialog-trigger' {...props} />
);

const DialogPortal = ({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Portal>) => (
  <DialogPrimitive.Portal data-slot='dialog-portal' {...props} />
);

const DialogClose = ({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Close>) => (
  <DialogPrimitive.Close data-slot='dialog-close' {...props} />
);

const DialogOverlay = ({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Overlay>) => (
  <DialogPrimitive.Overlay
    className={cn(
      `fixed inset-0 z-50 bg-black/50 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:animate-in data-[state=open]:fade-in-0`,
      className,
    )}
    data-slot='dialog-overlay'
    {...props}
  />
);

const DialogContent = ({
  children,
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Content>) => (
  <DialogPortal data-slot='dialog-portal'>
    <DialogOverlay />
    <DialogPrimitive.Content
      className={cn(
        `fixed top-[50%] left-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg border bg-background px-3 py-6 shadow-lg duration-200 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 sm:max-w-lg md:p-6`,
        className,
      )}
      data-slot='dialog-content'
      {...props}
    >
      {children}
      <DialogPrimitive.Close className="absolute top-4 right-4 rounded-xs opacity-70 ring-offset-background transition-opacity hover:cursor-pointer hover:opacity-100 focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4">
        <X />
        <span className='sr-only'>Close</span>
      </DialogPrimitive.Close>
    </DialogPrimitive.Content>
  </DialogPortal>
);

const DialogHeader = ({ className, ...props }: React.ComponentProps<`div`>) => (
  <div
    className={cn(`flex flex-col gap-2 text-center sm:text-left`, className)}
    data-slot='dialog-header'
    {...props}
  />
);

const DialogFooter = ({ className, ...props }: React.ComponentProps<`div`>) => (
  <div
    className={cn(
      `flex flex-col-reverse gap-2 sm:flex-row sm:justify-end`,
      className,
    )}
    data-slot='dialog-footer'
    {...props}
  />
);

const DialogTitle = ({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Title>) => (
  <DialogPrimitive.Title
    className={cn(`text-lg leading-none font-semibold`, className)}
    data-slot='dialog-title'
    {...props}
  />
);

const DialogDescription = ({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Description>) => (
  <DialogPrimitive.Description
    className={cn(`text-sm text-muted-foreground`, className)}
    data-slot='dialog-description'
    {...props}
  />
);

export {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
};
