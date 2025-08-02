import { Pool } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-serverless';
import process from 'node:process';

const pool = new Pool({ connectionString: process.env.DATABASE_URL as string });
export const db = drizzle({ client: pool });

export * as schema from './schema';
