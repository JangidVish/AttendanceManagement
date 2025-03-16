import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const COLORS = ["#4CAF50", "#F44336"]; // Green for Present, Red for Absent

const AttendanceChart = ({ userId }) => {
  const [attendanceData, setAttendanceData] = useState([]);

  useEffect(() => {
    const fetchAttendance = async () => {
      const response = await axios.get(
        `http://localhost:5000/api/attendance/${userId}`
      );
      setAttendanceData(response.data);
    };
    fetchAttendance();
  }, [userId]);

  // Group data by subject and count Present/Absent occurrences
  const processData = () => {
    const subjectWiseData = {};
    let totalPresent = 0,
      totalAbsent = 0;

    attendanceData.forEach(({ subject, status }) => {
      if (!subjectWiseData[subject]) {
        subjectWiseData[subject] = { Present: 0, Absent: 0 };
      }
      subjectWiseData[subject][status]++;
    });

    // Prepare data for chart rendering
    const chartData = Object.entries(subjectWiseData).map(
      ([subject, counts]) => {
        totalPresent += counts.Present || 0;
        totalAbsent += counts.Absent || 0;
        return {
          subject,
          data: [
            { name: "Present", value: counts.Present || 0 },
            { name: "Absent", value: counts.Absent || 0 },
          ],
        };
      }
    );

    // Overall Attendance Data
    const overallData = [
      { name: "Present", value: totalPresent },
      { name: "Absent", value: totalAbsent },
    ];

    return { chartData, overallData };
  };

  const { chartData, overallData } = processData();

  return (
    <div className="attendance-container bg-white p-6 rounded shadow-md">
      <h2 className="attendance-title text-lg font-bold mb-4">
        Attendance Summary
      </h2>
      <div className="subject-container">
        {chartData.map(({ subject, data }) => (
          <div key={subject} className="chart-wrapper mb-6">
            <h3 className="subject-title text-md font-semibold mb-2">
              {subject}
            </h3>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  label
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {data.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        ))}
      </div>

      {/* Overall Attendance Pie Chart */}
      <div className="overall-attendance">
        <h3 className="overall-title text-lg font-bold mt-6">
          Overall Attendance
        </h3>
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie
              data={overallData}
              cx="50%"
              cy="50%"
              label
              outerRadius={80}
              fill="#82ca9d"
              dataKey="value"
            >
              {overallData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default AttendanceChart;
