// Import necessary modules
import request from "supertest";
import app from "../index.js";
import { CREATE_APPOINTMENT_SUCCESS } from "../utils/constants.js";

// Define test cases for appointment module
describe("Appointment CRUD operations", () => {
  let appointmentId;
  let accessToken;

  beforeAll(async () => {
    // Login user to get access token
    const response = await request(app)
      .post("/api/auth/login")
      .send({ email: "test@example.com", password: "password" })
      .expect(200);

    accessToken = response.body.data.accessToken;
  });

  //   Test case for creating a new appointment
  it("should create a new appointment", async () => {
    const res = await request(app)
      .post("/api/appointment")
      .set("Authorization", "Bearer " + accessToken)
      .send({
        customerId: "c-1",
        appointmentTypeId: "at-1",
        appointmentTime: new Date(),
        branchId: "1",
        requestedStaffId: "staff1",
        appointmentStatusId: "status1",
      });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toMatchObject({
      success: true,
      message: CREATE_APPOINTMENT_SUCCESS,
    });

    expect(res.body.data).toHaveProperty("id");
    appointmentId = res.body.data?.id;
  });

  // //   Test case for duplicate Item Type
  // it("should return duplicate alert", async () => {
  //   const res = await request(app)
  //     .post("/api/appointment")
  //     .set("Authorization", "Bearer " + accessToken)
  //     .send({
  //       name: "Chưa xác nhận",
  //     });
  //   expect(res.statusCode).toEqual(500);
  //   expect(res.body).toMatchObject({
  //     success: false,
  //     message: "Item already exists!",
  //   });
  // });

  // Test case for retrieving all appointments
  it("should retrieve all appointments", async () => {
    const res = await request(app)
      .get("/api/appointment")
      .set("Authorization", `Bearer ${accessToken}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body.data).toBeInstanceOf(Array);
  });

  // Test case for retrieving a specific appointment
  it("should retrieve a specific appointment", async () => {
    const res = await request(app)
      .get(`/api/appointment/${appointmentId}`)
      .set("Authorization", `Bearer ${accessToken}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body.data).toHaveProperty("id", appointmentId);
  });

  // Test case for updating a appointment
  it("should update a appointment", async () => {
    const res = await request(app)
      .put(`/api/appointment/${appointmentId}`)
      .set("Authorization", `Bearer ${accessToken}`)
      .send({
        customerId: "c-2",
      });

    expect(res.statusCode).toEqual(200);
    expect(res.body.data).toHaveProperty("id");
    // expect(res.body.data).toHaveProperty("name", "Updated Test appointment");
    // expect(res.body.data.address).toHaveProperty("street", "789 street");
  });

  // Test case for deleting a appointment
  it("should delete a appointment", async () => {
    console.log("appointmentId", appointmentId);
    const res = await request(app)
      .delete(`/api/appointment/${appointmentId}`)
      .set("Authorization", `Bearer ${accessToken}`);
    expect(res.statusCode).toEqual(200);
  });
});
