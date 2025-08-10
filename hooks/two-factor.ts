'use client';
import { authClient } from '@/lib/auth-client';

export const useTwoFactorStatus = () => {
  const { data } = authClient.useSession();
  return data?.user.twoFactorEnabled ?? false;
};
