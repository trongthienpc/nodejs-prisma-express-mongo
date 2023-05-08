// Import necessary modules
// This block of code seems to be okay and has no known issues - no changes needed
import authService from "../services/auth.service.js"; // import the authentication service module
import {
  BAD_REQUEST,
  LOGOUT_SUCCESS,
  REFRESH_TOKEN_INVALID,
  REFRESH_TOKEN_SUCCESS,
  TOKEN_INVALID,
  UNAUTHORIZED,
} from "../utils/constants.js";
import { LOGIN_INVALID } from "../utils/constants.js";
import { generateResponseObject } from "../utils/patterns/response-pattern.js";

// Defines a function to register a user
export const register = async (req, res) => {
  const { email, password } = req.body; // extract email and password from the request body

  // Validate required parameters: if no email or password, send back a 400 status code with an error message
  if (!email || !password) {
    return res
      .status(BAD_REQUEST)
      .json(generateResponseObject(false, "Missing email address or password"));
  }

  try {
    const response = await authService.registerUser({ email, password }); // register the user by calling the authentication service

    // Respond with the status code, message, and any data retrieved from the API
    return res
      .status(response.statusCode)
      .json(
        generateResponseObject(
          response.success,
          response.message,
          response?.data
        )
      ); // return a response object with specified data
  } catch (error) {
    console.error(error); // log any errors
    return res
      .status(BAD_REQUEST)
      .json(generateResponseObject(false, error.message)); // send back a 400 status code with an error message
  }
};

// Defines a function to log in a user
export const login = async (req, res) => {
  const { email, password } = req.body; // extract email and password from the request body

  // Validate required parameters: if no email or password, send back a 400 status code with an error message
  if (!email || !password) {
    return res
      .status(BAD_REQUEST)
      .json(generateResponseObject(false, "Missing email address or password"));
  }

  try {
    const response = await authService.loginUser({ email, password }); // log the user in by calling the authentication service

    // Respond with the status code, message, and any data retrieved from the API
    return res
      .status(response.statusCode)
      .json(
        generateResponseObject(
          response.success,
          response.message,
          response?.data
        )
      ); // return a response object with specified data
  } catch (err) {
    console.error(err); // log any errors
    return res
      .status(BAD_REQUEST)
      .json(generateResponseObject(false, err.message)); // send back a 400 status code with an error message
  }
};

// Defines a function to refresh a user's access token
export const refresh = async (req, res, next) => {
  try {
    const { refreshToken } = req.body;
    const token = authService.refreshTokens(refreshToken);
    res
      .status(200)
      .json(generateResponseObject(true, REFRESH_TOKEN_SUCCESS, token)); // return a response object with success message and new token
  } catch (error) {
    next(error); // pass the error to the next middleware
  }
};

// Defines a function for logging out a user
export const logout = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1]; // extract token from Authorization header
    const { userId } = req.body;
    console.log(" token", token);

    // Check if the token is present and valid: if an invalid token is provided, send back a 401 status code with an error message
    if (
      !token ||
      token == "invalid_token" ||
      typeof token !== "string" ||
      !authService.verifyToken(token)
    ) {
      return res
        .status(UNAUTHORIZED)
        .json(generateResponseObject(false, TOKEN_INVALID));
    }

    // Call authService to revoke refresh token
    await authService.revokeRefreshToken(token); // revoke the refresh token by calling the authentication service

    // Send response indicating successful logout, return a response object with success message
    return res.status(200).json(generateResponseObject(true, LOGOUT_SUCCESS));
  } catch (error) {
    console.log("Error :>> ", error); // log any errors
    next(error); // pass the error to the next middleware
  }
};
