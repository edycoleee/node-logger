import request from "supertest";
import { app } from "../src/index.js";


test("Test Query Parameter", async () => {
    const response = await request(app)
        .get("/req-par")
        .query({ firstName: "Edy" , lastName: "Cole"});
    expect(response.text).toBe("Hello Edy Cole");
});