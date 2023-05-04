import { body } from "express-validator";

export const authValidationRules = {
  register: [
    body("email").isEmail(),
    body("password").isLength({ min: 6 }),
    // body("firstName").notEmpty(),
    // body("lastName").notEmpty(),
  ],
  login: [body("email").isEmail(), body("password").notEmpty()],
  logout: [body("refreshToken").notEmpty()],
  refresh: [body("refreshToken").notEmpty()],
};
