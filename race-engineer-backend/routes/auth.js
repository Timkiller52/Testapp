const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();

// Environment Variables
const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";

// Login Route
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    // Admin hardcoded credentials check
    if (username === "Admin" && password === "Strat2024") {
      return res.json({ token: "admin-token", username: "Admin" });
    }

    // Look for the user in the database
    const user = await User.findOne({ username });
    if (!user) return res.status(404).json({ message: "User not found" });

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    // Generate a JWT token
    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "1h" });

    res.json({ token, username: user.username });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ error: error.message });
  }
});

// Register Route
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  console.log("Login request received:", { username, password }); // Debugging log

  try {
    if (username === "Admin" && password === "Strat2024") {
      console.log("Admin logged in successfully!"); // Debugging log
      return res.json({ token: "admin-token", username: "Admin" });
    }

    const user = await User.findOne({ username });
    if (!user) {
      console.log("User not found:", username); // Debugging log
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log("Invalid password for user:", username); // Debugging log
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
    console.log("User logged in successfully:", username); // Debugging log
    return res.json({ token, username: user.username });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});



module.exports = router;
