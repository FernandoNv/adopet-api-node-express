import express from "express";
import router from "./index";

import "reflect-metadata";
import { AppDataSource } from "./config/dataSource";

const app = express();
app.use(express.json());
router(app);

AppDataSource.initialize()
  .then(() => console.log("Database connected"))
  .catch(console.error);

export default app;
