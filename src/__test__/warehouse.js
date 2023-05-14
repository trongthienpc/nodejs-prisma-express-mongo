// Import necessary modules
import request from "supertest";
import app from "../index.js";
import prisma from "../lib/prisma.js";
import { CREATE_WAREHOUSE_SUCCESS } from "../utils/constants.js";

// Define test cases for warehouse module
describe("Warehouse CRUD operations", () => {
  let warehouseId;
  let accessToken;

  beforeAll(async () => {
    // Login user to get access token
    const response = await request(app)
      .post("/api/auth/login")
      .send({ email: "test@example.com", password: "password" })
      .expect(200);

    accessToken = response.body.data.accessToken;
  });

  // Test case for creating a new warehouse
  it("should create a new warehouse", async () => {
    const res = await request(app)
      .post("/api/warehouses")
      .set("Authorization", "Bearer " + accessToken)
      .send({
        name: "Test Warehouse",
        branchId: "645f99b0c2f100150828157c",
        address: {
          street: "124 st Lorem",
          city: "London",
          state: "London",
          zip: "123",
        },
      });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toMatchObject({
      success: true,
      message: CREATE_WAREHOUSE_SUCCESS,
    });

    expect(res.body.data).toHaveProperty("id");
    warehouseId = res.body.data?.id;
  });

  // Test case for retrieving all warehouses
  it("should retrieve all warehouses", async () => {
    const res = await request(app)
      .get("/api/warehouses")
      .set("Authorization", `Bearer ${accessToken}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body.data).toBeInstanceOf(Array);
  });

  // Test case for retrieving a specific warehouse
  it("should retrieve a specific warehouse", async () => {
    const res = await request(app)
      .get(`/api/warehouses/${warehouseId}`)
      .set("Authorization", `Bearer ${accessToken}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body.data).toHaveProperty("id", warehouseId);
  });

  // Test case for updating a warehouse
  it("should update a warehouse", async () => {
    const res = await request(app)
      .put(`/api/warehouses/${warehouseId}`)
      .set("Authorization", `Bearer ${accessToken}`)
      .send({
        name: "Updated Test Warehouse",
        address: {
          street: "789 street",
          city: "Seattle",
          state: "WA",
          zip: "456-55",
        },
      });

    console.log("warehouseId", warehouseId);
    expect(res.statusCode).toEqual(200);
    expect(res.body.data).toHaveProperty("id");
    // expect(res.body.data).toHaveProperty("name", "Updated Test Warehouse");
    // expect(res.body.data.address).toHaveProperty("street", "789 street");
  });

  // Test case for deleting a warehouse
  it("should delete a warehouse", async () => {
    const res = await request(app)
      .delete(`/api/warehouses/${warehouseId}`)
      .set("Authorization", `Bearer ${accessToken}`);
    expect(res.statusCode).toEqual(200);
  });
});
