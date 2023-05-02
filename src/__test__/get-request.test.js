import request from "supertest";
import app from "../index.js";

describe("GET /", () => {
  it("responds with 200 status and 'Hello, world!'", async () => {
    const response = await request(app).get("/");
    expect(response.status).toBe(200);
    expect(response.text).toBe("Hello, world!");
  });
});
