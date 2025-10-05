import { sql } from "drizzle-orm";
import { pgTable, text, uuid } from "drizzle-orm/pg-core";
import { organization, user } from "./auth.sql";
import { id, timestamps } from "./_helpers";
import { createInsertSchema } from "drizzle-zod";
import z from "zod";

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
export const echoInsertSchema = createInsertSchema(echo)
  .omit({
    organizationId: true,
    createdBy: true,
    createdAt: true,
    updatedAt: true,
    deletedAt: true,
    id: true,
  })
  .extend({
    image: z.union([z.instanceof(File), z.string()]).optional(),
    hashtags: z.array(z.string()).optional(),
  });

export type EchoInsert = z.infer<typeof echoInsertSchema>;
export type EchoFormValues = z.infer<typeof echoInsertSchema>;
