import { cookies } from "next/headers";
import { verifyToken } from "./auth";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

// Function to get user from JWT or NextAuth
async function getUser() {
  try {
    // 1. Try getting the user from NextAuth session
    const session = await getServerSession(authOptions);
    console.log("Session:", session);
    if (session?.user?.id) {
      console.log("User ID from session:", session.user.id);
      return session.user.id;
    }
    // 2. Try getting the user from JWT cookie
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;
    console.log("Token from cookie:", token);
    if (token) {
      try {
        const decoded = verifyToken(token);
        console.log("Decoded token:", decoded);
        return decoded.userID; // Ensure JWT contains userID
      } catch (error) {
        console.error("JWT verification failed", error);
      }
    }
  } catch (error) {
    console.error("Error in getUser:", error);
  }

  return null;
}

export { getUser };
