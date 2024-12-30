import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../App.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AdminSignup() {
  const [admSignupInfo, setadmSignUpInfo] = useState({
    admName: "",
    admEmail: "",
    admDepartment: "",
    admId: "",
    admPassword: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setadmSignUpInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    const { admName, admEmail, admDepartment, admId, admPassword } = admSignupInfo;

    // Frontend validation
    if (!admName || !admEmail || !admPassword || !admDepartment || !admId) {
      toast.error("All fields are required");
      return;
    }

    try {
      const url = "http://localhost:8000/auth/signup/admin";
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(admSignupInfo),

      });

      const result = await response.json();

      if (!response.ok) {
        // Handle backend error messages
        throw new Error(result.message || "Signup failed, please try again.");
      }

      // Successful response
      toast.success(result.message || "Signup successful!");
      navigate("/AdminLogin"); // Redirect to login page
    } catch (err) {
      console.error("Signup error:", err); // Log for debugging
      toast.error(err.message || "An unexpected error occurred");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#FABC3F]">
      <ToastContainer />
      <div
        className="bg-white p-8 rounded-lg shadow-[0_4px_30px_rgba(236,72,153,0.8)] max-w-md w-full 
                     transform transition duration-500 
                     hover:shadow-[0_4px_30px_rgba(236,72,153,0.8)]"
      >
        <h2 className="text-2xl font-bold text-[#000] text-center mb-6">
          Admin Sign Up
        </h2>
        <form onSubmit={handleSignup}>
          {/* Form Inputs */}
          {[
            { label: "Name of Admin", name: "admName", type: "text" },
            { label: "admEmail of Admin", name: "admEmail", type: "admEmail" },
            { label: "Department", name: "admDepartment", type: "text" },
            { label: "Admin ID", name: "admId", type: "text" },
            { label: "Password", name: "admPassword", type: "password" },
          ].map(({ label, name, type }) => (
            <div key={name} className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                {label}:
              </label>
              <input
                type={type}
                name={name}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
                onChange={handleChange}
                value={admSignupInfo[name]}
              />
            </div>
          ))}
          <div className="flex justify-between">
            <button
              type="submit"
              className="bg-white text-black py-2 px-6 rounded-lg shadow-lg hover:bg-[#821131] hover:text-white hover:shadow-xl transition duration-200"
            >
              Sign Up Now
            </button>

            <Link
              to="/AdminLogin"
              className="bg-white text-black py-2 px-6 rounded-lg shadow-lg hover:bg-[#821131] hover:text-white hover:shadow-xl transition duration-200"
            >
              Login Instead
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AdminSignup;
