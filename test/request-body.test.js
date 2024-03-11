//request-body.test.js

import express from "express";
import request from "supertest";

const app = express();
//middleware json
app.use(express.json());
//middleware form urlencoded >> defaulnya : app.use(express.urlencoded());
//{ extended: false } >> tdk baca dari query param tapi baca dari body
app.use(express.urlencoded({ extended: false }));

//req body json
app.post('/json', (req, res) => {
  const name = req.body.name;
  res.json({
    hello: `Hello ${name}`
  });
});

//req body form
app.post('/form', (req, res) => {
  const name = req.body.name;
  res.json({
    hello: `Hello ${name}`
  });
});

test("Test Request JSON", async () => {
  const response = await request(app)
    .post("/json")
    .set("Content-Type", "application/json")
    .send({ name: "World" });

  expect(response.body).toEqual({
    hello: `Hello World`
  });
});

test("Test Request Form", async () => {
  const response = await request(app)
    .post("/form")
    .set("Content-Type", "application/x-www-form-urlencoded")
    .send("name=World");
  //send mirip query param tapi didalam body
  expect(response.body).toEqual({
    hello: `Hello World`
  });
});