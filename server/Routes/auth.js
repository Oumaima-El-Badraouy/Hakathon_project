const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = express.Router();
const User = require("../Models/users");

// Register
router.post("/register", async (req, res) => {
  const { name, email, password, fullNumber } = req.body;
  const exist = await User.findOne({ email });
  if (exist) return res.status(400).json({ msg: "User already exists" });

  const hash = await bcrypt.hash(password, 10);
  const newUser = new User({ name, email, password: hash, fullNumber });
  await newUser.save();

  const token = jwt.sign({ user: { id: newUser._id } }, "secret123", { expiresIn: "7d" });
  res.json({ token });
});

// Login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ msg: "Invalid credentials" });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

  const token = jwt.sign({ user: { id: user._id } }, "secret123", { expiresIn: "7d" });
  res.json({ token });
});

module.exports = router;
