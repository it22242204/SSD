const User = require("../Model/UserManagementModel");
const jwt = require("jsonwebtoken");
const sanitize = require("mongo-sanitize");

// NOTE: Using the project's JWT secret usage as-is (no secret-management changes here)
// If your project uses env variables, you can adjust this file accordingly.
const JWT_SECRET = "sdfgadgnjdfvd225()55757hbbhg77ffrtgfrtrftrftrft745{}[[]99b";

// Get Profile — verifies token and sanitizes decoded fields
const getProfile = async (req, res, next) => {
  try {
    // Prefer Authorization header: "Bearer <token>"
    const authHeader = req.headers.authorization || "";
    const tokenFromHeader = authHeader.startsWith("Bearer ") ? authHeader.split(" ")[1] : null;
    const token = tokenFromHeader || req.body.token;

    if (!token) {
      return res.status(401).json({ status: "error", message: "Token required" });
    }

    // Verify token (uses existing project secret)
    const decoded = jwt.verify(token, JWT_SECRET);
    const userId = sanitize(decoded.userId);
    if (!userId) {
      return res.status(400).json({ status: "error", message: "Invalid token payload" });
    }

    // Query with explicit field and sanitized id
    const user = await User.findById(userId).select("-password");
    if (!user) {
      return res.status(404).json({ status: "error", message: "User not found" });
    }

    return res.status(200).json({ status: "ok", user });
  } catch (err) {
    console.error(err);
    if (err.name === "TokenExpiredError" || err.name === "JsonWebTokenError") {
      return res.status(401).json({ status: "error", message: "Invalid token" });
    }
    return res.status(500).json({ status: "error", message: "Server error" });
  }
};

exports.getProfile = getProfile;
