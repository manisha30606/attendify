import React, { useState } from "react";
import axios from "axios";

const Active = () => {
  const [isActive, setIsActive] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token"); // Retrieve token from local storage

  const toggleState = async () => {
    if (!token) {
      setErrorMessage("No token provided. Please log in first.");
      return;
    }

    const newState = !isActive;
    setIsActive(newState);
    setErrorMessage(null);
    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:8080/auth/updateStatus",
        {
          status: newState ? "ON" : "OFF",
          admId: "Admin80", // Replace with actual admin ID
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Fixed here
          },
        }
      );

      console.log("Status updated:", response.data.message);
    } catch (error) {
      setIsActive(!newState); // Revert state on failure
      setErrorMessage(error.response?.data?.message || "Error updating status.");
      console.error("Error updating status:", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="text-center">
        <h1 className="mb-4 text-2xl font-semibold">{isActive ? "On" : "Off"}</h1>
        <button
          onClick={toggleState}
          disabled={loading || !token}
          className={`px-10 py-5 rounded-full text-white font-bold transition-all duration-300 ${
            isActive ? "bg-green-500" : "bg-[#821131]"
          } ${loading && "opacity-50 cursor-not-allowed"}`}
        >
          {loading ? "Processing..." : isActive ? "Turn Off" : "Turn On"}
        </button>
        {errorMessage && <p className="mt-4 text-red-500">{errorMessage}</p>}
      </div>
    </div>
  );
};

export default Active;
