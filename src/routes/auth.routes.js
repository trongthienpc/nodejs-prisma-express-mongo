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

/**
 * @swagger
 * tags: 
 *    name: Authentication
 *    description: API for managing authentication.
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - username
 *         - email
 *         - password
 *       properties:
 *         username:
 *           type: string
 *           description: username of user
 *         email:
 *           type: string
 *           description: email of user
 *         password:
 *           type: string
 *           description: password of user
 *           example: "mySuperSecretPassword123"
 */

/**
 * @swagger
 * /register:
 *   post:
 *     tags:
 *       - Authentication
 *     summary: Register User
 *     description: Register a new user with the supplied user data.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: User created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Invalid request
 *       409:
 *         description: User already exists
 */
authRouter.post("/register", validate(authValidationRules.register), register);

/**
 * @swagger
 * /login:
 *   post:
 *     tags:
 *       - Authentication
 *     summary: Login User
 *     description: Logs in an existing user with the supplied credentials.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: Logged in
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 accessToken:
 *                   type: string
 *       400:
 *         description: Invalid request
 *       401:
 *         description: Unauthorized
 */
authRouter.post("/login", validate(authValidationRules.login), login);

/**
 * @swagger
 * /refresh:
 *   post:
 *     tags:
 *       - Authentication
 *     summary: Refresh Access Token
 *     description: Obtains a new access token by presenting a refresh token.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: Access token refreshed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 accessToken:
 *                   type: string
 *       400:
 *         description: Invalid request
 *       401:
 *         description: Unauthorized
 */
authRouter.post("/refresh", validate(authValidationRules.refresh), refresh);

/**
 * @swagger
 * /logout:
 *   post:
 *     tags:
 *       - Authentication
 *     summary: Logout User
 *     description: Invalidates the refresh token, thereby logging the user out.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/user'
 *     responses:
 *       200:
 *         description: Logged out
 *       400:
 *         description: Invalid request
 *       401:
 *         description: Unauthorized
 */
authRouter.post("/logout", validate(authValidationRules.logout), logout);

export default authRouter;
