import request from "supertest";
import { app } from "../src/index.js";

test("Test Query Parameter", async () => {
    const response = await request(app).get("/req-http").query({ name: "Edy" });
    expect(response.text).toBe("Hello Edy");
});