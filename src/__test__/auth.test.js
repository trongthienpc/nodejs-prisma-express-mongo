import request from "supertest";
import app from "../index.js";

describe("Auth endpoint", () => {
  describe("POST api/auth/register", () => {
    it("should register a user", async () => {
      const user = {
        email: "user@example.com",
        password: "123456",
      };

      const response = await request(app)
        .post("api/auth/register")
        .send(user)
        .expect(201);
    });

    it("should return 409 if email already registered", async () => {
      const user = {
        email: "user@example.com",
        password: "123456",
      };

      const response = await request(app)
        .post("api/auth/register")
        .send(user)
        .expect(409);

      expect(response.body.message).toBe("User with this email already exists");
    });
  });
});
