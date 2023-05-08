import request from "supertest";
import jwt from "jsonwebtoken";
import app from "../index.js";
import prisma from "../lib/prisma.js";

import {
  LOGIN_INVALID,
  LOGIN_INVALID_CODE,
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  REFRESH_TOKEN_SUCCESS,
  REGISTER_DUPLICATE_EMAIL,
  REGISTER_INVALID_CODE,
  REGISTER_SUCCESS,
  TOKEN_INVALID,
} from "../utils/constants";
import { checkAuthenticated } from "../services/jwt.service.js";

describe("Auth API", () => {
  describe("POST /api/auth/register", () => {
    // it(`should return 200 and message "${REGISTER_SUCCESS}" if registration is successful`, async () => {
    //   const response = await request(app)
    //     .post("/api/auth/register")
    //     .send({
    //       name: "Test User",
    //       email: "test@example.com",
    //       password: "password",
    //     })
    //     .expect(200);
    //   expect(response.body.message).toBe(REGISTER_SUCCESS);
    // });
    // it('should return 400 and message "Validation failed" if request body is invalid', async () => {
    //   const response = await request(app)
    //     .post("/api/auth/register")
    //     .send({})
    //     .expect(400);
    //   expect(response.body.message).toBe("Validation failed");
    // });
    // it(`should return "${REGISTER_INVALID_CODE}" and message "${REGISTER_DUPLICATE_EMAIL}" if email is already registered`, async () => {
    //   const response = await request(app)
    //     .post("/api/auth/register")
    //     .send({
    //       name: "Test User",
    //       email: "test@example.com",
    //       password: "password",
    //     })
    //     .expect(REGISTER_INVALID_CODE);
    //   expect(response.body.message).toBe(REGISTER_DUPLICATE_EMAIL);
    // });
  });
  describe("POST /api/auth/login", () => {
    it(`should return 200 and message "${LOGIN_SUCCESS}" if login is successful`, async () => {
      const response = await request(app)
        .post("/api/auth/login")
        .send({
          email: "test@example.com",
          password: "password",
        })
        .expect(200);
      expect(response.body.message).toBe(LOGIN_SUCCESS);
      expect(response.body.data.accessToken).toBeDefined();
      expect(response.body.data.refreshToken).toBeDefined();
    });
    it(`should return ${LOGIN_INVALID_CODE} and message "${LOGIN_INVALID}" if email or password is incorrect`, async () => {
      const response = await request(app)
        .post("/api/auth/login")
        .send({
          email: "nonexistent@example.com",
          password: "password",
        })
        .expect(LOGIN_INVALID_CODE);
      expect(response.body.message).toBe(LOGIN_INVALID);
    });
  });
  // Add more test cases for logout and refresh routes here...
  describe("POST /api/auth/logout", () => {
    it("should successfully logout a user", async () => {
      // Login user to get access token
      const response = await request(app)
        .post("/api/auth/login")
        .send({ email: "test@example.com", password: "password" })
        .expect(200);
      const { accessToken } = response.body.data;
      // Logout the user
      const logoutResponse = await request(app)
        .post("/api/auth/logout")
        .set("Authorization", "Bearer " + accessToken)
        .expect(200);
      expect(logoutResponse.body.message).toBe(LOGOUT_SUCCESS);
      // Verify that the access token has been deleted
      const refreshTokenExists = await prisma.refreshToken.findUnique({
        where: { token: response.body.data.refreshToken },
      });
      expect(refreshTokenExists).toBeNull();
    });
    it("should return 401 if access token is invalid during logout", async () => {
      const response = await request(app)
        .post("/api/auth/logout")
        .set("Authorization", "Bearer invalid_token")
        .expect(401);
      expect(response.body.message).toBe(TOKEN_INVALID);
    });
  });
  describe("POST /api/auth/refresh", () => {
    it("should successfully refresh a user's access token", async () => {
      // Login user to get access token
      const loginResponse = await request(app)
        .post("/api/auth/login")
        .send({ email: "test@example.com", password: "password" })
        .expect(200);
      const { accessToken, refreshToken } = loginResponse.body.data;
      // Wait for 5 seconds to ensure that the access token expires
      await new Promise((resolve) => setTimeout(resolve, 2000));
      // Refresh the access token
      const refreshResponse = await request(app)
        .post("/api/auth/refresh")
        .send({ refreshToken })
        .expect(200);
      expect(refreshResponse.body.message).toBe(REFRESH_TOKEN_SUCCESS);
      // Verify that the new access token is different from the old access token
      expect(refreshResponse.body.data).not.toBe(accessToken);
    });
  });
  describe("checkAuthenticated middleware", () => {
    it("should return 401 status code if no access token is provided", () => {
      const req = { headers: {} };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      const next = jest.fn();
      checkAuthenticated(req, res, next);
      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        message: "Access token not found",
      });
    });
    it("should call next() if access token is provided and is valid", async () => {
      // Login user to get access token
      const response = await request(app)
        .post("/api/auth/login")
        .send({ email: "test@example.com", password: "password" })
        .expect(200);
      const { accessToken } = response.body.data;
      const req = {
        headers: { authorization: `Bearer ${accessToken}` },
      };
      const res = {
        status: jest.fn().mockReturnValue({
          json: jest.fn(),
        }),
      };
      const next = jest.fn();
      const verifySpy = jest.spyOn(jwt, "verify");
      checkAuthenticated(req, res, next);
      expect(verifySpy).toHaveBeenCalledWith(
        accessToken,
        process.env.ACCESS_TOKEN_SECRET,
        expect.any(Function)
      );
      expect(next).toHaveBeenCalled();
      verifySpy.mockRestore();
    });
    it("should return a 501 status code if access token is provided but is invalid", () => {
      const req = {
        headers: { authorization: "Bearer invalid-access-token" },
      };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      const next = jest.fn();
      const verifySpy = jest
        .spyOn(jwt, "verify")
        .mockImplementationOnce((token, secret, callback) => {
          callback(new Error("Invalid access token"));
        });
      checkAuthenticated(req, res, next);
      expect(res.status).toHaveBeenCalledWith(501);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        message: "Invalid access token",
      });
      verifySpy.mockRestore();
    });
    it("should return a 403 status code if there is an unexpected error", () => {
      const req = { headers: { authorization: "Bearer valid-access-token" } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      const next = jest.fn();
      const verifySpy = jest.spyOn(jwt, "verify").mockImplementationOnce(() => {
        throw new Error("Unexpected error");
      });
      checkAuthenticated(req, res, next);
      expect(res.status).toHaveBeenCalledWith(403);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        message: "Unexpected error",
      });
      verifySpy.mockRestore();
    });
  });
});
