import React, { useState } from "react";
import axios from "axios";

const AttendanceForm = ({ userId }) => {
  const [subject, setSubject] = useState("Engineering Mathematics");
  const [status, setStatus] = useState("Present");

  const subjects = [
    "Engineering Mathematics",
    "Physics",
    "Chemistry",
    "BXE",
    "BEE",
    "Engineering Graphics",
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:5000/api/attendance", {
      userId,
      subject,
      status,
    });
    setSubject("Engineering Mathematics");
    setStatus("Present");
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md">
      <h2 className="text-lg font-bold mb-4">Record Attendance</h2>

      <select
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
        required
        className="border border-gray-300 p-2 rounded mb-4 w-full"
      >
        {subjects.map((subj, index) => (
          <option key={index} value={subj}>
            {subj}
          </option>
        ))}
      </select>

      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        className="border border-gray-300 p-2 rounded mb-4 w-full"
      >
        <option value="Present">Present</option>
        <option value="Absent">Absent</option>
      </select>

      <button type="submit" className="bg-blue-500 text-white p-2 rounded">
        Record Attendance
      </button>
    </form>
  );
};

export default AttendanceForm;
