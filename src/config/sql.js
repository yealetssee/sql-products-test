import pgk from "pg";
const { Pool } = pgk;

const pool = new Pool({
  host: "dpg-cjosdn5he99c738b57u0-a",
  port: 5432,
  database: "products_i0ux",
  user: "products_i0ux_user",
  password: "VviBVhSW7JrFLcp9Oc99DnNlLfRSwuQC",
});

export const createTable = async () => {
  return await pool.query(
    "CREATE TABLE IF NOT EXISTS products (id SERIAL PRIMARY KEY, title TEXT, price INT)",
  );
};
