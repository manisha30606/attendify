import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../App.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AdminLogin() {
  const [admLoginInfo, setAdmLoginInfo] = useState({
    admEmail: "",
    admPassword: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAdmLoginInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const { admEmail, admPassword } = admLoginInfo;

    // Basic validation
    if (!admEmail || !admPassword) {
      toast.error("All fields are required.");
      return;
    }

    try {
      const url = "http://localhost:8000/auth/login/admin"; // Make sure this URL is correct
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ admEmail, admPassword }),
      });

      const result = await response.json();

      if (!response.ok) {
        // Display error returned from backend
        const errorMessage = result.error || result.message || "Login failed.";
        toast.error(errorMessage);
        return;
      }

      const { message, token } = result;

      toast.success(message);
      localStorage.setItem("token", token); // Save token for authenticated routes
      navigate("/AdminDash"); // Redirect on successful login
    } catch (err) {
      toast.error("An unexpected error occurred.");
    }
  };

  return (
    <div className="bg-[#FABC3F] flex items-center justify-center min-h-screen bg-gradient-to-b from-white-300 to-green-500">
      <ToastContainer />
      <div
        className="bg-white p-8 rounded-lg shadow-[0_4px_30px_rgba(236,72,153,0.8)] max-w-md w-full 
                     transform transition duration-500 
                     hover:shadow-[0_4px_30px_rgba(236,72,153,0.8)]"
      >
        <h2 className="text-2xl text-center font-bold text-black mb-6">
          Admin Login
        </h2>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="admEmail"
              value={admLoginInfo.admEmail}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
              required
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="admPassword"
              value={admLoginInfo.admPassword}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
              required
            />
          </div>
          <div className="flex justify-between">
            <button
              type="submit"
              className="bg-white text-black py-2 px-6 rounded-lg shadow-lg hover:bg-[#821131] hover:text-white hover:shadow-xl transition duration-200 flex items-center"
            >
              Login Now <span className="ml-2">→</span>
            </button>

            <Link
              to="/AdminSignup"
              className="bg-white text-black py-2 px-6 rounded-lg shadow-lg hover:bg-[#821131] hover:text-white hover:shadow-xl transition duration-200 flex items-center"
            >
              Sign Up Now <span className="ml-2">→</span>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AdminLogin;
