import express from "express";
import {
  login,
  register,
  refresh,
  logout,
} from "../controllers/auth.controller.js";
import { validate } from "../utils/validators.js";
import { authValidationRules } from "../utils/validators/auth.validator.js";

const authRouter = express.Router();

authRouter.post("/register", validate(authValidationRules.register), register);
authRouter.post("/login", validate(authValidationRules.login), login);
authRouter.post("/refresh", validate(authValidationRules.refresh), refresh);
authRouter.post("/logout", logout);

export default authRouter;
