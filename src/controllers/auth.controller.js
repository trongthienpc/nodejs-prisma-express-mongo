import authService from "../services/auth.service.js";

export const register = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res
      .status(400)
      .json({ status: false, message: "Missing email address // or password" });

  try {
    const user = await authService.registerUser(email, password);
    return res.json(user);
  } catch (error) {
    console.error(error);
    return res.status(400).json({ error: error.message });
  }
};
