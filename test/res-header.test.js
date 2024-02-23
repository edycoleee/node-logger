import request from "supertest";
import { app } from "../src/index.js";

test("Test Response Header", async () => {
    const response = await request(app).get("/resp-header");
    expect(response.text).toBe("Hello Response");
    expect(response.get("X-Powered-By")).toBe("Coding Cupu");
    expect(response.get("X-Author")).toBe("Edy");
});