import { neon, neonConfig } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import ws from "ws";

neonConfig.webSocketConstructor = ws;

const DB_URL = process.env.DATABASE_URL;

if (!DB_URL) {
  const err = "MISSING DATABASE_URL in .env";
  console.error(err);
  throw new Error(err);
}

export const db = drizzle(DB_URL);
export type DB = typeof db;
