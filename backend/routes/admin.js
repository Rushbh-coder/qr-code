const express = require("express");
const router = express.Router();
const Admin = require("../models/Admin");
const Attendance = require("../models/Attandance");

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const admin = await Admin.findOne({ username, password });
  if (!admin) return res.status(401).json({ message: "Invalid credentials" });
  res.json({ message: "Login successful" });
});

router.get("/dashboard", async (req, res) => {
  const { date } = req.query;
  const filter = date ? { dateOnly: date } : {};
  const records = await Attendance.find(filter).sort({ timestamp: -1 });
  res.json(records);
});

module.exports = router;