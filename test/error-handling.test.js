//error-handling.test.js
import express from "express";
import request from "supertest";

const app = express();

const errorMiddleware = (err, req, res, next) => {
  // yang tampil saat terjadi error
  res.status(500).send(`Terjadi Error: ${err.message}`);
};

app.get('/', (req, res) => {
  throw new Error("Ups");
});
app.use(errorMiddleware); //tempatkan posisi paling bawah

test("Test Response", async () => {
  const response = await request(app).get("/");
  expect(response.status).toBe(500);
  expect(response.text).toBe("Terjadi Error: Ups");
});
