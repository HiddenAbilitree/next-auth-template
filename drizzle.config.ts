import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  dialect: `postgresql`,
  out: `./db`,
  schema: `./db/schema.ts`,

  dbCredentials: {
    url: process.env.DATABASE_URL as string,
  },

  introspect: {
    casing: `camel`,
  },
});
