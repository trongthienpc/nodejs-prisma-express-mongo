// Import necessary modules
import request from "supertest";
import app from "../index.js";
import { CREATE_ITEM_TYPE_SUCCESS } from "../utils/constants.js";

// Define test cases for ItemType module
describe("ItemType CRUD operations", () => {
  let ItemTypeId;
  let accessToken;

  beforeAll(async () => {
    // Login user to get access token
    const response = await request(app)
      .post("/api/auth/login")
      .send({ email: "test@example.com", password: "password" })
      .expect(200);

    accessToken = response.body.data.accessToken;
  });

  //   Test case for creating a new ItemType
  it("should create a new ItemType", async () => {
    const res = await request(app)
      .post("/api/itemTypes")
      .set("Authorization", "Bearer " + accessToken)
      .send({
        name: "Electronics",
        description: "Items related to electronics",
      });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toMatchObject({
      success: true,
      message: CREATE_ITEM_TYPE_SUCCESS,
    });

    expect(res.body.data).toHaveProperty("id");
    ItemTypeId = res.body.data?.id;
  });

  // Test case for retrieving all ItemTypes
  it("should retrieve all ItemTypes", async () => {
    const res = await request(app)
      .get("/api/ItemTypes")
      .set("Authorization", `Bearer ${accessToken}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body.data).toBeInstanceOf(Array);
  });

  // Test case for retrieving a specific ItemType
  it("should retrieve a specific ItemType", async () => {
    const res = await request(app)
      .get(`/api/ItemTypes/${ItemTypeId}`)
      .set("Authorization", `Bearer ${accessToken}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body.data).toHaveProperty("id", ItemTypeId);
  });

  // Test case for updating a ItemType
  it("should update a ItemType", async () => {
    const res = await request(app)
      .put(`/api/ItemTypes/${ItemTypeId}`)
      .set("Authorization", `Bearer ${accessToken}`)
      .send({
        name: "Clothing",
        description: "Items related to clothing",
      });

    console.log("ItemTypeId", ItemTypeId);
    expect(res.statusCode).toEqual(200);
    expect(res.body.data).toHaveProperty("id");
    // expect(res.body.data).toHaveProperty("name", "Updated Test ItemType");
    // expect(res.body.data.address).toHaveProperty("street", "789 street");
  });

  // Test case for deleting a ItemType
  it("should delete a ItemType", async () => {
    const res = await request(app)
      .delete(`/api/ItemTypes/${ItemTypeId}`)
      .set("Authorization", `Bearer ${accessToken}`);
    expect(res.statusCode).toEqual(200);
  });
});
