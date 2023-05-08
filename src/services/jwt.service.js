import jwt from "jsonwebtoken";
import { generateResponseObject } from "../utils/patterns/response-pattern.js";
import {
  FORBIDDEN,
  REFRESH_TOKEN_INVALID,
  REFRESH_TOKEN_SUCCESS,
  TOKEN_INVALID,
  TOKEN_SUCCESS,
  UNAUTHORIZED,
} from "../utils/constants.js";

/**
 * Generates an access token for a given user ID
 * @param {string} userId - The user ID to generate the token for
 * @returns {string} - The generated access token
 */
export const generateAccessToken = (userId) => {
  const token = jwt.sign({ userId }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: process.env.ACCESS_TOKEN_EXPIRATION_TIME,
  });
  return token;
};

/**
 * Generates a refresh token for a given user ID
 * @param {string} userId - The user ID to generate the token for
 * @returns {string} - The generated refresh token
 */
export const generateRefreshToken = (userId) => {
  const refreshToken = jwt.sign({ userId }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: process.env.REFRESH_TOKEN_EXPIRATION_TIME,
  });
  return refreshToken;
};

/**
 * Verifies an access token and returns a response object indicating success or failure
 * @param {string} token - The access token to verify
 * @returns {object} - The response object indicating success or failure
 */
export const verifyAccessToken = (token) => {
  try {
    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    return generateResponseObject(true, TOKEN_SUCCESS, decodedToken);
  } catch (error) {
    // console.error(error);
    return generateResponseObject(false, TOKEN_INVALID, error.name);
  }
};

/**
 * Verifies a refresh token and returns a response object indicating success or failure
 * @param {string} token - The refresh token to verify
 * @returns {object} - The response object indicating success or failure
 */
export const verifyRefreshToken = (token) => {
  try {
    const decodedToken = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
    return generateResponseObject(true, REFRESH_TOKEN_SUCCESS, decodedToken);
  } catch (error) {
    console.error(error);
    return generateResponseObject(false, REFRESH_TOKEN_INVALID, error.name);
  }
};

/**
 * Middleware function to check if a request is authenticated
 * @param {object} req - The request object
 * @param {object} res - The response object
 * @param {function} next - The next middleware function
 * @returns {object} - The response object indicating success or failure
 */
export const checkAuthenticated = (req, res, next) => {
  const accessToken = req.headers.authorization?.split(" ")[1]; // Extract token from Authorization header
  if (!accessToken)
    return res
      .status(UNAUTHORIZED)
      .json({ success: false, message: "Access token not found" });

  try {
    jwt.verify(
      accessToken,
      process.env.ACCESS_TOKEN_SECRET,
      function (err, decoded) {
        if (err) {
          console.log("err.message", err);
          return res.status(501).json({ success: false, message: err.message });
        } else {
          req.userId = decoded.userId;
          next();
        }
      }
    );
  } catch (e) {
    console.log(e);
    return res.status(FORBIDDEN).json({ success: false, message: e?.message });
  }
};
