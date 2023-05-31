// Import necessary modules
import request from "supertest";
import app from "../index.js";
import { CREATE_APPOINTMENT_TYPE_SUCCESS } from "../utils/constants.js";

// Define test cases for appointmentType module
describe("AppointmentType CRUD operations", () => {
  let appointmentTypeId;
  let accessToken;

  beforeAll(async () => {
    // Login user to get access token
    const response = await request(app)
      .post("/api/auth/login")
      .send({ email: "test@example.com", password: "password" })
      .expect(200);

    accessToken = response.body.data.accessToken;
  });

  //   Test case for creating a new appointmentType
  it("should create a new appointmentType", async () => {
    const res = await request(app)
      .post("/api/appointmentType")
      .set("Authorization", "Bearer " + accessToken)
      .send({
        name: "Lịch chăm sóc",
      });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toMatchObject({
      success: true,
      message: CREATE_APPOINTMENT_TYPE_SUCCESS,
    });

    expect(res.body.data).toHaveProperty("id");
    appointmentTypeId = res.body.data?.id;
  });

  //   Test case for duplicate Item Type
  it("should return duplicate alert", async () => {
    const res = await request(app)
      .post("/api/appointmentType")
      .set("Authorization", "Bearer " + accessToken)
      .send({
        name: "Lịch chăm sóc",
      });
    expect(res.statusCode).toEqual(500);
    expect(res.body).toMatchObject({
      success: false,
      message: "Item already exists!",
    });
  });

  // Test case for retrieving all appointmentTypes
  it("should retrieve all appointmentTypes", async () => {
    const res = await request(app)
      .get("/api/appointmentType")
      .set("Authorization", `Bearer ${accessToken}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body.data).toBeInstanceOf(Array);
  });

  // Test case for retrieving a specific appointmentType
  it("should retrieve a specific appointmentType", async () => {
    const res = await request(app)
      .get(`/api/appointmentType/${appointmentTypeId}`)
      .set("Authorization", `Bearer ${accessToken}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body.data).toHaveProperty("id", appointmentTypeId);
  });

  // Test case for updating a appointmentType
  it("should update a appointmentType", async () => {
    const res = await request(app)
      .put(`/api/appointmentType/${appointmentTypeId}`)
      .set("Authorization", `Bearer ${accessToken}`)
      .send({
        name: "Lịch liệu trình",
      });

    expect(res.statusCode).toEqual(200);
    expect(res.body.data).toHaveProperty("id");
    // expect(res.body.data).toHaveProperty("name", "Updated Test appointmentType");
    // expect(res.body.data.address).toHaveProperty("street", "789 street");
  });

  // Test case for deleting a appointmentType
  it("should delete a appointmentType", async () => {
    console.log("appointmentTypeId", appointmentTypeId);
    const res = await request(app)
      .delete(`/api/appointmentType/${appointmentTypeId}`)
      .set("Authorization", `Bearer ${accessToken}`);
    expect(res.statusCode).toEqual(200);
  });
});
