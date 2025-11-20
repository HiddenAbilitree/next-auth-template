'use client';

import { Account } from 'better-auth';
import { SuccessContext } from 'better-auth/react';
import { useEffect, useState } from 'react';

import { authClient } from '@/lib/auth-client';

export const useHasPassword = () => {
  const [hasPassword, setHasPassword] = useState<boolean | undefined>();

  useEffect(() => {
    const checkHasPassword = async () => {
      await authClient.listAccounts(
        {},
        {
          onSuccess: (context: SuccessContext<Account[]>) => {
            setHasPassword(
              context.data.some(
                (account) => account.providerId === `credential`,
              ),
            );
          },
        },
      );
    };

    void checkHasPassword();
  }, []);

  return hasPassword;
};
