import React, { useState } from "react";
import axios from "axios";

const CreateAttendee = () => {
  const [qrCode, setQrCode] = useState("");
  const [message, setMessage] = useState("");

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/attendance", { qrCode });
      setMessage("✅ Attendance created for: " + qrCode);
      setQrCode("");
    } catch (err) {
      setMessage("❌ Error: " + (err.response?.data?.message || "Something went wrong"));
    }
  };

  return (
    <div className="scanner">
      <h2>📥 Create Attendance Entry</h2>
      <form onSubmit={handleCreate}>
        <input
          type="text"
          placeholder="Enter QR code (e.g., ATTEND-301)"
          value={qrCode}
          onChange={(e) => setQrCode(e.target.value)}
          required
        />
        <button type="submit">Create</button>
      </form>
      <p>{message}</p>
    </div>
  );
};

export default CreateAttendee;
