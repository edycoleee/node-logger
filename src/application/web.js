//src/application/web.js

import express from "express";
import { logger } from "./logging.js";
import { publicRouter } from "../route/public-api.js";

export const app = express();

app.use(express.json());

// Middleware untuk logging permintaan
app.use((req, res, next) => {
  logger.info(`${req.method} ${req.url}`);
  next();
});

// Middleware untuk menangkap kesalahan
app.use((err, req, res, next) => {
  logger.error(err.stack);
  res.status(500).send('Something broke!');
});

app.use(publicRouter);