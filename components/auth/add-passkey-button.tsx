'use client';

import { Button } from '@/components/ui/button';
import { authClient } from '@/lib/auth-client';

export const AddPasskey = () => (
  <Button
    size='sm'
    onClick={async () => {
      await authClient.passkey.addPasskey();
    }}
  >
    Add Passkey
  </Button>
);
