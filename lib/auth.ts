import { betterAuth } from 'better-auth';
import { passkey } from 'better-auth/plugins/passkey';
import { twoFactor } from 'better-auth/plugins';
import { Pool } from 'pg';

import { sendEmail } from '@/lib/email';
import {
  VerifyEmail,
  VerifyDeletion,
  VerifyEmailChange,
  VerifyPasswordChange,
} from '@/components/email';

// refer to https://www.better-auth.com/docs/basic-usage           //
// and https://kysely.dev/docs/getting-started?package-manager=bun //
export const auth = betterAuth({
  plugins: [passkey(), twoFactor()],

  emailAndPassword: {
    enabled: true,
    maxPasswordLength: 1024,
    sendResetPassword: async ({ user, url }) =>
      sendEmail({
        mailHtml: VerifyPasswordChange({ url: url }),
        from: process.env.EMAIL_SENDER as string,
        to: user.email,
        subject: 'Change Your Password',
      }),
  },

  emailVerification: {
    sendVerificationEmail: async ({ user, url }) =>
      sendEmail({
        mailHtml: VerifyEmail({ url: url }),
        from: process.env.EMAIL_SENDER as string,
        to: user.email,
        subject: 'Verify Your Email',
      }),
    sendOnSignUp: true,
    autoSignInAfterVerification: true,
    expiresIn: 3600,
  },

  user: {
    deleteUser: {
      enabled: true,
      sendDeleteAccountVerification: async ({ user, url }) =>
        sendEmail({
          mailHtml: VerifyDeletion({ url: url }),
          from: process.env.EMAIL_SENDER as string,
          to: user.email,
          subject: 'Verify Account Deletion',
        }),
    },
    changeEmail: {
      enabled: true,
      sendChangeEmailVerification: async ({ user, newEmail, url }) =>
        sendEmail({
          mailHtml: VerifyEmailChange({ url, newEmail }),
          from: process.env.EMAIL_SENDER as string,
          to: user.email,
          subject: 'Verify Email Change',
        }),
    },
  },

  socialProviders: {
    // https://www.better-auth.com/docs/authentication/google
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
  },

  database: new Pool({
    host: process.env.PG_HOST as string,
    database: process.env.PG_DATABASE as string,
    user: process.env.PG_USER as string,
    password: process.env.PG_PASSWORD as string,
    ssl: true,
  }),

  appName: 'Nextjs Auth Template',

  rateLimit: { enabled: true },
});
