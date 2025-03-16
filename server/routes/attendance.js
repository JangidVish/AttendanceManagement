const express = require("express");
const Attendance = require("../models/Attendance");

const router = express.Router();

// Add Attendance
router.post("/", async (req, res) => {
  const { userId, subject, status } = req.body;
  const attendance = new Attendance({ userId, subject, status });
  await attendance.save();
  res.status(201).json({ message: "Attendance recorded" });
});

// Get Attendance
router.get("/:userId", async (req, res) => {
  const attendance = await Attendance.find({ userId: req.params.userId });
  res.json(attendance);
});

module.exports = router;
