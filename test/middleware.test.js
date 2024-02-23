import request from "supertest";
import { app } from "../src/index.js";

test.skip("Test Middleware 1", async() => {
    const response = await request(app).get("/");
    expect(response.get("X-Powered-By")).toBe("Coding Ndeso");
    expect(response.text).toBe("Hello Response");
})

test("Test Middleware 2", async() => {
    const response = await request(app).get("/mid1");
    expect(response.get("X-Powered-By")).toBe("Coding Ndeso");
    expect(response.status).toBe(401)
    if (response.status === 401) {
        expect(response.text).toBe("");
    } else {
        expect(response.text).toBe("Hello Middleware2");
    }
})

test("Test Response Middleware 3", async () => {
    const response = await request(app).get("/mid3").query({apiKey: "123"});
    expect(response.get("X-Powered-By")).toBe("Coding Ndeso");
    expect(response.text).toBe("Hello Middleware3"); 
});