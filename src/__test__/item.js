// Import necessary modules
import request from "supertest";
import app from "../index.js";
import { CREATE_ITEM_SUCCESS } from "../utils/constants.js";

// Define test cases for item module
describe("Item CRUD operations", () => {
  let itemId;
  let accessToken;

  beforeAll(async () => {
    // Login user to get access token
    const response = await request(app)
      .post("/api/auth/login")
      .send({ email: "test@example.com", password: "password" })
      .expect(200);

    accessToken = response.body.data.accessToken;
  });

  //   Test case for creating a new item
  it("should create a new item", async () => {
    const res = await request(app)
      .post("/api/items")
      .set("Authorization", "Bearer " + accessToken)
      .send({
        name: "Kem dưỡng ẩm cho da dễ kích ứng",
        itemTypeId: "64707d2b830067f5aef9f3fb",
      });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toMatchObject({
      success: true,
      message: CREATE_ITEM_SUCCESS,
    });

    expect(res.body.data).toHaveProperty("id");
    itemId = res.body.data?.id;
  });

  //   Test case for duplicate Item Type
  it("should return duplicate alert", async () => {
    const res = await request(app)
      .post("/api/items")
      .set("Authorization", "Bearer " + accessToken)
      .send({
        name: "Kem dưỡng ẩm cho da dễ kích ứng",
        itemTypeId: "64707d2b830067f5aef9f3fb",
      });
    expect(res.statusCode).toEqual(500);
    expect(res.body).toMatchObject({
      success: false,
      message: "Item already exists!",
    });
  });

  // Test case for retrieving all items
  it("should retrieve all items", async () => {
    const res = await request(app)
      .get("/api/items")
      .set("Authorization", `Bearer ${accessToken}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body.data).toBeInstanceOf(Array);
  });

  // Test case for retrieving a specific item
  it("should retrieve a specific item", async () => {
    const res = await request(app)
      .get(`/api/items/${itemId}`)
      .set("Authorization", `Bearer ${accessToken}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body.data).toHaveProperty("id", itemId);
  });

  // Test case for updating a item
  it("should update a item", async () => {
    const res = await request(app)
      .put(`/api/items/${itemId}`)
      .set("Authorization", `Bearer ${accessToken}`)
      .send({
        name: "Gel rửa mặt êm dịu cho da nhạy cảm 125ml",
      });

    expect(res.statusCode).toEqual(200);
    expect(res.body.data).toHaveProperty("id");
    // expect(res.body.data).toHaveProperty("name", "Updated Test item");
    // expect(res.body.data.address).toHaveProperty("street", "789 street");
  });

  // Test case for deleting a item
  it("should delete a item", async () => {
    console.log("itemId", itemId);
    const res = await request(app)
      .delete(`/api/items/${itemId}`)
      .set("Authorization", `Bearer ${accessToken}`);
    expect(res.statusCode).toEqual(200);
  });
});
