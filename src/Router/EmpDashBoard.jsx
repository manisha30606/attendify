import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Attendance from "../components/Attendance";
import Leave from "../components/Leave";
import MakeAttendance from "../components/MakeAttendance";
import Profile from "../components/Profile";
import { LuUser, LuUsers, LuMessageSquare } from "react-icons/lu";
import { FaSuitcase } from "react-icons/fa";
import { FiMenu, FiX } from "react-icons/fi";
import { RiLogoutCircleRLine } from "react-icons/ri";
import { handleError, handleSuccess } from "../utils";
import { ToastContainer } from "react-toastify";

const Dashboard = () => {
  const [activeComponent, setActiveComponent] = useState("attendance");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const [loggedInUser, setLoggedInUser] = useState("");

  useEffect(() => {
    const empName = localStorage.getItem("empName");
    setLoggedInUser(empName || "Guest"); // Fallback to "Guest" if empName is null
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("empName");
    handleSuccess("User Logged Out");
    setTimeout(() => {
      navigate("/home");
    }, 1000);
  };

  const renderComponent = () => {
    switch (activeComponent) {
      case "attendance":
        return <Attendance />;
      case "leave":
        return <Leave />;
      case "make-attendance":
        return <MakeAttendance />;
      case "profile":
        return <Profile />;
      default:
        return <Attendance />;
    }
  };

  return (
    <section>
      <div className="flex flex-col md:flex-row mb-2.5rem text-gray-50">
        {/* Toggle Button for Mobile View */}
        <button
          className="md:hidden fixed top-3 left-3 z-50 bg-[#15156a] text-white p-2 rounded"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-expanded={isMenuOpen ? "true" : "false"}
          aria-controls="sidebar"
        >
          {isMenuOpen ? <FiX size={20} /> : <FiMenu size={20} />}
        </button>

        {/* Sidebar */}
        <aside
          id="sidebar"
          className={`fixed left-0 top-0 h-screen border-r pt-10 px-4 bg-[#071952] transition-transform duration-300 ${
            isMenuOpen ? "translate-x-0" : "-translate-x-full"
          } md:translate-x-0`}
        >
          {/* Logo Section */}
          <div className="mb-4">
            <h1 className="text-white text-center text-md mb-2">
              Welcome, {loggedInUser}
            </h1>
            <h1 className="text-cyan-600 cursor-pointer font-bold text-center text-lg md:text-xl lg:text-2xl">
              ATTENDIFY
            </h1>
          </div>

          {/* Navigation Links */}
          <ul className="space-y-7 text-white ml-6">
            <li
              onClick={() => setActiveComponent("profile")}
              className="cursor-pointer flex items-center space-x-2"
            >
              <LuUser /> <span>Profile</span>
            </li>
            <li
              onClick={() => setActiveComponent("attendance")}
              className="cursor-pointer flex items-center space-x-2"
            >
              <LuMessageSquare /> <span>Attendance</span>
            </li>
            <li
              onClick={() => setActiveComponent("make-attendance")}
              className="cursor-pointer flex items-center space-x-2"
            >
              <FaSuitcase /> <span>Make Attendance</span>
            </li>
            <li
              onClick={() => setActiveComponent("leave")}
              className="cursor-pointer flex items-center space-x-2"
            >
              <LuUsers /> <span>Leave</span>
            </li>
          </ul>

          {/* Logout Section */}
          <div
            className="w-full absolute bottom-5 left-0 px-4 py-2 cursor-pointer text-center"
            onClick={handleLogout}
          >
            <p className="flex items-center space-x-2 text-xs text-white py-2 px-5 bg-gradient-to-r from-indigo-500 to-violet-600 rounded-full">
              <RiLogoutCircleRLine className="w-4 h-4" />
              <span>Log Out</span>
            </p>
          </div>
        </aside>

        {/* Main Content */}
        <main className="w-full md:ml-56 p-4 bg-slate-800 min-h-screen flex flex-col">
          {renderComponent()}
        </main>
      </div>
      <ToastContainer />
    </section>
  );
};

export default Dashboard;
