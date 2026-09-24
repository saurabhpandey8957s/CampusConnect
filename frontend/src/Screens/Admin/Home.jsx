import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast, Toaster } from "react-hot-toast";
import axios from "axios";
import Notice from "../../components/Notice";
import Student from "./Student";
import Faculty from "./Faculty";
import Subjects from "./Subject";
import { baseApiURL } from "../../baseUrl";
import Admin from "./Admin";
import Profile from "./Profile";
import Branch from "./Branch";
import { motion } from "framer-motion";
import {
  User,
  Users,
  ShieldCheck,
  Building,
  Bell,
  BookOpen,
  LayoutDashboard,
  Moon,
  Sun,
  Menu as MenuIcon,
} from "lucide-react";

const Home = () => {
  const router = useLocation();
  const navigate = useNavigate();
  const [load, setLoad] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState("Profile");
  const [darkMode, setDarkMode] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    if (router.state === null) {
      navigate("/");
    }
    setLoad(true);
  }, [navigate, router.state]);

  const handleLogout = () => {
    navigate("/");
    toast.success("Logged out successfully!");
  };

  const toggleTheme = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle("dark");
  };

  const menuItems = [
    { name: "Profile", icon: <User size={18} /> },
    { name: "Student", icon: <Users size={18} /> },
    { name: "Faculty", icon: <ShieldCheck size={18} /> },
    { name: "Branch", icon: <Building size={18} /> },
    { name: "Notice", icon: <Bell size={18} /> },
    { name: "Subjects", icon: <BookOpen size={18} /> },
    { name: "Admins", icon: <LayoutDashboard size={18} /> },
  ];

  return (
    <section
      className={`flex h-screen font-sans transition-all duration-300 ${
        darkMode ? "dark" : ""
      }`}
    >
      {load && (
        <>
          {/* Sidebar */}
          {sidebarOpen && (
            <aside className="w-64 h-full bg-blue-900 text-white p-6 shadow-lg flex flex-col md:relative fixed z-40">
              <h2 className="text-3xl font-extrabold mb-10 tracking-wide text-center border-b-2 pb-3">
                Admin Panel
              </h2>
              <nav className="flex flex-col gap-4">
                {menuItems.map((item) => (
                  <button
                    key={item.name}
                    className={`flex items-center gap-3 py-3 px-4 text-base font-medium rounded-lg transition-all ${
                      selectedMenu === item.name
                        ? "bg-blue-700 shadow"
                        : "hover:bg-blue-800"
                    }`}
                    onClick={() => setSelectedMenu(item.name)}
                  >
                    {item.icon}
                    {item.name}
                  </button>
                ))}
              </nav>
            </aside>
          )}

          {/* Main Content */}
          <div
            className={`flex-1 px-8 py-6 min-h-screen overflow-auto transition-all duration-300 ${
              darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"
            } ${sidebarOpen ? "pl-64" : "pl-0"}`}
          >
            {/* Top Bar */}
            <div className="flex justify-between items-center mb-6">
              <div className="flex gap-4">
                <button
                  onClick={() => setSidebarOpen(!sidebarOpen)}
                  className="bg-gray-300 dark:bg-gray-700 text-sm px-4 py-2 rounded-lg flex items-center gap-2"
                >
                  <MenuIcon size={18} />
                  {sidebarOpen ? "Hide Sidebar" : "Show Sidebar"}
                </button>
                <button
                  onClick={toggleTheme}
                  className="bg-gray-300 dark:bg-gray-700 text-sm px-4 py-2 rounded-lg flex items-center gap-2"
                >
                  {darkMode ? <Sun size={18} /> : <Moon size={18} />}
                  {darkMode ? "Light Mode" : "Dark Mode"}
                </button>
              </div>
              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg transition-all"
              >
                Logout
              </button>
            </div>

            {/* Breadcrumb */}
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
              Dashboard / {selectedMenu}
            </p>

            {/* Content Area */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="w-full"
            >
              <h2 className="text-3xl font-semibold mb-4">{selectedMenu}</h2>
              <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8 w-full">
                {selectedMenu === "Profile" && <Profile />}
                {selectedMenu === "Student" && <Student />}
                {selectedMenu === "Faculty" && <Faculty />}
                {selectedMenu === "Branch" && <Branch />}
                {selectedMenu === "Notice" && <Notice />}
                {selectedMenu === "Subjects" && <Subjects />}
                {selectedMenu === "Admins" && <Admin />}
              </div>
            </motion.div>
          </div>
        </>
      )}
      <Toaster position="bottom-center" />
    </section>
  );
};

export default Home;
