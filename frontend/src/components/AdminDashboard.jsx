import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminDashboard = () => {
  const [records, setRecords] = useState([]);
  const [dateFilter, setDateFilter] = useState("");

  const fetchRecords = async () => {
    const res = await axios.get("http://localhost:5000/api/admin/dashboard", {
      params: dateFilter ? { date: dateFilter } : {},
    });
    setRecords(res.data);
  };

  useEffect(() => {
    fetchRecords();
  }, [dateFilter]);

  const exportCSV = () => {
    window.open("http://localhost:5000/api/attendance/export", "_blank");
  };

  return (
    <div className="scanner">
      <h2>📊 Admin Dashboard - Attendance Records</h2>

      <label>
        Filter by Date:
        <input
          type="date"
          value={dateFilter}
          onChange={(e) => setDateFilter(e.target.value)}
        />
      </label>

      <button onClick={exportCSV}>📤 Export CSV</button>

      <table>
        <thead>
          <tr>
            <th>QR Code</th>
            <th>Name</th>
            <th>Date</th>
            <th>Timestamp</th>
          </tr>
        </thead>
        <tbody>
          {records.map((r, i) => (
            <tr key={i}>
              <td>{r.qrCode}</td>
              <td>{r.dateOnly}</td>
              <td>{r.name}</td>
              <td>{new Date(r.timestamp).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminDashboard;