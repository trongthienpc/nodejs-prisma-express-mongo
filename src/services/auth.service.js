import prisma from "../lib/prisma.js";
import bcrypt from "bcryptjs";
import {
  EMAIL_EXIST,
  EMAIL_NOT_FOUND,
  LOGIN_INVALID,
  LOGIN_SUCCESS,
  PASSWORD_INCORRECT,
  TOKEN_INVALID,
} from "../utils/constants.js";

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
      include: { user: true },
    });

    if (!user) {
      return {
        statusCode: 401,
        status: false,
        message: LOGIN_INVALID,
      };
    }

    // Check if the password is correct
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return {
        statusCode: 401,
        status: false,
        message: LOGIN_INVALID,
      };
    }

    // Generate a JWT token
    const token = jwt.sign(
      {
        userId: user.user.id,
        email: user.email,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    return {
      statusCode: 200,
      status: success,
      message: LOGIN_SUCCESS,
      data: token,
    };
  },

  async verifyToken(token) {
    try {
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
      const userId = decodedToken.userId;
      const user = await prisma.user.findUnique({
        where: { id: userId },
      });

      if (!user) {
        throw new Error(TOKEN_INVALID);
      }

      return user;
    } catch (error) {
      throw new Error(TOKEN_INVALID);
    }
  },
};

export default authService;
