const mongoose = require("mongoose");

const AttendanceSchema = new mongoose.Schema({
  qrCode: { type: String, required: true },
  name: { type: String, required: true }, // e.g. "John Doe"
  timestamp: { type: Date, default: Date.now },
  dateOnly: { type: String, required: true }, // e.g. "2025-07-03"
});

module.exports = mongoose.model("Attandance", AttendanceSchema);
