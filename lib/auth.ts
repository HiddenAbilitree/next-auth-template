import { betterAuth } from 'better-auth';
import { Pool } from 'pg';
import { sendMail } from '@/lib/mail';
import { VerifyEmail } from '@/components/email/Verify';
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
      sendMail({
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
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
  },
});
