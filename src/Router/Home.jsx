import { IoPerson, IoPersonCircleSharp } from "react-icons/io5";
import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="flex flex-col sm:flex-row justify-center items-center h-screen bg-[#f1f1f1] space-y-4 sm:space-y-0 sm:space-x-4 ml-4 mr-4">
      {/* Admin Section */}
      <div className="bg-[#FABC3F] text-white p-8 rounded shadow-lg max-w-lg w-full h-64 transform hover:scale-105 transition-transform duration-300 mr-4">
        <h2 className="text-2xl font-bold mb-6 text-center">Admin</h2>
        <div className="flex justify-center gap-4">
          <Link to="/AdminLogin">
            <IoPersonCircleSharp className="cursor-pointer text-6xl border-4 border-white p-1 rounded-full" />
          </Link>
        </div>
      </div>

      {/* Employee Section */}
      <div className="bg-[#4864c1] text-white p-8 rounded shadow-lg max-w-lg w-full h-64 transform hover:scale-105 transition-transform duration-300 ml-4">
        <h2 className="text-2xl font-bold mb-6 text-center">Employee</h2>
        <div className="flex justify-center gap-4">
          <Link to="/EmpLogin">
            <IoPerson className="cursor-pointer text-6xl border-4 border-white p-1 rounded-full" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;