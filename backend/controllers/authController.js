import jwt from "jsonwebtoken";
import User from "../models/User.js";

// Simple admin login
export const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check hardcoded admin first (for quick setup)
    if (
      username === process.env.ADMIN_USERNAME &&
      password === process.env.ADMIN_PASSWORD
    ) {
      const token = jwt.sign(
        { id: "admin-static", username, role: "admin" },
        process.env.JWT_SECRET,
        { expiresIn: "30d" },
      );
      return res.json({ token, user: { username, role: "admin" } });
    }

    // Or check DB user
    const user = await User.findOne({ username });
    if (user && (await user.matchPassword(password))) {
      const token = jwt.sign(
        { id: user._id, username: user.username, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: "30d" },
      );
      return res.json({
        token,
        user: { username: user.username, role: user.role },
      });
    }

    res.status(401).json({ message: "Invalid credentials" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getMe = async (req, res) => {
  try {
    // If using hardcoded admin
    if (req.user.id === "admin-static") {
      return res.json({ username: req.user.username, role: "admin" });
    }
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
