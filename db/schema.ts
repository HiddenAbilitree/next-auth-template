import {
  boolean,
  foreignKey,
  index,
  integer,
  pgTable,
  text,
  timestamp,
  unique,
} from 'drizzle-orm/pg-core';

export const session = pgTable(
  'session',
  {
    id: text().primaryKey().notNull(),
    expiresAt: timestamp({ mode: 'string' }).notNull(),
    token: text().notNull(),
    createdAt: timestamp({ mode: 'string' }).notNull(),
    updatedAt: timestamp({ mode: 'string' }).notNull(),
    ipAddress: text(),
    userAgent: text(),
    userId: text().notNull(),
  },
  (table) => [
    index('sessions').using(
      'btree',
      table.userId.asc().nullsLast().op('text_ops'),
      table.token.asc().nullsLast().op('text_ops'),
    ),
    foreignKey({
      columns: [table.userId],
      foreignColumns: [user.id],
      name: 'session_userId_fkey',
    }),
    unique('session_token_key').on(table.token),
  ],
);

export const account = pgTable(
  'account',
  {
    id: text().primaryKey().notNull(),
    accountId: text().notNull(),
    providerId: text().notNull(),
    userId: text().notNull(),
    accessToken: text(),
    refreshToken: text(),
    idToken: text(),
    accessTokenExpiresAt: timestamp({ mode: 'string' }),
    refreshTokenExpiresAt: timestamp({ mode: 'string' }),
    scope: text(),
    password: text(),
    createdAt: timestamp({ mode: 'string' }).notNull(),
    updatedAt: timestamp({ mode: 'string' }).notNull(),
  },
  (table) => [
    index('userIds').using(
      'btree',
      table.userId.asc().nullsLast().op('text_ops'),
    ),
    foreignKey({
      columns: [table.userId],
      foreignColumns: [user.id],
      name: 'account_userId_fkey',
    }),
  ],
);

export const verification = pgTable(
  'verification',
  {
    id: text().primaryKey().notNull(),
    identifier: text().notNull(),
    value: text().notNull(),
    expiresAt: timestamp({ mode: 'string' }).notNull(),
    createdAt: timestamp({ mode: 'string' }),
    updatedAt: timestamp({ mode: 'string' }),
  },
  (table) => [
    index('identifiers').using(
      'btree',
      table.identifier.asc().nullsLast().op('text_ops'),
    ),
  ],
);

export const passkey = pgTable(
  'passkey',
  {
    id: text().primaryKey().notNull(),
    name: text(),
    publicKey: text().notNull(),
    userId: text().notNull(),
    credentialId: text().notNull(),
    counter: integer().notNull(),
    deviceType: text().notNull(),
    backedUp: boolean().notNull(),
    transports: text(),
    createdAt: timestamp({ mode: 'string' }).notNull(),
  },
  (table) => [
    foreignKey({
      columns: [table.userId],
      foreignColumns: [user.id],
      name: 'passkey_userId_fkey',
    }),
  ],
);

export const user = pgTable(
  'user',
  {
    id: text().primaryKey().notNull(),
    name: text().notNull(),
    email: text().notNull(),
    emailVerified: boolean().notNull(),
    image: text(),
    createdAt: timestamp({ mode: 'string' }).notNull(),
    updatedAt: timestamp({ mode: 'string' }).notNull(),
    twoFactorEnabled: boolean(),
  },
  (table) => [
    index('emails').using(
      'btree',
      table.email.asc().nullsLast().op('text_ops'),
    ),
    unique('user_email_key').on(table.email),
  ],
);

export const twoFactor = pgTable(
  'twoFactor',
  {
    id: text().primaryKey().notNull(),
    secret: text().notNull(),
    backupCodes: text().notNull(),
    userId: text().notNull(),
  },
  (table) => [
    index('secrets').using(
      'btree',
      table.secret.asc().nullsLast().op('text_ops'),
    ),
    foreignKey({
      columns: [table.userId],
      foreignColumns: [user.id],
      name: 'twoFactor_userId_fkey',
    }),
  ],
);
