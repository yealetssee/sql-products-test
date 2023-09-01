import express from "express";
import { createTable } from "./config/sql.js";

const app = express();

async function init() {
  try {
    await createTable();
    startServer();
  } catch (error) {
    console.log(error);
  }

  function startServer() {
    app.get("/", (req, resp) => {
      return resp.status(200).json({ message: "works!" });
    });
    app.listen(3000);
  }
}

init();