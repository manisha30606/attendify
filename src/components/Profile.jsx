import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaPencilAlt } from "react-icons/fa";
import img from "../assets/h-3.avif";
import bgImage from "../assets/h-5.avif";
import { Link, useNavigate } from "react-router-dom";

const Profile = () => {
  const [profileImage, setProfileImage] = useState(img);
  const [backgroundImage, setBackgroundImage] = useState(bgImage);
  const [profile, setProfile] = useState({
    name: "",
    username: "",
    email: "",
    mobile: "",
    gender: "",
  });

  const navigate = useNavigate(); // Added useNavigate

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("No token found in localStorage");
      return;
    }

    const fetchProfile = async () => {
      try {
        const response = await axios.get("http://localhost:8080/auth/empdata", {
          headers: { Authorization: `Bearer ${token}` }, // Fixed template literal
        });
        const data = response.data;
        setProfile({
          name: data.empName,
          username: data.empId || "",
          email: data.empEmail || "",
          mobile: data.empPhone || "",
          gender: data.empGender || "",
        });
      } catch (error) {
        if (error.response && error.response.status === 401) {
          console.error("Unauthorized: Invalid token");
          navigate("/login"); // Redirect on invalid token
        } else {
          console.error("Error fetching user data:", error);
        }
      }
    };

    fetchProfile();
  }, [navigate]); // Add navigate as a dependency

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center">
      {/* Profile Section */}
      <div
        className="w-full h-64 bg-cover bg-center relative"
        style={{ backgroundImage: `url(${backgroundImage})` }} // Fixed background URL syntax
      >
        <label className="absolute top-4 right-4 bg-gray-800 text-cyan-600 p-2 rounded-full cursor-pointer">
          <FaPencilAlt />
          <input type="file" accept="image/*" className="hidden" />
        </label>
      </div>

      <div className="w-full sm:max-w-4xl max-w-full bg-white shadow-md rounded-lg sm:p-6 p-4 -top-10">
        <div className="flex items-center sm:space-x-8 space-x-4 justify-start">
          <div className="relative">
            <img
              src={profileImage}
              alt="Profile"
              className="w-24 h-24 rounded-full object-cover cursor-pointer"
            />
            <label className="absolute bottom-1 right-1 bg-gray-800 text-[#30cba2] p-1 rounded-full cursor-pointer">
              <FaPencilAlt />
              <input type="file" accept="image/*" className="hidden" />
            </label>
          </div>

          <div className="flex-1 sm:pl-8 pl-4">
            <h2 className="sm:text-2xl text-[#279DBA] text-lg font-bold">
              {profile.name}
            </h2>
            <p className="text-gray-600 text-sm">
              <span className="font-semibold">ID:</span> {profile.username}
            </p>
            <p className="text-gray-500 text-sm">
              <span className="font-semibold">Phone:</span> {profile.mobile}
            </p>
            <p className="text-gray-500 text-sm">
              <span className="font-semibold">Email:</span> {profile.email}
            </p>
            <p className="text-gray-500 text-sm">
              <span className="font-semibold">Gender:</span> {profile.gender}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
