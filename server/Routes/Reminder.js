const express = require("express");
const router = express.Router();
const Reminder = require("../Models/Reminder");
const { userAuth } = require("../middleware/Auth");

// Create reminder
router.post("/", userAuth, async (req, res) => {
  const reminder = new Reminder({ ...req.body, user: req.user.id });
  await reminder.save();
  res.json(reminder);
});

// Get all reminders for user
router.get("/", userAuth, async (req, res) => {
  const reminders = await Reminder.find({ user: req.user.id }).populate("medication");
  res.json(reminders);
});

module.exports = router;
