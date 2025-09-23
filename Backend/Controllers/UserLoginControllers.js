const User = require("../Model/UserManagementModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const sanitize = require("mongo-sanitize");
const JWT_SECRET = "sdfgadgnjdfvd225()55757hbbhg77ffrtgfrtrftrftrft745{}[[]99b";

// Login Function — with input validation & NoSQL injection defenses
const loginUser = async (req, res, next) => {
  try {
    // Extract and validate inputs explicitly (do not trust full req.body)
    const { email, password } = req.body || {};

    // Basic validation
    if (!email || typeof email !== "string" || !/^\S+@\S+\.\S+$/.test(email)) {
      return res.status(400).json({ error: "Invalid email" });
    }
    if (!password || typeof password !== "string" || password.length < 6) {
      return res.status(400).json({ error: "Invalid password" });
    }
    // Sanitize input values to remove mongo operators like $gt / $ne etc.
    const safeEmail = sanitize(email);
    const safePassword = sanitize(password);
    // Use explicit fields in queries (never pass req.body directly)
    const user = await User.findOne({ email: safeEmail });
    if (!user) {
      return res.status(401).json({ error: "User not found" });
    }

    const isPasswordValid = await bcrypt.compare(safePassword, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid credentials" });
    }
    // Generate token using existing JWT secret
    const token = jwt.sign({ userId: user._id }, JWT_SECRET, {
      expiresIn: "5h",
    });

    res.json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

exports.loginUser = loginUser;
