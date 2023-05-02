import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

const authService = {
  async registerUser({ email, password }) {
    const userExist = await prisma.user.findUnique({
      where: { email },
    });

    if (userExist) {
      throw new Error("User with this email already exists");
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new user
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
      },
    });

    return user;
  },
};

export default authService;
