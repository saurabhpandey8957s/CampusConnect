import React from "react";
import Login from "./components/Login";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import mystore from "./redux/store";
import StudentHome from "./Screens/Student/Home";
import FacultyHome from "./Screens/Faculty/Home";
import AdminHome from "./Screens/Admin/Home";
import FacultyAttendance from "./Screens/Faculty/FacultyAttendance";
import StudentAttendance from "./Screens/Student/StudentAttendance";

const App = () => {
  return (
    <>
      <Provider store={mystore}>
        <Router>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="student" element={<StudentHome />} />
            <Route path="faculty" element={<FacultyHome />} />
            <Route path="admin" element={<AdminHome />} />
            <Route path="/faculty/attendance" element={<FacultyAttendance />} />
            <Route path="/student/attendance" element={<StudentAttendance />} />
          </Routes>
        </Router>
      </Provider>
    </>
  );
};

export default App;
