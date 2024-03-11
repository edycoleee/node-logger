//cookie.test.js

import express from "express";
import request from "supertest";
import cookieParser from "cookie-parser";

const app = express();
app.use(cookieParser());
app.use(express.json());

app.get('/', (req, res) => {
  const name = req.cookies["name"];
  const name1 = req.cookies.name;
  const penulis = req.cookies.author;
  res.send(`Hello ${name}`);
});

app.post('/login', (req, res) => {
  const name = req.body.name;
  //send cookie dari server
  //res.cookie(key, value, setting)
  res.cookie("Login", name, { path: "/" });
  res.send(`Hello ${name}`);
});

test("Test Cookie Read", async () => {
  const response = await request(app).get("/")
    //kirim cookie dari client key:value;...
    .set("Cookie", "name=Edy;author=Coding Cupu");
  expect(response.text).toBe("Hello Edy");
});

test("Test Cookie Write", async () => {
  const response = await request(app).post("/login")
    .send({ name: "Edy" });
  expect(response.get("Set-Cookie").toString()).toBe("Login=Edy; Path=/");
  expect(response.text).toBe("Hello Edy");
});