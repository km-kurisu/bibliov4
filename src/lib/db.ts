import Database from "better-sqlite3";
import path from "path";
import fs from "fs";

const DB_PATH =
  process.env.DATABASE_PATH ?? path.join(process.cwd(), "database.sqlite");
const SCHEMA_PATH =
  process.env.SCHEMA_PATH ?? path.join(process.cwd(), "src/lib/schema.sql");

declare global {
  var db: Database.Database | undefined;
}

let db: Database.Database;

if (process.env.NODE_ENV === "production") {
  db = new Database(DB_PATH);
} else {
  if (!global.db) {
    global.db = new Database(DB_PATH);
    global.db.pragma("journal_mode = WAL");
  }
  db = global.db;
}

// Connection is handled above.
// Seeding and schema initialization should be handled by scripts/seed-db.js

export default db;
