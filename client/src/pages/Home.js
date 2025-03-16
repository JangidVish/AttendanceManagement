import React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AttendanceList from "../components/AttendanceList";

const Home = () => {
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded = JSON.parse(atob(token.split(".")[1]));
      setUserId(decoded.id);
    }
  }, []);

  if (!userId) {
    return <div className="text-center">Loading...</div>;
  }

  return (
    <div className="dashboardContainer mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">
        {" "}
        Welcome to Attendance Management System
      </h1>
      <Link to="/dashboard">
        <h4>Click Here To Mark An Attendance</h4>
      </Link>
      {/* <AttendanceForm userId={userId} /> */}
      <AttendanceList userId={userId} />
    </div>
  );
};

export default Home;
