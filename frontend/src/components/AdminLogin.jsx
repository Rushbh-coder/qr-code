import React, { useState } from "react";
import axios from "axios";
import AdminDashboard from "./AdminDashboard";

const AdminLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [message, setMessage] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/admin/login", { username, password });
      setIsLoggedIn(true);
    } catch (err) {
      setMessage("❌ Invalid credentials");
    }
  };

  return isLoggedIn ? (
    <AdminDashboard />
  ) : (
    <div className="scanner">
      <h2>Admin Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
      <p>{message}</p>
    </div>
  );
};

export default AdminLogin;