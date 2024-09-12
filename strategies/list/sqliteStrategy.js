import sqlite from "sqlite3";
import { open } from "sqlite";
import getenv from "../../utils/getenv.js";

export default async function sqliteStrategy(dataProcesses) {
  console.log("opening SQLite");
  const db = await open({
    filename: getenv["sqlite-filepath"],
    driver: sqlite.Database,
  });
  var rows = await db.all("SELECT * FROM store");
  return rows.map((row) => {
    return {
      key: row.key,
      type: row.type,
      value: dataProcesses(row.value, true),
    };
  });
}
