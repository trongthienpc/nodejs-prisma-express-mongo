import request from "supertest";
import app from "../index.js";
import prisma from "../lib/prisma.js";
import {
  CREATE_BRANCH_SUCCESS,
  DELETE_BRANCH_SUCCESS,
  GET_ALL_BRANCHES_SUCCESS,
  GET_BRANCH_SUCCESS,
  OK,
  UPDATE_BRANCH_SUCCESS,
} from "../utils/constants.js";

// TEST CASES FOR BRANCH API

describe("BRANCH API", () => {
  // Define a variable to store created branch ID
  let branchId;

  beforeAll(async () => {
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

    // Store the created branch ID
    branchId = res.body.data.id;
  });

  // Test case for GET all branches
  describe("GET /branches", () => {
    it("should return all branches", async () => {
      const res = await request(app).get("/api/branch").expect(OK);

      // Assert that the response contains the correct data
      expect(res.body).toMatchObject({
        success: true,
        message: GET_ALL_BRANCHES_SUCCESS,
        data: expect.any(Array),
      });
    });
  });

  // Test case for GET branch by ID
  describe("GET /branches/:id", () => {
    it("should return a branch by ID", async () => {
      const branches = await prisma.branch.findMany();
      const id = branches[0].id;

      const res = await request(app).get(`/api/branch/${id}`).expect(OK);

      // Assert that the response contains the correct data
      expect(res.body).toMatchObject({
        success: true,
        message: GET_BRANCH_SUCCESS,
        data: expect.any(Object),
      });
    });
  });

  // Test case for PUT branch
  describe("PUT /branches/:id", () => {
    it("should update a branch", async () => {
      const branches = await prisma.branch.findMany();
      const id = branches[0].id;

      const res = await request(app)
        .put(`/api/branch/${id}`)
        .send({ name: "Updated Branch Name", address: "Updated Address" })
        .expect(OK);

      // Assert that the response contains the correct data
      expect(res.body).toMatchObject({
        success: true,
        message: UPDATE_BRANCH_SUCCESS,
        data: expect.any(Object),
      });
    });
  });

  // Test case for DELETE branch
  describe("DELETE /branches/:id", () => {
    // afterAll(async () => {
    //   // Delete the created branch after all tests are finished
    //   await prisma.branch.delete({
    //     where: { id: branchId },
    //   });
    // });

    it("should delete a branch", async () => {
      const branches = await prisma.branch.findMany();
      const id = branches[0].id;

      const res = await request(app).delete(`/api/branch/${id}`).expect(OK);

      // Assert that the response contains the correct data
      expect(res.body).toMatchObject({
        success: true,
        message: DELETE_BRANCH_SUCCESS,
      });
    });
  });
});
