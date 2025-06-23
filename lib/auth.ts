import {
  MagicLink,
  VerifyDeletion,
  VerifyEmail,
  VerifyEmailChange,
  VerifyPasswordChange,
} from '@/components/email';
import { db, schema } from '@/db';
import { sendEmail } from '@/lib/email';
import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { magicLink, openAPI, twoFactor } from 'better-auth/plugins';
import { passkey } from 'better-auth/plugins/passkey';
import { eq } from 'drizzle-orm';

// refer to https://www.better-auth.com/docs/basic-usage           //
export const auth = betterAuth({
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
          mailHtml: MagicLink({ url }),
          from: process.env.EMAIL_SENDER as string,
          to: email,
          subject: 'Sign In',
        }),
    }),
  ],

  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
    maxPasswordLength: 1024,
    sendResetPassword: async ({ user, url }) =>
      sendEmail({
        mailHtml: VerifyPasswordChange({ url }),
        from: process.env.EMAIL_SENDER as string,
        to: user.email,
        subject: 'Change Your Password',
      }),
  },

  emailVerification: {
    sendVerificationEmail: async ({ user, url }) =>
      sendEmail({
        mailHtml: VerifyEmail({ url }),
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
      sendDeleteAccountVerification: async ({ user, url }) =>
        sendEmail({
          mailHtml: VerifyDeletion({ url }),
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
      prompt: 'select_account',
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
    discord: {
      clientId: process.env.DISCORD_CLIENT_ID as string,
      clientSecret: process.env.DISCORD_CLIENT_SECRET as string,
    },
  },

  database: drizzleAdapter(db, { provider: 'pg', schema }),

  appName: 'Nextjs Auth Template',

  rateLimit: { enabled: true, max: 15, window: 100 },
});
