import sqlite from "sqlite3";
import { open } from "sqlite";
import deserialize from "../../utils/deserialize.js";
import getenv from "../../utils/getenv.js";

export default async function sqliteStrategy(key, dataProcesses) {
  console.log("opening SQLite");
  const db = await open({
    filename: getenv["sqlite-filepath"],
    driver: sqlite.Database,
  });

  const row = await db.get("SELECT * FROM store WHERE key = ? LIMIT 1", key);
  if (!row) {
    console.log("Key not found");
    return;
  }
  row.value = deserialize(dataProcesses(row.value, true), row);
  console.log(row);
}
