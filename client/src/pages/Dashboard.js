import React from "react";
import { useEffect, useState } from "react";
import AttendanceForm from "../components/AttendanceForm";
import AttendanceList from "../components/AttendanceList";

const Dashboard = () => {
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
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <AttendanceForm userId={userId} />
      <AttendanceList userId={userId} />
    </div>
  );
};

export default Dashboard;
