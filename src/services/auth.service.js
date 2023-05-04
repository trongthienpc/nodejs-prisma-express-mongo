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
} from "../utils/constants.js";
import {
  generateAccessToken,
  generateRefreshToken,
  verifyAccessToken,
  verifyRefreshToken,
} from "./jwt.service.js";
import { LOGIN_INVALID } from "../utils/constants.js";
import { LOGIN_SUCCESS } from "../utils/constants.js";

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

    if (!user) {
      return {
        statusCode: LOGIN_INVALID_CODE,
        success: false,
        message: LOGIN_INVALID,
      };
    }

    // Check if the password is correct
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return {
        statusCode: LOGIN_INVALID_CODE,
        success: false,
        message: LOGIN_INVALID,
      };
    }

    // Generate a JWT token
    const accessToken = generateAccessToken(user.id);

    let refreshToken = null;
    const existingRefreshToken = await prisma.refreshToken.findFirst({
      where: { userId: user.id },
    });

    if (existingRefreshToken) {
      refreshToken = existingRefreshToken.token;
      const decodedRefreshToken = verifyRefreshToken(refreshToken);
      if (decodedRefreshToken !== null)
        if (Date.now() >= decodedRefreshToken.exp * 1000)
          refreshToken = generateAccessToken(user.id);
    } else {
      // Generate a new refresh token if one doesn't exist
      refreshToken = generateRefreshToken(user.id);

      await prisma.refreshToken.create({
        data: {
          token: refreshToken,
          userId: user.id,
        },
      });
    }

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

    console.log("decodedRefreshToken :>> ", decodedRefreshToken);

    const existingRefreshToken = await prisma.refreshToken.findFirst({
      where: { token: refreshToken, userId: decodedRefreshToken.userId },
    });

    console.log("existingRefreshToken :>> ", existingRefreshToken);

    if (!existingRefreshToken) {
      return {
        statusCode: REFRESH_TOKEN_INVALID_CODE,
        success: false,
        message: REFRESH_TOKEN_INVALID,
      };
    }

    const accessToken = generateAccessToken(existingRefreshToken.userId);

    return accessToken;
  },

  async revokeRefreshToken(refreshToken) {
    const deletedToken = await prisma.refreshToken.delete({
      where: { token: refreshToken },
    });

    return !!deletedToken;
  },
};

export default authService;
