'use client';

import { Button } from '@/components/ui/button';
import { authClient } from '@/lib/auth-client';

export const AddPasskey = () => (
  <Button
    onClick={() => {
      void authClient.passkey.addPasskey();
    }}
    size='sm'
  >
    Add Passkey
  </Button>
);
