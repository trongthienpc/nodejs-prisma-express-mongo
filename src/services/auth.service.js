import prisma from "../lib/prisma.js";
import bcrypt from "bcryptjs";

const authService = {
  async registerUser({ email, password }) {
    const userExist = await prisma.account.findUnique({
      where: { email: "test@gmail.com" },
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
