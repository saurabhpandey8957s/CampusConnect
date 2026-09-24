import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FiLogIn, FiUser, FiLock } from "react-icons/fi";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { baseApiURL } from "../baseUrl";
import { motion } from "framer-motion";

const Login = () => {
  const navigate = useNavigate();
  const [selected, setSelected] = useState("Student");
  const { register, handleSubmit } = useForm();
  const [isDarkMode, setIsDarkMode] = useState(false);

  const onSubmit = (data) => {
    if (data.loginid && data.password) {
      axios
        .post(`${baseApiURL()}/${selected.toLowerCase()}/auth/login`, data)
        .then((response) => {
          navigate(`/${selected.toLowerCase()}`, {
            state: { type: selected, loginid: response.data.loginid },
          });
        })
        .catch((error) => {
          toast.dismiss();
          toast.error(error.response.data.message);
        });
    }
  };

  return (
    <div
      className={`min-h-screen flex items-center justify-center px-4 transition duration-300 ease-in-out ${
        isDarkMode
          ? "bg-gradient-to-br from-gray-800 via-gray-900 to-black text-white"
          : "bg-gradient-to-br from-blue-100 via-white to-purple-100 text-gray-800"
      } relative`}
    >
      {/* ✅ Floating Dark Mode Toggle Button */}
      <button
        onClick={() => setIsDarkMode(!isDarkMode)}
        className="fixed top-4 right-4 z-50 px-4 py-1.5 rounded-full text-sm font-medium 
                   shadow-md border border-white/20 
                   bg-white/30 dark:bg-black/30 
                   backdrop-blur hover:bg-white/50 hover:dark:bg-black/50 
                   transition-all duration-300"
      >
        {isDarkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
      </button>

      {/* Background animation */}
      <div className="absolute inset-0 overflow-hidden z-0">
        <div className="absolute w-96 h-96 bg-purple-300 opacity-30 rounded-full -top-10 -left-20 animate-pulse"></div>
        <div className="absolute w-80 h-80 bg-blue-300 opacity-20 rounded-full bottom-0 right-0 animate-ping"></div>
      </div>

      <Toaster position="bottom-center" />

      <div className="w-full max-w-6xl flex flex-col md:flex-row bg-white/30 dark:bg-white/10 backdrop-blur-lg shadow-2xl rounded-3xl overflow-hidden border border-gray-200 z-10">
        {/* Left Image */}
        <div className="hidden md:block md:w-1/2">
          <img
            src="/UIT.jpg"
            alt="Campus"
            className="object-cover h-full w-full"
          />
        </div>

        {/* Right Form */}
        <div className="w-full md:w-1/2 p-10 sm:p-12 flex flex-col justify-center">
          {/* Animated Branding */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="flex flex-col items-center text-center mb-6"
          >
            <div className="flex items-center gap-3">
              <img
                src="/united_logo.png"
                alt="Logo"
                className="w-10 h-10 rounded-full shadow-md"
              />
              <h2 className="text-lg sm:text-xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 uppercase tracking-wide drop-shadow">
                United College of Engineering & Research
              </h2>
            </div>
            <p className="text-sm text-gray-600 italic mt-1">
              Empowering Future Engineers
            </p>
          </motion.div>

          {/* Role Switcher */}
          <div className="flex bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden mb-6 w-fit shadow-inner border">
            {["Student", "Faculty", "Admin"].map((role) => (
              <button
                key={role}
                className={`px-6 py-2 text-sm font-medium transition-all ${
                  selected === role
                    ? "bg-blue-600 text-white"
                    : "text-gray-600 dark:text-gray-300 hover:bg-blue-100 dark:hover:bg-gray-700"
                }`}
                onClick={() => setSelected(role)}
              >
                {role}
              </button>
            ))}
          </div>

          {/* Heading */}
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-6">
            {selected} Login
          </h2>

          {/* Login Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="relative">
              <FiUser className="absolute left-4 top-3 text-gray-400 text-xl" />
              <input
                type="number"
                {...register("loginid")}
                placeholder="Login ID"
                required
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-gray-700 dark:text-white dark:bg-transparent dark:border-gray-600"
              />
            </div>

            <div className="relative">
              <FiLock className="absolute left-4 top-3 text-gray-400 text-xl" />
              <input
                type="password"
                {...register("password")}
                placeholder="Password"
                required
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-gray-700 dark:text-white dark:bg-transparent dark:border-gray-600"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition duration-300 flex justify-center items-center shadow-md"
            >
              Login <FiLogIn className="ml-2 text-lg" />
            </button>
          </form>

          {/* Optional Footer */}
          <p className="text-xs text-gray-400 dark:text-gray-500 mt-6 text-center">
            © {new Date().getFullYear()} LiveCampus. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
