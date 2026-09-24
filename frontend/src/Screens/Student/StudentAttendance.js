// import React, { useState, useEffect } from "react";
// import axios from "axios";

// const StudentAttendance = () => {
//   const [attendance, setAttendance] = useState([]);

//   // useEffect(() => {
//   //   axios.get("/api/attendance/view") // Ensure this API exists
//   //     .then(res => setAttendance(res.data))
//   //     .catch(err => console.error(err));
//   // }, []);

//   useEffect(() => {
//     axios
//       .get("http://localhost:5001/api/attendance/view")
//       .then((res) => setAttendance(res.data))
//       .catch((err) => console.error(err));
//   }, []);
//   return (
//     <div>
//       <h1>Student Attendance</h1>
//       <table border="1">
//         <thead>
//           <tr>
//             <th>Date</th>
//             <th>Status</th>
//           </tr>
//         </thead>
//         <tbody>
//           {attendance.map((record) => (
//             <tr key={record._id}>
//               <td>{new Date(record.date).toLocaleDateString()}</td>
//               <td>{record.status}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default StudentAttendance;

import React, { useState, useEffect } from "react";
import axios from "axios";

const StudentAttendance = () => {
  const [attendance, setAttendance] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    axios
      .get("http://localhost:5001/api/attendance/view", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        setAttendance(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <div>
      <h1>Student Attendance</h1>

      <table border="1">
        <thead>
          <tr>
            <th>Date</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {attendance.map((record) => (
            <tr key={record._id}>
              <td>{new Date(record.date).toLocaleDateString()}</td>
              <td>{record.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentAttendance;
