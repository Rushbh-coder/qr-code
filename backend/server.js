const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const cors = require("cors");
const attendanceRoutes = require("./routes/attendance");
const adminRoutes = require("./routes/admin");

const app = express();
app.use(cors({
  origin: "http://localhost:5173",
  methods: ["GET", "POST"],
}));

app.use(express.json());

mongoose.connect(process.env.MONGO_URI).then(() => {
  console.log("Connected to MongoDB");
}).catch((err) => {
  console.log(err);
});

app.use("/api/attendance", attendanceRoutes);
app.use("/api/admin", adminRoutes);

app.listen(5000, () => console.log("Backend running on port 5000"));
