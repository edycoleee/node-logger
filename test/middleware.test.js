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

test("Test Response Middleware Unauthorized", async () => {
    const response = await request(app).get("/mid3");
    expect(response.status).toBe(401);
});

test("Test Response Middleware Authoeized", async () => {
    const response = await request(app).get("/mid3").query({apiKey: "123"});
    expect(response.text).toBe("Hello Middleware3"); 
});

test("Test Response Middleware Time", async () => {
    const response = await request(app).get("/time").query({apiKey: "123"});
    expect(response.get("X-Powered-By")).toBe("Coding Ndeso");
    expect(response.text).toContain("Hello , Today Is");
});