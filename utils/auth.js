// import jwt from "jsonwebtoken";

// const SECRET = process.env.SECRET_KEY_JWT;

// if (!SECRET) {
//   throw new Error("SECRET_KEY_JWT is not defined in environment variables.");
// }

// // Generate token
// export const generateToken = (user) => {
//   try {
//     return jwt.sign(
//       { email: user.email, userID: user._id.toString() }, // Ensure _id is a string
//       SECRET,
//       { expiresIn: "4d" }
//     );
//   } catch (error) {
//     console.error("Error generating token:", error);
//     return null;
//   }
// };

// // Verify token
// export const verifyToken = (token) => {
//   try {
//     return jwt.verify(token, SECRET);
//   } catch (error) {
//     if (error.name === "TokenExpiredError") {
//       console.error("Token has expired.");
//     } else if (error.name === "JsonWebTokenError") {
//       console.error("Invalid token.");
//     } else {
//       console.error("Token verification failed:", error);
//     }
//     return null;
//   }
// };

import { SignJWT, jwtVerify } from "jose";

const SECRET = process.env.SECRET_KEY_JWT;

if (!SECRET) {
  throw new Error("SECRET_KEY_JWT is not defined in environment variables.");
}

// Convert secret key to Uint8Array for jose
const secretKey = new TextEncoder().encode(SECRET);

// Generate token
export const generateToken = async (user) => {
  try {
    return await new SignJWT({ email: user.email, userID: user._id.toString() }) // Ensure _id is a string
      .setProtectedHeader({ alg: "HS256" })
      .setExpirationTime("4d")
      .sign(secretKey);
  } catch (error) {
    console.error("Error generating token:", error);
    return null;
  }
};

// Verify token
export const verifyToken = async (token) => {
  try {
    const { payload } = await jwtVerify(token, secretKey, {
      algorithms: ["HS256"],
    });
    console.log("token:", token);
    return payload;
  } catch (error) {
    if (error.name === "JWTExpired") {
      console.error("Token has expired.");
    } else {
      console.error("Token verification failed:", error);
    }
    return null;
  }
};
