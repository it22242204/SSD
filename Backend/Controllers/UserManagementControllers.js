const User = require("../Model/UserManagementModel");
const bcrypt = require("bcrypt");
const sanitize = require("mongo-sanitize");

// Get all users (no user input used here)
const getAllUser = async (req, res, next) => {
  try {
    const users = await User.find().select("-password");
    return res.status(200).json({ status: "ok", users });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ status: "error", message: "Server error" });
  }
};

// Create a new user — validate & sanitize inputs
const createUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body || {};

    // Validation
    if (!name || typeof name !== "string" || name.trim().length < 1) {
      return res.status(400).json({ error: "Invalid name" });
    }
    if (!email || typeof email !== "string" || !/^\S+@\S+\.\S+$/.test(email)) {
      return res.status(400).json({ error: "Invalid email" });
    }
    if (!password || typeof password !== "string" || password.length < 6) {
      return res.status(400).json({ error: "Invalid password (min 6 chars)" });
    }

    // Sanitize
    const safeEmail = sanitize(email);
    const safeName = sanitize(name);
    const safePassword = sanitize(password);

    // Check existing user (explicit field)
    const existing = await User.findOne({ email: safeEmail });
    if (existing) {
      return res.status(409).json({ error: "User already exists" });
    }

    const hashed = await bcrypt.hash(safePassword, 10);
    const newUser = new User({
      name: safeName,
      email: safeEmail,
      password: hashed,
    });
    await newUser.save();

    return res.status(201).json({ status: "ok", userId: newUser._id });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ status: "error", message: "Server error" });
  }
};

// Get user by ID — sanitize params
const getUserById = async (req, res, next) => {
  try {
    const id = sanitize(req.params.id);
    if (!id) return res.status(400).json({ error: "Invalid id" });

    const user = await User.findById(id).select("-password");
    if (!user) return res.status(404).json({ error: "User not found" });

    return res.status(200).json({ status: "ok", user });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ status: "error", message: "Server error" });
  }
};

// Update user details — validate & sanitize each updatable field
const updateUser = async (req, res, next) => {
  try {
    const id = sanitize(req.params.id);
    if (!id) return res.status(400).json({ error: "Invalid id" });

    const { name, email, password } = req.body || {};
    const updates = {};

    if (name !== undefined) {
      if (typeof name !== "string" || name.trim().length < 1) {
        return res.status(400).json({ error: "Invalid name" });
      }
      updates.name = sanitize(name);
    }

    if (email !== undefined) {
      if (typeof email !== "string" || !/^\S+@\S+\.\S+$/.test(email)) {
        return res.status(400).json({ error: "Invalid email" });
      }
      updates.email = sanitize(email);

      // Ensure unique email (explicit query, sanitize)
      const existing = await User.findOne({ email: updates.email, _id: { $ne: id } });
      if (existing) {
        return res.status(409).json({ error: "Email already in use" });
      }
    }

    if (password !== undefined) {
      if (typeof password !== "string" || password.length < 6) {
        return res.status(400).json({ error: "Invalid password (min 6 chars)" });
      }
      const safePassword = sanitize(password);
      updates.password = await bcrypt.hash(safePassword, 10);
    }

    if (Object.keys(updates).length === 0) {
      return res.status(400).json({ error: "No valid fields to update" });
    }

    // Note: Add auth check in routes/middleware to ensure only owner/admin can update
    const updated = await User.findByIdAndUpdate(id, updates, { new: true }).select("-password");
    if (!updated) return res.status(404).json({ error: "User not found" });

    return res.status(200).json({ status: "ok", user: updated });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ status: "error", message: "Server error" });
  }
};

// Delete user — sanitize id param and perform explicit delete
const deleteUser = async (req, res, next) => {
  try {
    const id = sanitize(req.params.id);
    if (!id) return res.status(400).json({ error: "Invalid id" });

    // Note: Add authorization checks in middleware (admin or owner)
    const deleted = await User.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ error: "User not found" });

    return res.status(200).json({ status: "ok", message: "User deleted" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ status: "error", message: "Server error" });
  }
};

module.exports = {
  getAllUser,
  createUser,
  getUserById,
  updateUser,
  deleteUser,
};
