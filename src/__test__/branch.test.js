import request from "supertest";
import app from "../index.js";
import prisma from "../lib/prisma.js";
import { CREATE_BRANCH_SUCCESS, OK } from "../utils/constants.js";

describe("BRANCH API", () => {
  describe("POST /branches", () => {
    it("should create a new branch", async () => {
      // Login user to get access token
      const response = await request(app)
        .post("/api/auth/login")
        .send({ email: "test@example.com", password: "password" })
        .expect(200);
      const { accessToken } = response.body.data;

      const res = await request(app)
        .post("/api/branch")
        .set("Authorization", `Bearer ${accessToken}`)
        .send({ name: "Test Branch", address: "123 Test Street" })
        .expect(OK);

      console.log("res.body :>> ", res.body);
      // Store the created branch ID
      const branchId = res.body.data.id;

      // Assert that the response contains the correct data
      expect(res.body).toMatchObject({
        success: true,
        message: CREATE_BRANCH_SUCCESS,
        data: {
          id: expect.any(String),
          name: "Test Branch",
          address: "123 Test Street",
          //   warehouses: expect.any(Array),
        },
      });
    });
  });
});
