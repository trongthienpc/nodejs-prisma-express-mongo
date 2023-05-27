// Import necessary modules
import request from "supertest";
import app from "../index.js";
import { CREATE_CONFIGURATION_SUCCESS } from "../utils/constants.js";

// Define test cases for configuration module
describe("Configuration CRUD operations", () => {
  let configurationId;
  let accessToken;

  beforeAll(async () => {
    // Login user to get access token
    const response = await request(app)
      .post("/api/auth/login")
      .send({ email: "test@example.com", password: "password" })
      .expect(200);

    accessToken = response.body.data.accessToken;
  });

  //   Test case for creating a new configuration
  it("should create a new configuration", async () => {
    const res = await request(app)
      .post("/api/configurations")
      .set("Authorization", "Bearer " + accessToken)
      .send({
        name: "Name",
        model: "ItemType",
        status: false,
        description: "Prop Name of the ItemType model",
      });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toMatchObject({
      success: true,
      message: CREATE_CONFIGURATION_SUCCESS,
    });

    expect(res.body.data).toHaveProperty("id");
    configurationId = res.body.data?.id;
  });

  //   Test case for duplicate Item Type
  it("should return duplicate alert", async () => {
    const res = await request(app)
      .post("/api/configurations")
      .set("Authorization", "Bearer " + accessToken)
      .send({
        name: "Name",
        model: "ItemType",
      });
    expect(res.statusCode).toEqual(500);
    expect(res.body).toMatchObject({
      success: false,
      message: "Configuration already exists!",
    });
  });

  // Test case for retrieving all configurations
  it("should retrieve all configurations", async () => {
    const res = await request(app)
      .get("/api/configurations")
      .set("Authorization", `Bearer ${accessToken}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body.data).toBeInstanceOf(Array);
  });

  // Test case for retrieving a specific configuration
  it("should retrieve a specific configuration", async () => {
    const res = await request(app)
      .get(`/api/configurations/${configurationId}`)
      .set("Authorization", `Bearer ${accessToken}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body.data).toHaveProperty("id", configurationId);
  });

  // Test case for updating a configuration
  it("should update a configuration", async () => {
    const res = await request(app)
      .put(`/api/configurations/${configurationId}`)
      .set("Authorization", `Bearer ${accessToken}`)
      .send({
        name: "Description",
        description: "Description prop of Item model",
      });

    expect(res.statusCode).toEqual(200);
    expect(res.body.data).toHaveProperty("id");
    // expect(res.body.data).toHaveProperty("name", "Updated Test configuration");
    // expect(res.body.data.address).toHaveProperty("street", "789 street");
  });

  // Test case for deleting a configuration
  // it("should delete a configuration", async () => {
  //   console.log("configurationId", configurationId);
  //   const res = await request(app)
  //     .delete(`/api/configurations/${configurationId}`)
  //     .set("Authorization", `Bearer ${accessToken}`);
  //   expect(res.statusCode).toEqual(200);
  // });
});
