// Import necessary modules
import prisma from "../lib/prisma.js";
import bcrypt from "bcryptjs";
import { createClient } from "redis";
import {
  REGISTER_INVALID_CODE,
  REGISTER_DUPLICATE_EMAIL,
  LOGIN_INVALID_CODE,
  TOKEN_INVALID,
  TOKEN_INVALID_CODE,
  TOKEN_SUCCESS,
  REFRESH_TOKEN_INVALID,
  REFRESH_TOKEN_INVALID_CODE,
  REGISTER_SUCCESS,
  LOGOUT_SUCCESS,
} from "../utils/constants.js";
import {
  generateAccessToken,
  generateRefreshToken,
  verifyAccessToken,
  verifyRefreshToken,
} from "./jwt.service.js";
import { LOGIN_INVALID } from "../utils/constants.js";
import { LOGIN_SUCCESS } from "../utils/constants.js";

// Create Redis client
const redisClient = createClient({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
});

// Log Redis client errors and connection status
redisClient.on("error", (err) => console.log("Redis Client Error", err));
redisClient.on("connect", () => {
  console.log("Connected to Redis...");
});

redisClient.connect();

// Define authService object
const authService = {
  /**
   * Register a new user
   * @param {string} email - User's email
   * @param {string} password - User's password
   * @returns {object} - Response object containing status code, success status, message, and user data
   */
  async registerUser({ email, password }) {
    try {
      // Check if user already exists
      const userExist = await prisma.account.findUnique({
        where: { email: email },
      });

      if (userExist) {
        return {
          statusCode: REGISTER_INVALID_CODE,
          success: false,
          message: REGISTER_DUPLICATE_EMAIL,
        };
      }

      // Hash the password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      // Create a new user
      const user = await prisma.account.create({
        data: {
          email,
          password: hashedPassword,
        },
      });

      return {
        statusCode: 200,
        success: true,
        message: REGISTER_SUCCESS,
        data: user,
      };
    } catch (error) {
      console.error("Error registering user:", error);
      throw new Error("Unable to register user");
    }
  },

  /**
   * Login a user
   * @param {string} email - User's email
   * @param {string} password - User's password
   * @returns {object} - Response object containing status code, success status, message, and tokens
   */
  async loginUser({ email, password }) {
    try {
      // Find the user by email
      const user = await prisma.account.findUnique({
        where: { email: email },
      });

      // If user doesn't exist, return error response
      if (!user) {
        return {
          statusCode: LOGIN_INVALID_CODE,
          success: false,
          message: LOGIN_INVALID,
        };
      }

      // Check if the password is correct
      const passwordMatch = await bcrypt.compare(password, user.password);

      // If password doesn't match, return error response
      if (!passwordMatch) {
        return {
          statusCode: LOGIN_INVALID_CODE,
          success: false,
          message: LOGIN_INVALID,
        };
      }

      // Generate a JWT token
      const accessToken = generateAccessToken(user.id);

      // Generate a refresh token
      const refreshToken = generateRefreshToken(user.id);

      // Save refresh token in Redis with expiration time
      try {
        await redisClient.set(
          user.id,
          refreshToken,
          "EX",
          process.env.REFRESH_TOKEN_EXPIRATION_TIME
        );
      } catch (error) {
        console.error("Error saving refresh token to Redis:", error);
        throw new Error("Unable to save refresh token");
      }

      // Return success response with tokens
      return {
        statusCode: 200,
        success: true,
        message: LOGIN_SUCCESS,
        data: { accessToken, refreshToken },
      };
    } catch (error) {
      console.error("Error logging in user:", error);
      throw new Error("Unable to login user");
    }
  },

  /**
   * Verify a JWT token
   * @param {string} token - JWT token to verify
   * @returns {object} - Response object containing status code, success status, message, and user data
   */
  async verifyToken(token) {
    try {
      const decodedToken = verifyAccessToken(token);
      if (decodedToken?.success) {
        const userId = decodedToken?.data?.useId;
        if (userId && userId.length > 0) {
          const user = await prisma.user.findUnique({
            where: { id: userId },
          });

          if (!user) {
            return {
              statusCode: TOKEN_INVALID_CODE,
              success: false,
              message: TOKEN_INVALID,
            };
          }

          return {
            data: user,
            statusCode: 200,
            success: true,
            message: TOKEN_SUCCESS,
          };
        }
      } else {
        return {
          statusCode: TOKEN_INVALID_CODE,
          success: false,
          message: TOKEN_INVALID,
        };
      }
    } catch (error) {
      console.error("Error verifying token:", error);
      return {
        statusCode: TOKEN_INVALID_CODE,
        success: false,
        message: error?.message,
      };
    }
  },

  /**
   * Refresh a JWT token
   * @param {string} refreshToken - Refresh token to use for generating new access token
   * @returns {string} - New access token
   */
  async refreshTokens(refreshToken) {
    try {
      const decodedRefreshToken = verifyRefreshToken(refreshToken);

      if (!decodedRefreshToken) {
        throw new Error("Invalid refresh token");
      }

      console.log("decodedRefreshToken", decodedRefreshToken);

      const existingRefreshToken = await prisma.refreshToken.findFirst({
        where: { token: refreshToken, userId: decodedRefreshToken.userId },
      });

      if (!existingRefreshToken) {
        return {
          statusCode: REFRESH_TOKEN_INVALID_CODE,
          success: false,
          message: REFRESH_TOKEN_INVALID,
        };
      }

      const accessToken = generateAccessToken(existingRefreshToken.userId);

      return accessToken;
    } catch (error) {
      console.error("Error refreshing tokens:", error);
      throw new Error("Unable to refresh tokens");
    }
  },

  /**
   * Revoke a refresh token
   * @param {string} token - JWT token to use for revoking refresh token
   * @returns {object} - Response object containing status code, success status, and message
   */
  async revokeRefreshToken(token) {
    const response = verifyAccessToken(token);

    console.log("response :>> ", response);

    if (response.success) {
      await redisClient.del(response.data?.userId);
    }

    return {
      statusCode: 200,
      success: true,
      message: LOGOUT_SUCCESS,
    };
  },
};

export default authService;
