import React, { useState, useEffect } from "react";
import axios from "axios";

const FacultyAttendance = () => {
  const [students, setStudents] = useState([]);
  const [attendance, setAttendance] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Fetch students assigned to faculty
    axios.get("/api/students")
      .then(res => setStudents(res.data))
      .catch(err => console.error(err));
  }, []);

  const handleAttendanceChange = (studentId, status) => {
    setAttendance(prev => ({ ...prev, [studentId]: status }));
  };

  const submitAttendance = async () => {
    setLoading(true);
    try {
      await axios.post("/api/attendance/mark", { attendance });
      alert("Attendance marked successfully!");
    } catch (error) {
      console.error("Error marking attendance", error);
    }
    setLoading(false);
  };

  return (
    <div>
      <h1>Faculty Attendance</h1>
      <table border="1">
        <thead>
          <tr>
            <th>Student Name</th>
            <th>Attendance</th>
          </tr>
        </thead>
        <tbody>
          {students.map(student => (
            <tr key={student._id}>
              <td>{student.name}</td>
              <td>
                <select onChange={(e) => handleAttendanceChange(student._id, e.target.value)}>
                  <option value="">Select</option>
                  <option value="Present">Present</option>
                  <option value="Absent">Absent</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={submitAttendance} disabled={loading}>
        {loading ? "Submitting..." : "Submit Attendance"}
      </button>
    </div>
  );
};

export default FacultyAttendance;





/*import React, { useState, useEffect } from "react";
import axios from "axios";

const FacultyAttendance = () => {
  const [students, setStudents] = useState([]);
  const [attendance, setAttendance] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios.get("/api/students", {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => setStudents(res.data))
      .catch(err => console.error(err));
  }, []);

  const handleAttendanceChange = (studentId, status) => {
    setAttendance(prev => ({ ...prev, [studentId]: status }));
  };

  const submitAttendance = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const headers = { Authorization: `Bearer ${token}` };

      for (const studentId in attendance) {
        await axios.post(
          "/api/attendance/mark",
          { studentId, status: attendance[studentId] },
          { headers }
        );
      }

      alert("Attendance marked successfully!");
    } catch (error) {
      console.error("Error marking attendance", error);
      alert("Error marking attendance");
    }
    setLoading(false);
  };

  return (
    <div>
      <h1>Faculty Attendance</h1>
      <table border="1">
        <thead>
          <tr>
            <th>Student Name</th>
            <th>Attendance</th>
          </tr>
        </thead>
        <tbody>
          {students.map(student => (
            <tr key={student._id}>
              <td>{student.firstName} {student.lastName}</td>
              <td>
                <select onChange={(e) => handleAttendanceChange(student._id, e.target.value)}>
                  <option value="">Select</option>
                  <option value="Present">Present</option>
                  <option value="Absent">Absent</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={submitAttendance} disabled={loading}>
        {loading ? "Submitting..." : "Submit Attendance"}
      </button>
    </div>
  );
};

export default FacultyAttendance;*/

