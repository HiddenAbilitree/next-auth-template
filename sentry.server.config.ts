import { init } from '@sentry/nextjs';

if (process.env.ENABLE_SENTRY)
  init({
    dsn: process.env.SENTRY_DSN,

    tracesSampleRate: 1,

    enableLogs: true,

    debug: process.env.ENVIRONMENT === `dev`,
  });
