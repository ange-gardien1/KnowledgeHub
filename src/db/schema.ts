import { sql } from "drizzle-orm";
import { integer, pgTable, text, timestamp, uuid, varchar, boolean, primaryKey } from "drizzle-orm/pg-core";
import { AdapterAccountType } from "next-auth/adapters";

enum DocumentType {
  TEXT = 'text',
  PDF = 'pdf'
}

enum RequestType {
  EDIT = 'edit',
  DELETE = 'delete'
}

export enum StatusType {
  PENDING = 'pending',
  APPROVED = 'approved',
  REJECTED = 'rejected'
}

enum NotificationType {
  EDIT_REQUEST = 'edit_request',
  APPROVAL = 'approval',
  REJECTION = 'rejection'
}

enum PermissionType {
  VIEW = 'view',
  COMMENT = 'comment',
  EDIT = 'edit'
}

export const roles = pgTable('roles', {
  id: uuid('id').primaryKey(),
  name: varchar('name', { length: 50 }).notNull().unique(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).default(sql`now()`).notNull(),
});

export const users = pgTable("user", {
  id: uuid("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: text("name"),
  email: text("email").notNull(),
  emailVerified: timestamp("emailVerified", { mode: "date" }),
  image: text("image"),
  roleId: uuid('role_id').references(() => roles.id),
});

export const accounts = pgTable(
  "account",
  {
    userId: uuid("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    type: text("type").$type<AdapterAccountType>().notNull(),
    provider: text("provider").notNull(),
    providerAccountId: text("providerAccountId").notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: text("token_type"),
    scope: text("scope"),
    id_token: text("id_token"),
    session_state: text("session_state"),
  },
  (account) => ({
    compoundKey: primaryKey({
      columns: [account.provider, account.providerAccountId],
    }),
  })
);

export const sessions = pgTable("session", {
  sessionToken: text("sessionToken").primaryKey(),
  userId: uuid("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  expires: timestamp("expires", { mode: "date" }).notNull(),
});

export const verificationTokens = pgTable(
  "verificationToken",
  {
    identifier: text("identifier").notNull(),
    token: text("token").notNull(),
    expires: timestamp("expires", { mode: "date" }).notNull(),
  },
  (verificationToken) => ({
    compositePk: primaryKey({
      columns: [verificationToken.identifier, verificationToken.token],
    }),
  })
);

export const authenticators = pgTable(
  "authenticator",
  {
    credentialID: text("credentialID").notNull().unique(),
    userId: uuid("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    providerAccountId: text("providerAccountId").notNull(),
    credentialPublicKey: text("credentialPublicKey").notNull(),
    counter: integer("counter").notNull(),
    credentialDeviceType: text("credentialDeviceType").notNull(),
    credentialBackedUp: boolean("credentialBackedUp").notNull(),
    transports: text("transports"),
  },
  (authenticator) => ({
    compositePK: primaryKey({
      columns: [authenticator.userId, authenticator.credentialID],
    }),
  })
);

export const projects = pgTable('projects', {
  id: uuid('id').primaryKey().default(sql`gen_random_uuid()`),
  userId: uuid("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  name: varchar('name', { length: 255 }).notNull(),
  description: text('description'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).default(sql`now()`).notNull(),
});

export const documents = pgTable('documents', {
  id: uuid('id').primaryKey().default(sql`gen_random_uuid()`),
  userId: uuid("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  projectId: uuid("project_id").references(() => projects.id), 
  title: varchar('title', { length: 255 }).notNull(),
  content: text('content'),
  type: varchar('type', { length: 4 }).notNull().default(DocumentType.TEXT),
  pdfUrl: varchar('pdf_url', { length: 255 }),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).default(sql`now()`).notNull(),
});

export const documentVersions = pgTable('document_versions', {
  id: uuid('id').primaryKey(),
  documentId: uuid('document_id').references(() => documents.id),
  versionNumber: integer('version_number').notNull(),
  content: text('content'),
  pdfUrl: varchar('pdf_url', { length: 255 }),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).default(sql`now()`).notNull(),
});

export const editRequests = pgTable('edit_requests', {
  id: uuid('id').primaryKey(),
  documentId: uuid('document_id').references(() => documents.id),
  userId: uuid('user_id').references(() => users.id),
  requestType: varchar('request_type', { length: 6 }).notNull().default(RequestType.EDIT),
  status: varchar('status', { length: 8 }).notNull().default(StatusType.PENDING),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).default(sql`now()`).notNull(),
});

export const notifications = pgTable('notifications', {
  id: uuid('id').primaryKey(),
  userId: uuid('user_id').references(() => users.id),
  type: varchar('type', { length: 13 }).notNull().default(NotificationType.EDIT_REQUEST),
  message: varchar('message', { length: 255 }).notNull(),
  read: boolean('read').default(false).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const projectShares = pgTable('project_shares', {
  id: uuid('id').primaryKey(),
  projectId: uuid('project_id').references(() => projects.id).notNull(),
  sharedByUserId: uuid('shared_by_user_id').references(() => users.id).notNull(),
  sharedWithUserId: uuid('shared_with_user_id').references(() => users.id).notNull(),
  permission: varchar('permission', { length: 6 }).notNull().default(PermissionType.VIEW),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});


export const comments = pgTable('comments', {
  id: uuid('id').primaryKey(),
  documentId: uuid('document_id')
    .references(() => documents.id, { onDelete: 'cascade' }),
  resourceId: uuid('resource_id').references(()=>resources.id),
  userId: uuid('user_id').references(() => users.id),
  content: text('content').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).default(sql`now()`).notNull(),
});

export const resources = pgTable('resources', {
  id: uuid('id').primaryKey(),
  userId: uuid('user_id').references(() => users.id),
  documentId: uuid('document_id'),
  title: varchar('title', { length: 255 }),
  url: varchar('url', { length: 255 }),
  type: varchar('type', { length: 10 }),
  description: text('description'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).default(sql`now()`).notNull(),
});

