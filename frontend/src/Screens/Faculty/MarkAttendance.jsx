import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { baseApiURL } from "../../baseUrl";

const MarkAttendance = () => {
  const [students, setStudents] = useState([]);
  const [attendance, setAttendance] = useState({});

  useEffect(() => {
    // Fetch students from DB
    const fetchStudents = async () => {
      try {
        const response = await axios.get(`${baseApiURL()}/student/all`);
        if (response.data.success) {
          setStudents(response.data.students);
          const initialAttendance = {};
          response.data.students.forEach((student) => {
            initialAttendance[student._id] = "Present";
          });
          setAttendance(initialAttendance);
        } else {
          toast.error(response.data.message || "Failed to fetch students");
        }
      } catch (error) {
        toast.error("Server error while fetching students");
        console.error(error);
      }
    };

    fetchStudents();
  }, []);

  const handleAttendanceChange = (id, status) => {
    setAttendance((prev) => ({ ...prev, [id]: status }));
  };

  const handleSubmit = async () => {
    try {
      const payload = Object.entries(attendance).map(([studentId, status]) => ({
        studentId,
        status,
        date: new Date().toISOString().split("T")[0],
      }));

      // You can change this POST endpoint when your backend is ready
      const response = await axios.post(`${baseApiURL()}/attendance/mark`, payload);

      if (response.data.success) {
        toast.success("Attendance submitted successfully");
      } else {
        toast.error("Submission failed");
      }
    } catch (error) {
      toast.error("Error submitting attendance");
      console.error(error);
    }
  };

  return (
    <div className="bg-white p-8 rounded shadow-md">
      <h2 className="text-2xl font-semibold mb-6">Faculty Attendance</h2>

      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border border-gray-300">
          <thead>
            <tr className="bg-blue-100">
              <th className="p-3 border text-left">Student Name</th>
              <th className="p-3 border text-left">Attendance</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student._id} className="hover:bg-gray-50">
                <td className="p-3 border">
                  {student.firstName} {student.middleName} {student.lastName}
                </td>
                <td className="p-3 border">
                  <label className="mr-4">
                    <input
                      type="radio"
                      value="Present"
                      name={student._id}
                      checked={attendance[student._id] === "Present"}
                      onChange={() => handleAttendanceChange(student._id, "Present")}
                    />{" "}
                    Present
                  </label>
                  <label>
                    <input
                      type="radio"
                      value="Absent"
                      name={student._id}
                      checked={attendance[student._id] === "Absent"}
                      onChange={() => handleAttendanceChange(student._id, "Absent")}
                    />{" "}
                    Absent
                  </label>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <button
        onClick={handleSubmit}
        className="mt-6 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
      >
        Submit Attendance
      </button>
    </div>
  );
};

export default MarkAttendance;










