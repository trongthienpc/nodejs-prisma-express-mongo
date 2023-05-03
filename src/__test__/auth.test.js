import request from "supertest";
import app from "../index.js";
import { EMAIL_EXIST, LOGIN_INVALID } from "../utils/constants.js";
import { response } from "express";

describe("Auth endpoint", () => {
  // test case for login endpoint
  describe("POST auth/login", () => {
    it("should return a JWT token on successful login", async () => {
      const user = {
        email: "user5@example.com",
        password: "123456",
      };

      // Login with the registered user
      const loginResponse = await request(app)
        .post("/api/auth/login")
        .send(user)
        .expect(200);
      // Verify that a JWT token was returned in the response body
      expect(loginResponse.body).toHaveProperty("token");
    });

    it("should return 401 if email or password is incorrect", async () => {
      // Attempt to login with an unregistered user
      const response = await request(app)
        .post("/api/auth/login")
        .send({ email: "nonexistent@example.com", password: "password" })
        .expect(401);

      expect(response.body.message).toBe(LOGIN_INVALID);

      // Attempt to login with the wrong password
      const response2 = await request(app)
        .post("/api/auth/login")
        .send({ email: "user@example.com", password: "wrongpassword" })
        .expect(401);

      expect(response2.body.message).toBe(LOGIN_INVALID);
    });
  });
  // describe("POST auth/register", () => {
  //   it("should register a user", async () => {
  //     const user = {
  //       email: "user5@example.com",
  //       password: "123456",
  //     };
  //     const response = await request(app)
  //       .post("/api/auth/register")
  //       .send(user)
  //       .expect(200);
  //     expect(response.body.success).toBe(true);
  //   });
  //   it("should return 400 if email already registered", async () => {
  //     const user = {
  //       email: "user@example.com",
  //       password: "123456",
  //     };
  //     const response = await request(app)
  //       .post("/api/auth/register")
  //       .send(user)
  //       .expect(400);
  //     expect(response.body.message).toBe(EMAIL_EXIST);
  //   });
  // });
});
