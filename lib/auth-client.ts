import { magicLinkClient, passkeyClient } from 'better-auth/client/plugins';
import { twoFactorClient } from 'better-auth/client/plugins';
import { createAuthClient } from 'better-auth/react';
import process from 'node:process';

export const authClient = createAuthClient({
  baseURL: process.env.BETTER_AUTH_URL as string,
  plugins: [passkeyClient(), twoFactorClient(), magicLinkClient()],
});
