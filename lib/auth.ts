import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { magicLink, openAPI, twoFactor } from 'better-auth/plugins';
import { passkey } from 'better-auth/plugins/passkey';
import { eq } from 'drizzle-orm';

import {
  MagicLink,
  VerifyDeletion,
  VerifyEmail,
  VerifyEmailChange,
  VerifyPasswordChange,
} from '@/components/email';
import { db, schema } from '@/db';
// import { client as redis } from '@/db';
import { sendEmail } from '@/lib/email';

// refer to https://www.better-auth.com/docs/basic-usage           //
export const auth = betterAuth({
  account: {
    accountLinking: {
      enabled: true,
    },
  },

  appName: `Nextjs Auth Template`,

  database: drizzleAdapter(db, { provider: `pg`, schema }),

  emailAndPassword: {
    enabled: true,
    maxPasswordLength: 1024,
    requireEmailVerification: true,
    sendResetPassword: async ({ url, user }) =>
      sendEmail({
        from: process.env.EMAIL_SENDER as string,
        mailHtml: VerifyPasswordChange({ url }),
        subject: `Change Your Password`,
        to: user.email,
      }),
  },

  emailVerification: {
    autoSignInAfterVerification: true,
    expiresIn: 3600,
    sendOnSignUp: true,
    sendVerificationEmail: async ({ url, user }) =>
      sendEmail({
        from: process.env.EMAIL_SENDER as string,
        mailHtml: VerifyEmail({ url }),
        subject: `Verify Your Email`,
        to: user.email,
      }),
  },

  plugins: [
    passkey(),
    twoFactor(),
    // captcha({
    //   provider: process.env.CAPTCHA_PROVIDER as
    //     | 'cloudflare-turnstile'
    //     | 'google-recaptcha'
    //     | 'hcaptcha',
    //   secretKey: process.env.CAPTCHA_SECRET_KEY as string,
    // }),
    openAPI(),
    magicLink({
      sendMagicLink: async ({ email, url }) =>
        sendEmail({
          from: process.env.EMAIL_SENDER as string,
          mailHtml: MagicLink({ url }),
          subject: `Sign In`,
          to: email,
        }),
    }),
  ],

  rateLimit: { enabled: true, max: 15, window: 100 },

  // session: {
  //   cookieCache: {
  //     enabled: true,
  //     maxAge: 5 * 60,
  //   },
  // },

  // secondaryStorage: {
  //   get: async (key) => {
  //     const value = await redis.get(key);
  //     return value;
  //   },
  //   set: async (key, value, ttl) => {
  //     await redis.set(key, value, (ttl && { EX: ttl }) || undefined);
  //   },
  //   delete: async (key) => {
  //     await redis.del(key);
  //   },
  // },

  socialProviders: {
    discord: {
      clientId: process.env.DISCORD_CLIENT_ID as string,
      clientSecret: process.env.DISCORD_CLIENT_SECRET as string,
    },
    // https://www.better-auth.com/docs/authentication/google
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      prompt: `select_account`,
    },
  },

  user: {
    changeEmail: {
      enabled: true,
      sendChangeEmailVerification: async ({ newEmail, url, user }) =>
        sendEmail({
          from: process.env.EMAIL_SENDER as string,
          mailHtml: VerifyEmailChange({ newEmail, url }),
          subject: `Verify Email Change`,
          to: user.email,
        }),
    },

    deleteUser: {
      beforeDelete: async (user) => {
        await db.transaction(async (transaction) => {
          await transaction
            .delete(schema.passkey)
            .where(eq(schema.passkey.userId, user.id));
          await transaction
            .delete(schema.twoFactor)
            .where(eq(schema.twoFactor.userId, user.id));
        });
      },
      enabled: true,
      sendDeleteAccountVerification: async ({ url, user }) =>
        sendEmail({
          from: process.env.EMAIL_SENDER as string,
          mailHtml: VerifyDeletion({ url }),
          subject: `Verify Account Deletion`,
          to: user.email,
        }),
    },
  },
});
