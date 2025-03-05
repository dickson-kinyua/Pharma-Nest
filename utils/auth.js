import jwt from "jsonwebtoken";

const SECRET = process.env.SECRET_KEY_JWT;

if (!SECRET) {
  throw new Error("SECRET_KEY_JWT is not defined in environment variables.");
}

// Generate token
export const generateToken = (user) => {
  try {
    return jwt.sign(
      { email: user.email, userID: user._id.toString() }, // Ensure _id is a string
      SECRET,
      { expiresIn: "4d" }
    );
  } catch (error) {
    console.error("Error generating token:", error);
    return null;
  }
};

// Verify token
export const verifyToken = (token) => {
  try {
    return jwt.verify(token, SECRET);
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      console.error("Token has expired.");
    } else if (error.name === "JsonWebTokenError") {
      console.error("Invalid token.");
    } else {
      console.error("Token verification failed:", error);
    }
    return null;
  }
};
