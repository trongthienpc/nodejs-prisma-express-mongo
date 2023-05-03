import authService from "../services/auth.service.js";

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

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const response = await authService.loginUser({ email, password });
    return res.status(response.statusCode).json({
      success: response.status,
      message: response.message,
      token: response?.data,
    });
  } catch (err) {
    console.error(err);
    return res.status(400).json({ error: err.message });
  }
};
