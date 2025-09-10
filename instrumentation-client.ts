import { init } from '@sentry/nextjs';

if (process.env.ENABLE_SENTRY)
  init({
    dsn: process.env.SENTRY_DSN,

    enableLogs: true,
    tracesSampleRate: 1,

    debug: process.env.ENVIRONMENT === `dev`,
  });

export { captureRouterTransitionStart as onRouterTransitionStart } from '@sentry/nextjs';
