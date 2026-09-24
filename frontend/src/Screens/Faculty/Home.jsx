import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { motion } from "framer-motion";
import {
  Sun,
  Moon,
  LayoutDashboard,
  User,
  Users,
  FileBarChart,
  Calendar,
  Bell,
  Book,
  ClipboardCheck,
  LogOut
} from "lucide-react";

import Notice from "../../components/Notice";
import Profile from "./Profile";
import Timetable from "./Timetable";
import Material from "./Material";
import Marks from "./Marks";
import Student from "./Student";
import MarkAttendance from "./MarkAttendance";

const Home = () => {
  const router = useLocation();
  const navigate = useNavigate();
  const [selectedMenu, setSelectedMenu] = useState("My Profile");
  const [load, setLoad] = useState(false);
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    if (router.state === null) {
      navigate("/");
    }
    setLoad(true);
  }, [navigate, router.state]);

  const handleLogout = () => {
    navigate("/");
  };

  const toggleTheme = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle("dark");
  };

  const menuItems = [
    { name: "My Profile", icon: <User size={18} /> },
    { name: "Student Info", icon: <Users size={18} /> },
    { name: "Upload Marks", icon: <FileBarChart size={18} /> },
    { name: "Timetable", icon: <Calendar size={18} /> },
    { name: "Notice", icon: <Bell size={18} /> },
    { name: "Material", icon: <Book size={18} /> },
    { name: "Mark Attendance", icon: <ClipboardCheck size={18} /> },
  ];

  return (
    <section
      className={`flex h-screen font-sans transition-all duration-300 ${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-800"
      }`}
    >
      {load && (
        <>
          {/* Sidebar */}
          <motion.aside
            initial={{ x: -250 }}
            animate={{ x: 0 }}
            transition={{ duration: 0.4 }}
            className={`w-1/4 h-full ${
              darkMode ? "bg-gray-800" : "bg-blue-900"
            } text-white p-6 shadow-lg flex flex-col`}
          >
            <h2 className="text-3xl font-bold mb-10 text-center border-b border-blue-300 pb-4 flex justify-center items-center gap-2">
              <LayoutDashboard size={26} />
              Faculty Panel
            </h2>

            <nav className="flex flex-col gap-3">
              {menuItems.map((item) => (
                <button
                  key={item.name}
                  className={`flex items-center gap-3 py-3 px-4 rounded-md transition-all ${
                    selectedMenu === item.name
                      ? "bg-blue-700 font-semibold"
                      : "hover:bg-blue-800"
                  }`}
                  onClick={() =>
                    item.name === "Mark Attendance"
                      ? navigate("/faculty/attendance")
                      : setSelectedMenu(item.name)
                  }
                >
                  {item.icon}
                  {item.name}
                </button>
              ))}
            </nav>
          </motion.aside>

          {/* Main Content */}
          <main className="flex-1 px-10 py-6 overflow-y-auto">
            {/* Topbar */}
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-3xl font-semibold">{selectedMenu}</h1>

              <div className="flex gap-4 items-center">
                <button
                  onClick={toggleTheme}
                  className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition"
                >
                  {darkMode ? <Sun size={20} /> : <Moon size={20} />}
                </button>

                <button
                  className="flex gap-2 items-center bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition"
                  onClick={handleLogout}
                >
                  <LogOut size={18} />
                  Logout
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="w-full max-w-6xl mx-auto">
              {selectedMenu === "Timetable" && <Timetable />}
              {selectedMenu === "Upload Marks" && <Marks />}
              {selectedMenu === "Material" && <Material />}
              {selectedMenu === "Notice" && <Notice />}
              {selectedMenu === "My Profile" && <Profile />}
              {selectedMenu === "Student Info" && <Student />}
              {selectedMenu === "Mark Attendance" && <MarkAttendance />}
            </div>
          </main>
        </>
      )}
      <Toaster position="bottom-center" />
    </section>
  );
};

export default Home;
