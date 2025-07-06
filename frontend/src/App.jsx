import React from "react";
import Scanner from "./components/Scanner";
import CreateAttendee from "./components/CreateAttendance";
import AdminLogin from "./components/AdminLogin";
import "./style.css";

const App = () => (
  <div className="app">
    <Scanner />
    <hr />
    <CreateAttendee />
    <hr />
    <AdminLogin />
  </div>
);

export default App;
