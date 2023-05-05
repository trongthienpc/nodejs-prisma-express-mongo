import prisma from "../lib/prisma.js";
import bcrypt from "bcryptjs";
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

import { createClient } from "redis";
const redisClient = createClient({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
});

redisClient.on("error", (err) => console.log("Redis Client Error", err));
redisClient.on("connect", () => {
  console.log("Connected to Redis...");
});
redisClient.connect();
const authService = {
  async registerUser({ email, password }) {
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
  },

  async loginUser({ email, password }) {
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
  },

  async verifyToken(token) {
    try {
      const decodedToken = verifyAccessToken(token);
      const userId = decodedToken.userId;
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
    } catch (error) {
      return {
        statusCode: TOKEN_INVALID_CODE,
        success: false,
        message: error?.message,
      };
    }
  },

  async refreshTokens(refreshToken) {
    console.log("refreshToken :>> ", refreshToken);
    let decodedRefreshToken;
    try {
      decodedRefreshToken = verifyRefreshToken(refreshToken);
    } catch (error) {
      throw new Error("Invalid refresh token");
    }

    let existingRefreshToken = null;
    if (
      decodedRefreshToken != null &&
      decodedRefreshToken != "TokenExpiredError"
    ) {
      existingRefreshToken = await prisma.refreshToken.findFirst({
        where: { token: refreshToken, userId: decodedRefreshToken.userId },
      });
    }

    if (!existingRefreshToken || existingRefreshToken == null) {
      return {
        statusCode: REFRESH_TOKEN_INVALID_CODE,
        success: false,
        message: REFRESH_TOKEN_INVALID,
      };
    }

    const accessToken = generateAccessToken(existingRefreshToken.userId);

    return accessToken;
  },

  async revokeRefreshToken(userId) {
    await redisClient.del(userId);

    return {
      statusCode: 200,
      success: true,
      message: LOGOUT_SUCCESS,
    };
  },
};

export default authService;
