import prisma from "../lib/prisma.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import {
  EMAIL_EXIST,
  EMAIL_NOT_FOUND,
  LOGIN_ERROR_CODE,
  LOGIN_INVALID,
  LOGIN_INVALID_CODE,
  LOGIN_SUCCESS,
  PASSWORD_INCORRECT,
  TOKEN_INVALID,
  TOKEN_VALID,
} from "../utils/constants.js";
import {
  generateAccessToken,
  generateRefreshToken,
  verifyAccessToken,
  verifyRefreshToken,
} from "./jwt.service.js";

const authService = {
  async registerUser({ email, password }) {
    const userExist = await prisma.account.findUnique({
      where: { email: email },
    });

    if (userExist) {
      return {
        statusCode: 400,
        success: false,
        message: EMAIL_EXIST,
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
      message: `User created successfully`,
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

    // generate a refresh token
    const refreshToken = generateRefreshToken(user.id);

    await prisma.refreshToken.create({
      data: {
        token: refreshToken,
        userId: user.id,
        // account: { connect: { id: user.id } },
      },
    });

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
          statusCode: 401,
          success: false,
          message: TOKEN_INVALID,
        };
      }

      return {
        data: user,
        statusCode: 200,
        success: true,
        message: TOKEN_VALID,
      };
    } catch (error) {
      return {
        statusCode: 401,
        success: false,
        message: error?.message,
      };
    }
  },

  async refreshTokens({ refreshToken }) {
    let decodedRefreshToken;
    try {
      decodedRefreshToken = verifyRefreshToken(refreshToken);
    } catch (error) {
      throw new Error("Invalid refresh token");
    }

    const existingRefreshToken = await prisma.refreshToken.findFirst({
      where: { token: refreshToken },
      select: {
        account: { select: { id: true } },
      },
    });

    if (!existingRefreshToken) {
      return {
        statusCode: 401,
        success: false,
        message: TOKEN_INVALID,
      };
    }

    const accessToken = generateAccessToken(existingRefreshToken.userId);

    return { accessToken };
  },

  async revokeRefreshToken({ refreshToken }) {
    const deletedToken = await prisma.refreshToken.delete({
      where: { token: refreshToken },
    });

    return !!deletedToken;
  },
};

export default authService;
