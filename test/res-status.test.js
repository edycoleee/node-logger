import request from "supertest";
import { app } from "../src/index.js";

test("Test Response Status", async () => {
    let response = await request(app).get("/resp-status").query({name: "Edy"});
    expect(response.status).toBe(200);
    expect(response.text).toBe("Hello Edy");

    response = await request(app).get("/resp-status");
    expect(response.status).toBe(400);
});