import request from "supertest";
import { app } from "../src/index.js";

test("Test Response", async() => {
  const response = await request(app).get("/resp");
  expect(response.text).toBe("Hello Response");
})