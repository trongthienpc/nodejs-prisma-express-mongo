import jwt from "jsonwebtoken";

export const generateAccessToken = (userId) => {
  const token = jwt.sign({ userId }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: process.env.ACCESS_TOKEN_EXPIRATION_TIME,
  });
  return token;
};

export const generateRefreshToken = (userId) => {
  const refreshToken = jwt.sign({ userId }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: process.env.REFRESH_TOKEN_EXPIRATION_TIME,
  });
  return refreshToken;
};

export const verifyAccessToken = (token) => {
  try {
    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    return decodedToken;
  } catch (error) {
    console.error(err);
    return null;
  }
};

export const verifyRefreshToken = (token) => {
  try {
    // Decode the token using the refresh token secret
    const decodedToken = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);

    // Return the decoded token
    return decodedToken;
  } catch (error) {
    // If there was an error decoding the token, log the error to the console and return null
    // console.error(error);
    return null;
  }
};

export const checkAuthenticated = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1]; // Extract token from Authorization header
  if (!token)
    return res
      .status(401)
      .json({ success: false, message: "Access token not found" });

  try {
    const accessToken = token.split(" ")[1];
    jwt.verify(
      accessToken,
      process.env.ACCESS_TOKEN_SECRET,
      function (err, decoded) {
        if (err) {
          console.log("err.message", err.message);
          return res.status(501).json({ success: false, message: err.message });
        } else {
          req.userId = decoded.userId;
          next();
        }
      }
    );
  } catch (e) {
    console.log(error);
    return res.status(403).json({ success: false, message: "Invalid token" });
  }
};
