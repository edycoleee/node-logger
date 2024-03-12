//request-body.test.js

import express from "express";
import request from "supertest";
//import library file uploud
import expressFileUpload from "express-fileupload";

const app = express();
//middleware json
app.use(express.json());
//middleware form urlencoded >> defaulnya : app.use(express.urlencoded());
//{ extended: false } >> tdk baca dari query param tapi baca dari body
app.use(express.urlencoded({ extended: false }));
//middleware file uploud
app.use(expressFileUpload());

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

//route untuk memindahkan file dari attacht ke folder /uploud
app.post("/file", async (req, res) => {
  const textFile = req.files.article;
  await textFile.mv(__dirname + "/upload/" + textFile.name);

  res.send(`Hello ${req.body.name}, you uploaded ${textFile.name}`);
});

//test uploud file
test("Test Request File Upload", async () => {
  const response = await request(app)
    .post("/file")
    .set("Content-Type", "multipart/form-data")
    .field("name", "Edy")
    .attach("article", __dirname + "/contoh.txt");

  expect(response.text).toBe("Hello Edy, you uploaded contoh.txt");
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