import request from "supertest";
import { app } from "../src/index.js";


test("Test Query Parameter 1", async () => {
    const response = await request(app)
        .get("/req-head1")
        .set("Accept", "text/plain");
    expect(response.text).toBe("Hello text/plain");
});

test("Test Query Parameter 2", async () => {
    const response = await request(app)
        .get("/req-head2")
        .set("custom-header", "custom-value");
    expect(response.text).toBe("Hello custom-value");
});