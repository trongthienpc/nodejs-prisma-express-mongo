// Login
export const LOGIN_SUCCESS = "Login succeeded";
export const LOGIN_INVALID = "Invalid email or password";
export const LOGIN_INVALID_CODE = 401;

// Register
export const REGISTER_SUCCESS = "Register succeeded";
export const REGISTER_DUPLICATE_EMAIL = "Email has already been taken";
export const REGISTER_INVALID_CODE = 400;

// Logout
export const LOGOUT_SUCCESS = "Logout succeeded";
export const LOGOUT_FAIL = "Logout failed";
export const LOGOUT_INVALID_CODE = 400;

// Refresh token
export const REFRESH_TOKEN_INVALID = "Invalid refresh token";
export const REFRESH_TOKEN_SUCCESS = "Refresh token succeeded";
export const REFRESH_TOKEN_INVALID_CODE = 400;

// token
export const TOKEN_INVALID = "Invalid token";
export const TOKEN_SUCCESS = "Token succeeded";
export const TOKEN_INVALID_CODE = 400;

// BRANCH CONSTANTS
export const CREATE_BRANCH_SUCCESS = "Branch created successfully";
export const CREATE_BRANCH_FAILURE = "Failed to create branch";

export const GET_ALL_BRANCHES_SUCCESS = "Fetched all branches successfully";
export const GET_ALL_BRANCHES_FAILURE = "Failed to fetch branches";

export const GET_BRANCH_SUCCESS = "Fetched branch successfully";
export const GET_BRANCH_FAILURE = "Failed to fetch branch";

export const UPDATE_BRANCH_SUCCESS = "Branch updated successfully";
export const UPDATE_BRANCH_FAILURE = "Failed to update branch";

export const DELETE_BRANCH_SUCCESS = "Branch deleted successfully";
export const DELETE_BRANCH_FAILURE = "Failed to delete branch";
export const OK = 200;
export const CREATED = 201;
export const NO_CONTENT = 204;
export const BAD_REQUEST = 400;
export const UNAUTHORIZED = 401;
export const FORBIDDEN = 403;
export const NOT_FOUND = 404;
export const CONFLICT = 409;
export const SERVER_ERROR = 500;
