import authService from "../services/auth.service.js";
import {
  LOGIN_ERROR_CODE,
  LOGIN_INVALID,
  LOGIN_MISSING_CODE,
  LOGOUT_SUCCESS_CODE,
  TOKEN_REFRESH_MISSING,
  TOKEN_REFRESH_SUCCESS,
} from "../utils/constants.js";

export const register = async (req, res) => {
  const { email, password } = req.body;

  console.log("email, password :>> ", email, password);
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
  if (!email || !password)
    return res
      .status(LOGIN_MISSING_CODE)
      .json({ status: false, message: LOGIN_INVALID });
  try {
    const response = await authService.loginUser({ email, password });
    console.log("response :>> ", response);
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

export const refresh = async (req, res, next) => {
  try {
    const { refreshToken } = req.body;
    const { token } = await authService.refreshTokens(refreshToken);
    res
      .status(200)
      .json({ success: true, message: TOKEN_REFRESH_SUCCESS, data: token });
  } catch (error) {
    next(error);
  }
};

export const logout = async (req, res, next) => {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) {
      return res.status(400).json({ message: TOKEN_REFRESH_MISSING });
    }

    await authService.revokeRefreshToken(refreshToken);
    res.status(LOGOUT_SUCCESS_CODE).send();
  } catch (error) {
    next(error);
  }
};
