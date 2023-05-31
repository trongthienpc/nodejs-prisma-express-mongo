// Import necessary modules
import request from "supertest";
import app from "../index.js";
import { CREATE_BRANCH_SUCCESS } from "../utils/constants.js";

// Define test cases for branch module
describe("Branch CRUD operations", () => {
  let branchId;
  let accessToken;

  beforeAll(async () => {
    // Login user to get access token
    const response = await request(app)
      .post("/api/auth/login")
      .send({ email: "test@example.com", password: "password" })
      .expect(200);

    accessToken = response.body.data.accessToken;
  });

  //   Test case for creating a new branch
  it("should create a new branch", async () => {
    const res = await request(app)
      .post("/api/branch")
      .set("Authorization", "Bearer " + accessToken)
      .send({
        name: "Dermaderm",
      });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toMatchObject({
      success: true,
      message: CREATE_BRANCH_SUCCESS,
    });

    expect(res.body.data).toHaveProperty("id");
    branchId = res.body.data?.id;
  });

  //   Test case for duplicate Item Type
  it("should return duplicate alert", async () => {
    const res = await request(app)
      .post("/api/branch")
      .set("Authorization", "Bearer " + accessToken)
      .send({
        name: "Dermaderm",
      });
    expect(res.statusCode).toEqual(500);
    expect(res.body).toMatchObject({
      success: false,
      message: "Branch already exists!",
    });
  });

  // Test case for retrieving all branchs
  it("should retrieve all branchs", async () => {
    const res = await request(app)
      .get("/api/branch")
      .set("Authorization", `Bearer ${accessToken}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body.data).toBeInstanceOf(Array);
  });

  // Test case for retrieving a specific branch
  it("should retrieve a specific branch", async () => {
    const res = await request(app)
      .get(`/api/branch/${branchId}`)
      .set("Authorization", `Bearer ${accessToken}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body.data).toHaveProperty("id", branchId);
  });

  // Test case for updating a branch
  it("should update a branch", async () => {
    const res = await request(app)
      .put(`/api/branch/${branchId}`)
      .set("Authorization", `Bearer ${accessToken}`)
      .send({
        name: "Kingdom",
      });

    expect(res.statusCode).toEqual(200);
    expect(res.body.data).toHaveProperty("id");
    // expect(res.body.data).toHaveProperty("name", "Updated Test branch");
    // expect(res.body.data.address).toHaveProperty("street", "789 street");
  });

  // Test case for deleting a branch
  it("should delete a branch", async () => {
    console.log("branchId", branchId);
    const res = await request(app)
      .delete(`/api/branch/${branchId}`)
      .set("Authorization", `Bearer ${accessToken}`);
    expect(res.statusCode).toEqual(200);
  });
});
