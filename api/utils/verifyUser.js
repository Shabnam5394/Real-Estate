export const verifyUser = (req) => {
    const token = req.cookies?.access_token; // Get token from cookies
    const SECRET_KEY = process.env.JWT_SECRET; // Load secret key from .env
  
    if (!token) {
      return { success: false, status: 401, message: "Unauthorized" };
    }
  
    // Directly compare token with stored key
    if (token !== SECRET_KEY) {
      return { success: false, status: 403, message: "Forbidden" };
    }
  
    return { success: true, user: { id: "static-user-id" } }; // Replace with actual user data if needed
  };
  