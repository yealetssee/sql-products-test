import pool from "../config/sql.js";

export const getAllProducts = async (_, response) => {
  try {
    const resultQuery = await pool.query("SELECT * FROM products");
    const rows = resultQuery.rows;
    return response.status(200).json(rows);
  } catch (error) {
    return response.status(401).json(error);
  }
};

export const createProduct = async (req, resp) => {
  const { title, price } = req.body;
  try {
    const resultQuery = await pool.query(
      "INSERT INTO  products (title,price) VALUES ($1, $2)",
      [title, price],
    );
    const row = resultQuery.rows[0];
    return resp.status(200).json(row);
  } catch (error) {
    return resp.status(400).json(error);
  }
};
