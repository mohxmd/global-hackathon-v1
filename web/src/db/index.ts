import { neon, neonConfig } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import ws from "ws";

import * as schema from "./schema";

neonConfig.webSocketConstructor = ws;

const DB_URL = process.env.DATABASE_URL;

if (!DB_URL) {
  const err = "MISSING DATABASE_URL in .env";
  console.error(err);
  throw new Error(err);
}

const sql = neon(DB_URL);
export const db = drizzle(sql, {
  schema,
  casing: "snake_case",
});
export type DB = typeof db;
