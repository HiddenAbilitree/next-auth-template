import { betterAuth } from 'better-auth';
import { Pool } from 'pg';
import { sendEmail } from '@/lib/mail';
import { VerifyEmail } from '@/components/email/VerifyEmail';
import { VerifyDeletion } from '@/components/email/VerifyDeletion';
// refer to https://www.better-auth.com/docs/basic-usage           //
// and https://kysely.dev/docs/getting-started?package-manager=bun //
export const auth = betterAuth({
  database: new Pool({
    host: process.env.PG_HOST as string,
    database: process.env.PG_DATABASE as string,
    user: process.env.PG_USER as string,
    password: process.env.PG_PASSWORD as string,
    ssl: true,
  }),

  emailVerification: {
    sendVerificationEmail: async ({ user, url, token }) => {
      sendEmail({
        mailHtml: VerifyEmail({ url: url, token: token }),
        from: 'CHANGEME',
        to: user.email,
        subject: 'Verify Your Email',
      });
    },
    sendOnSignUp: true,
    autoSignInAfterVerification: true,
    expiresIn: 360,
  },

  socialProviders: {
    // https://www.better-auth.com/docs/authentication/google
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
  },

  user: {
    deleteUser: {
      enabled: true,
      sendDeleteAccountVerification: async (
        {
          user, // The user object
          url, // The auto-generated URL for deletion
        }
      ) => {
        // Your email sending logic here
        sendEmail({ mailHtml: VerifyDeletion({ url: url }), from: "CHANGEME", to: user.email, subject: "Verify Deletion", });
      },
    },
  },
});
