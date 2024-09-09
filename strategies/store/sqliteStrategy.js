import sqlite from "sqlite3";
import { open } from "sqlite";
import getenv from "../../utils/getenv.js";

export default async function sqliteStrategy({ key, type, value }) {
  console.log("opening SQLite");
  const db = await open({
    filename: getenv["sqlite-filepath"],
    driver: sqlite.Database,
  });
  await db.exec(`
    CREATE TABLE IF NOT EXISTS store (
      key VARCHAR(255) PRIMARY KEY UNIQUE,
      type VARCHAR(255), 
      value TEXT
    );
  `);
  await db.run(
    "INSERT OR REPLACE INTO store (key, type, value) VALUES (?, ?, ?)",
    [key, type, value]
  );

  console.log("Secred stored in SQLite");
}
