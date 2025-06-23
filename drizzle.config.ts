import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  out: './db',
  dialect: 'postgresql',
  schema: './db/schema.ts',

  dbCredentials: {
    url: process.env.DATABASE_URL as string,
  },

  introspect: {
    casing: 'camel',
  },
});
