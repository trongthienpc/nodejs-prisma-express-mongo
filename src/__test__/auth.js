// import request from "supertest";
// import app from "../index.js";
// import prisma from "../lib/prisma.js";
// import {
//   LOGIN_INVALID,
//   LOGIN_INVALID_CODE,
//   LOGIN_SUCCESS,
//   LOGOUT_SUCCESS,
//   REFRESH_TOKEN_SUCCESS,
//   REGISTER_DUPLICATE_EMAIL,
//   REGISTER_INVALID_CODE,
//   REGISTER_SUCCESS,
//   TOKEN_INVALID,
// } from "../utils/constants";

// describe("Auth API", () => {
//   describe("POST /api/auth/register", () => {
//     // it(`should return 200 and message "${REGISTER_SUCCESS}" if registration is successful`, async () => {
//     //   const response = await request(app)
//     //     .post("/api/auth/register")
//     //     .send({
//     //       name: "Test User",
//     //       email: "test@example.com",
//     //       password: "password",
//     //     })
//     //     .expect(200);
//     //   expect(response.body.message).toBe(REGISTER_SUCCESS);
//     // });
//     // it('should return 400 and message "Validation failed" if request body is invalid', async () => {
//     //   const response = await request(app)
//     //     .post("/api/auth/register")
//     //     .send({})
//     //     .expect(400);
//     //   expect(response.body.message).toBe("Validation failed");
//     // });
//     // it(`should return "${REGISTER_INVALID_CODE}" and message "${REGISTER_DUPLICATE_EMAIL}" if email is already registered`, async () => {
//     //   const response = await request(app)
//     //     .post("/api/auth/register")
//     //     .send({
//     //       name: "Test User",
//     //       email: "test@example.com",
//     //       password: "password",
//     //     })
//     //     .expect(REGISTER_INVALID_CODE);
//     //   expect(response.body.message).toBe(REGISTER_DUPLICATE_EMAIL);
//     // });
//   });

//   describe("POST /api/auth/login", () => {
//     it(`should return 200 and message "${LOGIN_SUCCESS}" if login is successful`, async () => {
//       const response = await request(app)
//         .post("/api/auth/login")
//         .send({
//           email: "test@example.com",
//           password: "password",
//         })
//         .expect(200);
//       expect(response.body.message).toBe(LOGIN_SUCCESS);
//       expect(response.body.data.accessToken).toBeDefined();
//       expect(response.body.data.refreshToken).toBeDefined();
//     });
//     it(`should return ${LOGIN_INVALID_CODE} and message "${LOGIN_INVALID}" if email or password is incorrect`, async () => {
//       const response = await request(app)
//         .post("/api/auth/login")
//         .send({
//           email: "nonexistent@example.com",
//           password: "password",
//         })
//         .expect(LOGIN_INVALID_CODE);
//       expect(response.body.message).toBe(LOGIN_INVALID);
//     });
//   });

//   // Add more test cases for logout and refresh routes here...
//   describe("POST /api/auth/logout", () => {
//     it("should successfully logout a user", async () => {
//       // Login user to get access token
//       const response = await request(app)
//         .post("/api/auth/login")
//         .send({ email: "test@example.com", password: "password" })
//         .expect(200);
//       const { refreshToken } = response.body.data;
//       // Logout the user
//       const logoutResponse = await request(app)
//         .post("/api/auth/logout")
//         .set("Authorization", `Bearer ${refreshToken}`)
//         .expect(200);
//       expect(logoutResponse.body.message).toBe(LOGOUT_SUCCESS);
//       // Verify that the access token has been deleted
//       const refreshTokenExists = await prisma.refreshToken.findUnique({
//         where: { token: response.body.data.refreshToken },
//       });
//       expect(refreshTokenExists).toBeNull();
//     });

//     it("should return 401 if access token is invalid during logout", async () => {
//       const response = await request(app)
//         .post("/api/auth/logout")
//         .set("Authorization", "Bearer invalid_token")
//         .expect(401);

//       expect(response.body.message).toBe(TOKEN_INVALID);
//     });
//   });

//   describe("POST /api/auth/refresh", () => {
//     it("should successfully refresh a user's access token", async () => {
//       // Login user to get access token
//       const loginResponse = await request(app)
//         .post("/api/auth/login")
//         .send({ email: "test@example.com", password: "password" })
//         .expect(200);

//       const { accessToken, refreshToken } = loginResponse.body.data;

//       // Wait for 5 seconds to ensure that the access token expires
//       await new Promise((resolve) => setTimeout(resolve, 2000));

//       // Refresh the access token
//       const refreshResponse = await request(app)
//         .post("/api/auth/refresh")
//         .send({ refreshToken })
//         .expect(200);

//       expect(refreshResponse.body.message).toBe(REFRESH_TOKEN_SUCCESS);

//       console.log("refreshResponse.body.data :>> ", refreshResponse.body);
//       // Verify that the new access token is different from the old access token
//       expect(refreshResponse.body.data).not.toBe(accessToken);
//     });
//   });
// });
