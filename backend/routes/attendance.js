const express = require("express");
const router = express.Router();
const Attendance = require("../models/Attandance");
const json2csv = require("json2csv").parse;

const getDateOnly = () => new Date().toISOString().split("T")[0];

router.post("/", async (req, res) => {
  const { qrCode } = req.body;
  if (!qrCode) return res.status(400).json({ message: "QR code required" });
  const dateOnly = getDateOnly();

  try {
    const exists = await Attendance.findOne({ qrCode, dateOnly });
    if (exists) return res.status(400).json({ message: "Already marked for today" });
    const newRecord = new Attendance({ qrCode, dateOnly });
    await newRecord.save();
    res.json({ message: "Attendance marked" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/export", async (req, res) => {
  try {
    const records = await Attendance.find().sort({ timestamp: -1 });
    const csv = json2csv(records);
    res.header("Content-Type", "text/csv");
    res.attachment("attendance_export.csv").send(csv);
  } catch (err) {
    res.status(500).json({ message: "Export error" });
  }
});

module.exports = router;
