import { body, header } from "express-validator";

export const authValidationRules = {
  register: [
    body("email").isEmail(),
    body("password").isLength({ min: 6 }),
    // body("firstName").notEmpty(),
    // body("lastName").notEmpty(),
  ],
  login: [body("email").isEmail(), body("password").notEmpty()],
  logout: [header("Authorization").notEmpty()],
  refresh: [body("refreshToken").notEmpty()],
};
