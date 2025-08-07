import {
  boolean,
  index,
  integer,
  pgTable,
  text,
  timestamp,
  uniqueIndex,
} from 'drizzle-orm/pg-core';

export const user = pgTable(
  `user`,
  {
    createdAt: timestamp(`created_at`, { withTimezone: true })
      .$defaultFn(() => /* @__PURE__ */ new Date())
      .notNull(),
    email: text(`email`).notNull().unique(),
    emailVerified: boolean(`email_verified`)
      .$defaultFn(() => false)
      .notNull(),
    id: text(`id`).primaryKey(),
    image: text(`image`),
    name: text(`name`).notNull(),
    twoFactorEnabled: boolean(`two_factor_enabled`),
    updatedAt: timestamp(`updated_at`, { withTimezone: true })
      .$defaultFn(() => /* @__PURE__ */ new Date())
      .notNull(),
  },
  (table) => [uniqueIndex(`userEmail`).on(table.email)],
);

export const account = pgTable(
  `account`,
  {
    accessToken: text(`access_token`),
    accessTokenExpiresAt: timestamp(`access_token_expires_at`, {
      withTimezone: true,
    }),
    accountId: text(`account_id`).notNull(),
    createdAt: timestamp(`created_at`, { withTimezone: true }).notNull(),
    id: text(`id`).primaryKey(),
    idToken: text(`id_token`),
    password: text(`password`),
    providerId: text(`provider_id`).notNull(),
    refreshToken: text(`refresh_token`),
    refreshTokenExpiresAt: timestamp(`refresh_token_expires_at`, {
      withTimezone: true,
    }),
    scope: text(`scope`),
    updatedAt: timestamp(`updated_at`, { withTimezone: true }).notNull(),
    userId: text(`user_id`)
      .notNull()
      .references(() => user.id, { onDelete: `cascade` }),
  },
  (table) => [index(`accountUserId`).on(table.userId)],
);

export const session = pgTable(
  `session`,
  {
    createdAt: timestamp(`created_at`, { withTimezone: true }).notNull(),
    expiresAt: timestamp(`expires_at`, { withTimezone: true }).notNull(),
    id: text(`id`).primaryKey(),
    ipAddress: text(`ip_address`),
    token: text(`token`).notNull().unique(),
    updatedAt: timestamp(`updated_at`, { withTimezone: true }).notNull(),
    userAgent: text(`user_agent`),
    userId: text(`user_id`)
      .notNull()
      .references(() => user.id, { onDelete: `cascade` }),
  },
  (table) => [
    index(`sessionUserId`).on(table.userId),
    uniqueIndex(`sessionToken`).on(table.token),
  ],
);

export const verification = pgTable(
  `verification`,
  {
    createdAt: timestamp(`created_at`, { withTimezone: true }).$defaultFn(
      () => /* @__PURE__ */ new Date(),
    ),
    expiresAt: timestamp(`expires_at`, { withTimezone: true }).notNull(),
    id: text(`id`).primaryKey(),
    identifier: text(`identifier`).notNull(),
    updatedAt: timestamp(`updated_at`, { withTimezone: true }).$defaultFn(
      () => /* @__PURE__ */ new Date(),
    ),
    value: text(`value`).notNull(),
  },
  (table) => [uniqueIndex(`verificationIdentifier`).on(table.identifier)],
);

export const passkey = pgTable(
  `passkey`,
  {
    aaguid: text(`aaguid`),
    backedUp: boolean(`backed_up`).notNull(),
    counter: integer(`counter`).notNull(),
    createdAt: timestamp(`created_at`, { withTimezone: true }),
    credentialID: text(`credential_id`).notNull(),
    deviceType: text(`device_type`).notNull(),
    id: text(`id`).primaryKey(),
    name: text(`name`),
    publicKey: text(`public_key`).notNull(),
    transports: text(`transports`),
    userId: text(`user_id`)
      .notNull()
      .references(() => user.id, { onDelete: `cascade` }),
  },
  (table) => [index(`passkeyUserId`).on(table.userId)],
);

export const twoFactor = pgTable(
  `two_factor`,
  {
    backupCodes: text(`backup_codes`).notNull(),
    id: text(`id`).primaryKey(),
    secret: text(`secret`).notNull(),
    userId: text(`user_id`)
      .notNull()
      .references(() => user.id, { onDelete: `cascade` }),
  },
  (table) => [uniqueIndex(`twoFactorSecret`).on(table.secret)],
);
