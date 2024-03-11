//cookie-signed.test.js
import express from "express";
import request from "supertest";
import cookieParser from "cookie-parser";

const app = express();
app.use(cookieParser("CONTOHRAHASIA"));
app.use(express.json());

app.get('/dashboard', (req, res) => {
  const name = req.signedCookies["Login"];
  res.send(`Hello ${name}`);
});

app.post('/login', (req, res) => {
  const name = req.body.name;
  res.cookie("Login", name, { path: "/", signed: true });
  res.send(`Hello ${name}`);
});


test("Test Cookie Write", async () => {
  const response = await request(app).post("/login")
    .send({ name: "Edy" });
  console.info(response.get("Set-Cookie"));
  expect(response.get("Set-Cookie").toString()).toContain("Edy");
  expect(response.text).toBe("Hello Edy");
});

test("Test Cookie Read", async () => {
  const response = await request(app).get("/dashboard")
    .set("Cookie", "Login=s%3AEdy.kAg56apX%2F%2BhWKP557aBjrIGw8fEdT3VejTb926caR0o; Path=/");
  expect(response.text).toBe("Hello Edy");
});
