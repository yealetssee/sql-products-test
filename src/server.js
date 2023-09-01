import express, { response } from "express";
import pool, { createTable } from "./config/sql.js";
import bodyParser from "body-parser";
import cors from "cors";
import productRouter from "./endpoints/product-router.js";
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
    app.use(cors());

    app.use("/api", productRouter);
    app.listen(3000);
  }
}

init();
