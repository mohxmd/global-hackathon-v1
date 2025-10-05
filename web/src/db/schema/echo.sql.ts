import { sql } from "drizzle-orm";
import { pgTable, text, uuid } from "drizzle-orm/pg-core";
import { organization, user } from "./auth.sql";
import { id, timestamps } from "./_helpers";

export const echo = pgTable("echo", {
  id,
  organizationId: uuid()
    .notNull()
    .references(() => organization.id, { onDelete: "cascade" }),
  createdBy: uuid()
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),

  title: text().notNull(),
  content: text(),
  image: text(),
  hashtags: text()
    .array()
    .default(sql`ARRAY[]::text[]`),

  ...timestamps,
});

// types
