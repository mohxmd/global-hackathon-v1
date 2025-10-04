import "dotenv/config";

import { defineConfig } from "drizzle-kit";

const DB_URL = process.env.DATABASE_URL;

if (!DB_URL) {
  const err = "MISSING DATABASE_URL in .env";
  console.error(err);
  throw new Error(err);
}

export default defineConfig({
  out: "./src/db/migrations",
  schema: "./src/db/schema/*",
  dialect: "postgresql",
  dbCredentials: {
    url: DB_URL,
  },
  casing: "snake_case",
  strict: true,
  verbose: true,

  extensionsFilters: ["postgis"],
});
