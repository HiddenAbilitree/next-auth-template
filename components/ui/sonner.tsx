'use client';

import { useTheme } from 'next-themes';
import { CSSProperties } from 'react';
import { Toaster as Sonner, ToasterProps } from 'sonner';

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = `system` } = useTheme();

  return (
    <Sonner
      className='toaster group'
      style={
        {
          '--normal-bg': `var(--popover)`,
          '--normal-border': `var(--border)`,
          '--normal-text': `var(--popover-foreground)`,
        } as CSSProperties
      }
      theme={theme as ToasterProps[`theme`]}
      {...props}
    />
  );
};

export { Toaster };
