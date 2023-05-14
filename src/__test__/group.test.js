import request from "supertest";
import app from "../index.js";
import prisma from "../lib/prisma.js";
import {
  CREATE_BRANCH_SUCCESS,
  CREATE_GROUP_SUCCESS,
  DELETE_GROUP_SUCCESS,
  GET_ALL_GROUPS_SUCCESS,
  GET_GROUP_SUCCESS,
  OK,
  UPDATE_GROUP_SUCCESS,
} from "../utils/constants.js";

// TEST CASES FOR GROUP API

describe("GROUP API", () => {
  // Define a variable to store created group ID
  let groupId;
  let accessToken;

  beforeAll(async () => {
    // Login user to get access token
    const response = await request(app)
      .post("/api/auth/login")
      .send({ email: "test@example.com", password: "password" })
      .expect(200);

    accessToken = response.body.data.accessToken;
  });

  // Test case for GET all groups
  describe("GET /groups", () => {
    it("should return all groups", async () => {
      const res = await request(app)
        .get("/api/group")
        .set("Authorization", `Bearer ${accessToken}`)
        .expect(OK);

      // Assert that the response contains the correct data
      expect(res.body).toMatchObject({
        success: true,
        message: GET_ALL_GROUPS_SUCCESS,
        data: expect.any(Array),
      });
    });
  });

  describe("POST /groups", () => {
    it("should created new group successfully", async () => {
      const res = await request(app)
        .post("/api/group")
        .set("Authorization", `Bearer ${accessToken}`)
        .send({ name: "Group 1" })
        .expect(OK);

      // Assert that the response contains the correct data
      expect(res.body).toMatchObject({
        success: true,
        message: CREATE_GROUP_SUCCESS,
      });

      groupId = res.body.data.id;
      console.log("groupId", groupId);
    });

    it("should return group is existing", async () => {
      const res = await request(app)
        .post("/api/group")
        .set("Authorization", `Bearer ${accessToken}`)
        .send({ name: "Group 1" })
        .expect(500);

      // Assert that the response contains the correct data
      expect(res.body).toMatchObject({
        success: false,
        message: "Group with name already exists",
      });
    });
  });

  // Test case for GET group by ID
  describe("GET /group/:id", () => {
    it("should return a group by ID", async () => {
      const groups = await prisma.group.findMany();
      const id = groups[0].id;

      const res = await request(app)
        .get(`/api/group/${id}`)
        .set("Authorization", `Bearer ${accessToken}`)
        .expect(OK);

      // Assert that the response contains the correct data
      expect(res.body).toMatchObject({
        success: true,
        message: GET_GROUP_SUCCESS,
        data: expect.any(Object),
      });
    });
  });

  // Test case for PUT group
  describe("PUT /groups/:id", () => {
    it("should update a group", async () => {
      const groups = await prisma.group.findMany();
      const id = groups[0].id;

      const res = await request(app)
        .put(`/api/group/${id}`)
        .set("Authorization", `Bearer ${accessToken}`)
        .send({ name: "Updated Branch Name" })
        .expect(OK);

      // Assert that the response contains the correct data
      expect(res.body).toMatchObject({
        success: true,
        message: UPDATE_GROUP_SUCCESS,
        data: expect.any(Object),
      });
    });
  });

  // Test case for DELETE group
  describe("DELETE /groups/:id", () => {
    // afterAll(async () => {
    //   // Delete the created group after all tests are finished
    //   await prisma.group.delete({
    //     where: { id: groupId },
    //   });
    // });
    // it("should delete a group", async () => {
    //   const groups = await prisma.group.findMany();
    //   const id = groups[0].id;
    //   const res = await request(app)
    //     .delete(`/api/group/${id}`)
    //     .set("Authorization", `Bearer ${accessToken}`)
    //     .expect(OK);
    //   // Assert that the response contains the correct data
    //   expect(res.body).toMatchObject({
    //     success: true,
    //     message: DELETE_GROUP_SUCCESS,
    //   });
    // });
  });
});
