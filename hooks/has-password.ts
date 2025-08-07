'use client';

import { useEffect, useState } from 'react';

import { Data } from '@/components/auth/types/list-accounts';
import { authClient } from '@/lib/auth-client';

export const useHasPassword = () => {
  const [hasPassword, setHasPassword] = useState<boolean | undefined>();

  useEffect(() => {
    const checkHasPassword = async () => {
      await authClient.listAccounts(
        {},
        {
          onSuccess: (context: Data) => {
            setHasPassword(
              context.data.some((account) => account.provider === `credential`),
            );
          },
        },
      );
    };

    void checkHasPassword();
  }, []);

  return hasPassword;
};
