import request from "supertest";
import { app } from "../src/index.js";

test("Test Response Redirect", async () => {
    const response = await request(app).get("/resp-redir");
    expect(response.status).toBe(302);
    expect(response.get('location')).toBe('/to-next-page');
});