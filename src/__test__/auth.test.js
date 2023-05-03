import request from "supertest";
import app from "../index.js";
import { EMAIL_EXIST } from "../utils/constants.js";

// describe("Auth endpoint", () => {
//   describe("POST auth/register", () => {
//     it("should register a user", async () => {
//       const user = {
//         email: "user2@example.com",
//         password: "123456",
//       };

//       const response = await request(app)
//         .post("/auth/register")
//         .send(user)
//         .expect(200);

//       expect(response.body.success).toBe(true);
//     });

//     it("should return 400 if email already registered", async () => {
//       const user = {
//         email: "user@example.com",
//         password: "123456",
//       };

//       const response = await request(app)
//         .post("/auth/register")
//         .send(user)
//         .expect(400);

//       expect(response.body.message).toBe(EMAIL_EXIST);
//     });
//   });
// });
