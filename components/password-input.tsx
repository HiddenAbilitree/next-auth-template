'use client';

import { clsx } from 'clsx';
import { Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';
import { ControllerRenderProps, FieldValues } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export const PasswordInput = <T extends FieldValues>(
  props: ControllerRenderProps<T>,
) => {
  const [visible, setVisible] = useState(false);
  return (
    <span
      className={clsx(
        'focus-visible:border-ring focus-visible:ring-ring/50 flex focus-visible:ring-[3px]',
        'aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40',
      )}
      data-slot='input'
    >
      <Input
        className='rounded-r-none'
        placeholder={
          visible ? 'password' : (
            '\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022'
          )
        }
        type={visible ? 'text' : 'password'}
        {...props}
      />
      <Button
        asChild
        className='group rounded-l-none border-l-0'
        onClick={() => {
          setVisible((cur) => !cur);
        }}
        variant='outline'
      >
        <span>
          {visible ?
            <Eye className='transition-color' />
          : <EyeOff className='transition-color' />}
        </span>
      </Button>
    </span>
  );
};
