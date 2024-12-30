import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import Active from "../components/Active";
import Record from "../components/Record";
import Request from "../components/Request";


import { LuUser, LuUsers, LuMessageSquare } from "react-icons/lu";
import { FaSuitcase } from "react-icons/fa";
import { FiMenu, FiX } from "react-icons/fi";
import { RiLogoutCircleRLine } from "react-icons/ri";

const AdminDash = () => {
  const [activeComponent, setActiveComponent] = useState("attendance");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    
    navigate("/"); 
  };

  const renderComponent = () => {
    switch (activeComponent) {
      case "attendanceRecord":
        return <Record />;
      case "leaveRequest":
        return <Request />;
      case "attendanceTab":
        return <Active />;
      default:
        return <Record />;
    }
  };

  return (
    <section>
 
    <div className="flex flex-col md:flex-row mb:2.5rem text-gray-50">
      {/* Toggle Button for Mobile View */}
      <button
        className="md:hidden fixed top-3 left-3 z-50 bg-[#15156a] text-white p-2 rounded"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        {isMenuOpen ? <FiX size={20} /> : <FiMenu size={20} />}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 h-screen border-r pt-10 px-4 bg-[#f07b36] transition-transform duration-300 ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        {/* Logo Section */}
        <div className="mb-4">
          <h1 className="text-[#821131] cursor-pointer font-bold text-center text-lg md:text-xl lg:text-2xl">
            ATTENDIFY
          </h1>
        </div>

        {/* Navigation Links */}
        <ul className="space-y-7 text-white ml-6">
          <li
            onClick={() => setActiveComponent("attendanceRecord")}
            className="cursor-pointer flex items-center space-x-2"
          >
            <LuMessageSquare /> <span>Attendance Record</span>
          </li>
          <li
            onClick={() => setActiveComponent("leaveRequest")}
            className="cursor-pointer flex items-center space-x-2"
          >
            <FaSuitcase /> <span>Leave Request</span>
          </li>
          <li
            onClick={() => setActiveComponent("attendanceTab")}
            className="cursor-pointer flex items-center space-x-2"
          >
            <LuUsers /> <span> Attendance </span>
          </li>
        </ul>

        {/* Logout Section */}
        <div
          className="w-full absolute bottom-5 left-0 px-4 py-2 cursor-pointer text-center"
          onClick={handleLogout}
        >
          <p className="flex items-center space-x-2 text-xs text-white py-2 px-5 bg-[#821131] rounded-full">
            <RiLogoutCircleRLine className="w-4 h-4" />
            <span className="md:flex">Log Out</span>
          </p>
        </div>
      </aside>

      {/* Main Content */}
      <main className="w-full md:ml-56 p-4 bg-[#fff4dd] min-h-screen flex flex-col">
        {renderComponent()}
      </main>
    </div>
  </section>
  );
}

export default AdminDash;