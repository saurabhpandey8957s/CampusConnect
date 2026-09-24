import React, { useEffect, useState } from "react";
import Profile from "./Profile";
import Timetable from "./Timetable";
import Marks from "./Marks";
import Notice from "../../components/Notice";
import Material from "./Material";
import StudentAttendance from "./StudentAttendance";
import IssueForm from "../../components/IssueForm";
import { Toaster } from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import Chatbot from "../../components/Chatbot";
import { FaSignOutAlt } from "react-icons/fa";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { SunIcon, MoonIcon } from "@heroicons/react/24/outline";
import {
  UserCircleIcon,
  CalendarDaysIcon,
  DocumentTextIcon,
  BookmarkSquareIcon,
  MegaphoneIcon,
  ClipboardDocumentListIcon,
  ChatBubbleBottomCenterTextIcon,
} from "@heroicons/react/24/outline";

const Home = () => {
  const [selectedMenu, setSelectedMenu] = useState("My Profile");
  const router = useLocation();
  const navigate = useNavigate();
  const [load, setLoad] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (router.state === null) {
      navigate("/");
    }
    setLoad(true);
  }, [navigate, router.state]);

  const menuItems = [
    { label: "My Profile", icon: <UserCircleIcon className="w-5 h-5 mr-2" /> },
    { label: "Timetable", icon: <CalendarDaysIcon className="w-5 h-5 mr-2" /> },
    { label: "Marks", icon: <DocumentTextIcon className="w-5 h-5 mr-2" /> },
    {
      label: "Material",
      icon: <BookmarkSquareIcon className="w-5 h-5 mr-2" />,
    },
    { label: "Notice", icon: <MegaphoneIcon className="w-5 h-5 mr-2" /> },
    {
      label: "Attendance",
      icon: <ClipboardDocumentListIcon className="w-5 h-5 mr-2" />,
    },
    {
      label: "Issue",
      icon: <ChatBubbleBottomCenterTextIcon className="w-5 h-5 mr-2" />,
    },
  ];

  return (
    <section className={`${darkMode ? "dark" : ""} font-sans`}>
      {load && (
        <div className="flex h-screen">
          {/* Sidebar */}
          <aside className="w-64 bg-gradient-to-b from-indigo-800 to-indigo-700 text-white p-6 flex flex-col shadow-xl dark:from-gray-900 dark:to-gray-800">
            <h2 className="text-3xl font-extrabold mb-8 tracking-wide text-center">
              Dashboard
            </h2>
            <nav className="flex flex-col gap-3">
              {menuItems.map((item) => (
                <button
                  key={item.label}
                  className={`py-3 px-4 rounded-lg text-left font-medium flex items-center transition duration-300 ${
                    selectedMenu === item.label
                      ? "bg-indigo-600"
                      : "hover:bg-indigo-700"
                  }`}
                  onClick={() => setSelectedMenu(item.label)}
                >
                  {item.icon}
                  {item.label}
                </button>
              ))}
            </nav>
          </aside>

          {/* Main Content */}
          <div className="flex-1 bg-gradient-to-br from-indigo-100 to-blue-50 dark:from-gray-900 dark:to-gray-950 p-8 overflow-y-auto">
            {/* Top Bar */}
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
                {selectedMenu}
              </h1>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setDarkMode(!darkMode)}
                  className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100 shadow hover:scale-105 transition"
                >
                  {darkMode ? (
                    <SunIcon className="w-5 h-5" />
                  ) : (
                    <MoonIcon className="w-5 h-5" />
                  )}
                </button>
                <button
                  onClick={() => {
                    localStorage.removeItem("user");
                    navigate("/");
                  }}
                  className="flex items-center bg-red-500 text-white px-4 py-2 rounded-lg shadow hover:bg-red-600 transition"
                >
                  <FaSignOutAlt className="mr-2" /> Logout
                </button>
              </div>
            </div>

            {/* Glassmorphism Card */}
            <div className="bg-white dark:bg-white/10 dark:text-white backdrop-blur-md shadow-2xl rounded-xl p-6 min-h-[70vh]">
              {selectedMenu === "Timetable" && <Timetable />}
              {selectedMenu === "Marks" && <Marks />}
              {selectedMenu === "Material" && <Material />}
              {selectedMenu === "Notice" && <Notice />}
              {selectedMenu === "My Profile" && (
                <>
                  <Profile />

                  <div className="mt-6 flex items-center bg-blue-50 dark:bg-blue-900 p-4 rounded-lg border border-blue-200 dark:border-blue-700 shadow-md">
                    <AiOutlineCheckCircle className="text-blue-500 text-xl mr-3" />
                    <p className="text-gray-700 dark:text-gray-100 text-base font-medium">
                      "You're on track for a great semester! Keep going!" 🚀
                    </p>
                  </div>

                  <div className="mt-6">
                    <h2 className="text-xl font-bold mb-3">
                      Motivation & Vision
                    </h2>
                    <div className="overflow-x-auto">
                      <table className="min-w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg shadow-md">
                        <thead>
                          <tr className="bg-indigo-600 text-white">
                            <th className="px-4 py-3 text-left text-sm font-semibold">
                              Aspect
                            </th>
                            <th className="px-4 py-3 text-left text-sm font-semibold">
                              Details
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="bg-gray-100 dark:bg-gray-700">
                            <td className="px-4 py-3 font-medium">
                              Motivation
                            </td>
                            <td className="px-4 py-3">
                              <ul className="list-disc ml-6 space-y-1">
                                <li>Strive for excellence in academics.</li>
                                <li>
                                  Develop skills that enhance career growth.
                                </li>
                                <li>Become a proactive learner.</li>
                              </ul>
                            </td>
                          </tr>
                          <tr>
                            <td className="px-4 py-3 font-medium">Vision</td>
                            <td className="px-4 py-3">
                              <ul className="list-disc ml-6 space-y-1">
                                <li>
                                  To be a responsible and innovative
                                  contributor.
                                </li>
                                <li>
                                  To create impactful solutions for real-world
                                  problems.
                                </li>
                                <li>
                                  To continuously learn and improve every day.
                                </li>
                              </ul>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </>
              )}
              {selectedMenu === "Attendance" && <StudentAttendance />}
              {selectedMenu === "Issue" && <IssueForm />}
            </div>
          </div>
        </div>
      )}

      {/* Floating Chatbot */}
      <div className="fixed bottom-6 right-6 z-50">
        <Chatbot />
      </div>

      <Toaster position="bottom-center" />
    </section>
  );
};

export default Home;
