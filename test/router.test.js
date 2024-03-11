//router.test.js

import express from "express";
import request from "supertest";

const app = express();

//object router
const router = express.Router();
//contoh jika kita menggunakan router >> middleware
//maka semua melawati middleware ini
router.use((req, res, next) => {
  console.info(`Receive request : ${req.originalUrl}`);
  next();
});
router.get('/feature/a', (req, res) => {
  res.send("feature a");
});

//test sebelum roputer di use di app >> error
test("Test Router Disabled", async () => {
  const response = await request(app).get("/feature/a");
  expect(response.status).toBe(404);
});
//test sebelum roputer di use di app >> route ke yg tuajuan
test("Test Router Enabled", async () => {
  app.use(router);

  const response = await request(app).get("/feature/a");
  expect(response.text).toBe("feature a");
});