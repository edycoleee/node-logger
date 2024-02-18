import request from "supertest";
import { app } from "../src/index.js";


test("Test Request URL", async () => {
    const response = await request(app)
        .get("/req-url/world")
        .query({ name: "Edy" });
    expect(response.body).toEqual({
        path: "/req-url/world",
        originalUrl: "/req-url/world?name=Edy",
        hostname: "127.0.0.1",
        protocol: "http",
        secure: false,
    });
});