import { neon, neonConfig } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import ws from "ws";

neonConfig.webSocketConstructor = ws;

if (!process.env.DATABASE_URL) {
  const err = "MISSING DATABASE_URL in .env";
  console.error(err);
  throw new Error(err);
}

export const db = drizzle(process.env.DATABASE_URL);
export type DB = typeof db;
