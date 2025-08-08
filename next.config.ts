import type { NextConfig } from 'next';

import { withSentryConfig } from '@sentry/nextjs';

const nextConfig: NextConfig = {};

export default withSentryConfig(nextConfig, {
  org: `next-auth-template`,
  project: `template`,

  silent: !process.env.CI,

  widenClientFileUpload: true,

  tunnelRoute: `/error-monitoring`,

  disableLogger: false,
});
