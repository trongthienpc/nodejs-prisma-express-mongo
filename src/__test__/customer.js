// Import necessary modules
import request from "supertest";
import app from "../index.js";
import { CREATE_CUSTOMER_SUCCESS } from "../utils/constants.js";

// Define test cases for customer module
describe("Customer CRUD operations", () => {
  let customerId;
  let accessToken;

  beforeAll(async () => {
    // Login user to get access token
    const response = await request(app)
      .post("/api/auth/login")
      .send({ email: "test@example.com", password: "password" })
      .expect(200);

    accessToken = response.body.data.accessToken;
  });

  // Test case for creating a new customer
  it("should create a new customer", async () => {
    const res = await request(app)
      .post("/api/customers")
      .set("Authorization", "Bearer " + accessToken)
      .send({
        name: "John Doe",
        email: "johndoe@example.com",
        phone: "1234567890",
      });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toMatchObject({
      success: true,
      message: CREATE_CUSTOMER_SUCCESS,
    });

    expect(res.body.data).toHaveProperty("id");
    customerId = res.body.data?.id;
  });

  it("should return an error message with invalid input data", async () => {
    // Define some test input data with an email that already exists in the database
    const testData = {
      name: "Jane Doe",
      email: "janedoe@example.com",
      phone: "0987654321",
    };

    const res = await request(app)
      .post("/api/customers")
      .set("Authorization", "Bearer " + accessToken)
      .send(testData);

    console.log("res.body", res.body);

    // Check that the result is an error response object
    expect(res.body.success).toBe(false);
    expect(res.body.message).toBe("Email or phone is already registered");

    // Check that the result contains the existing customer
    expect(res.body?.data[0]?.email).toBe(testData.email);
  });

  // Test case for retrieving all customers
  it("should retrieve all customers", async () => {
    const res = await request(app)
      .get("/api/customers")
      .set("Authorization", `Bearer ${accessToken}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body.data).toBeInstanceOf(Array);
  });

  it("should return an array of all customers in the database", async () => {
    // Create some test customers
    const customer1 = {
      name: "John Doe 1",
      email: "johndoe1@example.com",
      phone: "1234567891",
    };
    const customer2 = {
      name: "Jane Doe 1",
      email: "janedoe1@example.com",
      phone: "0987654322",
    };

    await request(app)
      .post("/api/customers")
      .set("Authorization", "Bearer " + accessToken)
      .send(customer1);
    await request(app)
      .post("/api/customers")
      .set("Authorization", "Bearer " + accessToken)
      .send(customer2);

    // Call the getAll function
    const res = await request(app)
      .get("/api/customers")
      .set("Authorization", `Bearer ${accessToken}`);

    console.log("res".body, res.body);

    // Check that the result is an array
    expect(Array.isArray(res.body.data)).toBe(true);

    // Check that the result contains the test customers
    // Check that the email property of each object in the result array is equal to 'johndoe1@example.com'
    const obj1 = res.body.data.filter((obj) => obj.email === customer1.email);
    expect(obj1[0].email).toBe(customer1.email);
    const obj2 = res.body.data.filter((obj) => obj.email === customer2.email);
    expect(obj2[0].email).toBe(customer2.email);
  });

  // Test case for retrieving a specific customer
  it("should retrieve a specific customer", async () => {
    const res = await request(app)
      .get(`/api/customers/${customerId}`)
      .set("Authorization", `Bearer ${accessToken}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body.data).toHaveProperty("id", customerId);
  });

  // Test case for updating a customer
  it("should update a customer", async () => {
    const res = await request(app)
      .put(`/api/customers/${customerId}`)
      .set("Authorization", `Bearer ${accessToken}`)
      .send({
        name: "Jane Doe",
        email: "janedoe2@example.com",
        phone: "0987654323",
      });

    console.log("customerId", customerId);
    expect(res.statusCode).toEqual(200);
    expect(res.body.data).toHaveProperty("id");
    // expect(res.body.data).toHaveProperty("name", "Updated Test Customer");
    // expect(res.body.data.address).toHaveProperty("street", "789 street");
  });

  // Test case for deleting a customer
  it("should delete a customer", async () => {
    const res = await request(app)
      .delete(`/api/customers/${customerId}`)
      .set("Authorization", `Bearer ${accessToken}`);
    expect(res.statusCode).toEqual(200);
  });
});
