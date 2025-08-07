import { init } from '@sentry/nextjs';

init({
  dsn: process.env.SENTRY_DSN,

  tracesSampleRate: 1,

  enableLogs: true,

  debug: process.env.ENVIRONMENT === `dev`,
});
