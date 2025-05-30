import { Pool } from "pg";

export const pool = new Pool({
  user: "postgres",
  password: "Ezwan123",
  host: "localhost",
  port: 5432,
  database: "db_ngatur",
});
