import request from "supertest";
import { app } from "../src/index.js";

test("Test Response Body", async () => {
    const response = await request(app).get("/resp-body");
    expect(response.get('Content-Type')).toContain('text/html');
    expect(response.text).toBe('<html><body>Hello World</body></html>');
});