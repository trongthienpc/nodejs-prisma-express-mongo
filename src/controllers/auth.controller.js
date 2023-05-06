// Import necessary modules
import authService from "../services/auth.service.js";
import {
  LOGOUT_SUCCESS,
  REFRESH_TOKEN_SUCCESS,
  TOKEN_INVALID,
} from "../utils/constants.js";
import {
  LOGIN_ERROR_CODE,
  LOGIN_INVALID,
  LOGIN_MISSING_CODE,
} from "../utils/constants.js";

/**
 * @swagger
 * /register:
 *   post:
 *     summary: Register a new user
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *             required:
 *               - email
 *               - password
 *     responses:
 *       200:
 *         description: User registration successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                 message:
 *                   type: string
 *
 */
export const register = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res
      .status(400)
      .json({ status: false, message: "Missing email address // or password" });

  try {
    const response = await authService.registerUser({ email, password });

    return res.status(response.statusCode).json({
      success: response.success,
      message: response.message,
      data: response?.data,
    });
  } catch (error) {
    console.error(error);
    return res.status(400).json({ error: error.message });
  }
};

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Login a user
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *             required:
 *               - email
 *               - password
 *     responses:
 *       200:
 *         description: User login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *
 */
export const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res
      .status(LOGIN_MISSING_CODE)
      .json({ status: false, message: LOGIN_INVALID });
  try {
    const response = await authService.loginUser({ email, password });
    return res.status(response.statusCode).json({
      success: response.status,
      message: response.message,
      data: response?.data,
    });
  } catch (err) {
    console.error(err);
    return res.status(LOGIN_ERROR_CODE).json({ error: err.message });
  }
};

/**
 * @swagger
 * /refresh:
 *   post:
 *     summary: Refresh user token
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               refreshToken:
 *                 type: string
 *             required:
 *               - refreshToken
 *     responses:
 *       200:
 *         description: Token refresh successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 *
 */
export const refresh = async (req, res, next) => {
  try {
    const { refreshToken } = req.body;
    const token = await authService.refreshTokens(refreshToken);
    res
      .status(200)
      .json({ success: true, message: REFRESH_TOKEN_SUCCESS, data: token });
  } catch (error) {
    next(error);
  }
};

/**
 * @swagger
 * /logout:
 *   post:
 *     summary: Logout a user
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *             required:
 *               - userId
 *     responses:
 *       200:
 *         description: User logout successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *
 */
export const logout = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1]; // Extract token from Authorization header
    const { userId } = req.body;

    if (!token || token === "invalid_token") {
      return res.status(401).json({ message: TOKEN_INVALID });
    }

    // Call authService to revoke refresh token
    await authService.revokeRefreshToken(token);
    res.status(200).send({ message: LOGOUT_SUCCESS });
  } catch (error) {
    console.log("Error :>> ", error);
    next(error);
  }
};
