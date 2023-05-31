// Import necessary modules
import request from "supertest";
import app from "../index.js";
import { CREATE_APPOINTMENT_STATUS_SUCCESS } from "../utils/constants.js";

// Define test cases for appointmentStatus module
describe("AppointmentStatus CRUD operations", () => {
  let appointmentStatusId;
  let accessToken;

  beforeAll(async () => {
    // Login user to get access token
    const response = await request(app)
      .post("/api/auth/login")
      .send({ email: "test@example.com", password: "password" })
      .expect(200);

    accessToken = response.body.data.accessToken;
  });

  //   Test case for creating a new appointmentStatus
  it("should create a new appointmentStatus", async () => {
    const res = await request(app)
      .post("/api/appointmentStatus")
      .set("Authorization", "Bearer " + accessToken)
      .send({
        name: "Chưa xác nhận",
        color: "#0d6efd",
      });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toMatchObject({
      success: true,
      message: CREATE_APPOINTMENT_STATUS_SUCCESS,
    });

    expect(res.body.data).toHaveProperty("id");
    appointmentStatusId = res.body.data?.id;
  });

  //   Test case for duplicate Item Type
  it("should return duplicate alert", async () => {
    const res = await request(app)
      .post("/api/appointmentStatus")
      .set("Authorization", "Bearer " + accessToken)
      .send({
        name: "Chưa xác nhận",
      });
    expect(res.statusCode).toEqual(500);
    expect(res.body).toMatchObject({
      success: false,
      message: "Item already exists!",
    });
  });

  // Test case for retrieving all appointmentStatuss
  it("should retrieve all appointmentStatuss", async () => {
    const res = await request(app)
      .get("/api/appointmentStatus")
      .set("Authorization", `Bearer ${accessToken}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body.data).toBeInstanceOf(Array);
  });

  // Test case for retrieving a specific appointmentStatus
  it("should retrieve a specific appointmentStatus", async () => {
    const res = await request(app)
      .get(`/api/appointmentStatus/${appointmentStatusId}`)
      .set("Authorization", `Bearer ${accessToken}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body.data).toHaveProperty("id", appointmentStatusId);
  });

  // Test case for updating a appointmentStatus
  it("should update a appointmentStatus", async () => {
    const res = await request(app)
      .put(`/api/appointmentStatus/${appointmentStatusId}`)
      .set("Authorization", `Bearer ${accessToken}`)
      .send({
        name: "Xác nhận",
      });

    expect(res.statusCode).toEqual(200);
    expect(res.body.data).toHaveProperty("id");
    // expect(res.body.data).toHaveProperty("name", "Updated Test appointmentStatus");
    // expect(res.body.data.address).toHaveProperty("street", "789 street");
  });

  // Test case for deleting a appointmentStatus
  it("should delete a appointmentStatus", async () => {
    console.log("appointmentStatusId", appointmentStatusId);
    const res = await request(app)
      .delete(`/api/appointmentStatus/${appointmentStatusId}`)
      .set("Authorization", `Bearer ${accessToken}`);
    expect(res.statusCode).toEqual(200);
  });
});
