import { betterAuth } from 'better-auth';
import { Pool } from 'pg';

// refer to https://www.better-auth.com/docs/basic-usage           //
// and https://kysely.dev/docs/getting-started?package-manager=bun //
export const auth = betterAuth({
  database: new Pool({
    // connection options
  }),
});
