import express, { response } from "express";
import pool, { createTable } from "./config/sql.js";
import bodyParser from "body-parser";

const app = express();

async function init() {
  try {
    await createTable();
    startServer();
  } catch (error) {
    console.log(error);
  }

  function startServer() {
    app.use(bodyParser.json());
    app.get("/api/products", async (_, response) => {
      try {
        const resultQuery = await pool.query("SELECT * FROM products");
        const rows = resultQuery.rows;
        return response.status(200).json(rows);
      } catch (error) {
        return response.status(401).json(error);
      }
    });
    app.post("/api/products", async (req, resp) => {
      const { title, price } = req.body;
      try {
        const resultQuery = await pool.query(
          "INSERT INTO TABLE products (title,price) VALUES ($1, $2)",
          [title, price],
        );
        const row = resultQuery.rows[0];
        return response.status(200).json(row);
      } catch (error) {
        return response.status(400).json(error);
      }
    });
    app.listen(3000);
  }
}

init();
