import React, { useState } from "react";
import { FaPencilAlt } from "react-icons/fa";
import img from "../assets/h-3.avif";
import bgImage from "../assets/h-5.avif";

const Profile = () => {
  const [editMode, setEditMode] = useState(false);
  const [profileImage, setProfileImage] = useState(img);
  const [backgroundImage, setBackgroundImage] = useState(bgImage);
  const [profile, setProfile] = useState({
    firstName: "Umesh",
    lastName: "Kumar",
    username: "Ukumar112004",
    email: "rajumesh8969457701@gmail.com",
    mobile: "+91 9031541444",
    gender: "Male",
    dept: "CSE",
  });
  const [attendance, setAttendance] = useState({
    present: [1, 2, 3, 6, 7, 8, 11, 12, 15],
    absent: [4, 5, 9, 10],
  });
  const [leaves, setLeaves] = useState({
    EL: 5,
    CL: 2,
    ML: 3,
  });

  const [selectedYear, setSelectedYear] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");

  const toggleEditMode = () => {
    setEditMode(!editMode);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile((prevProfile) => ({ ...prevProfile, [name]: value }));
  };

  const handleImageUpload = (e, type) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        type === "profile"
          ? setProfileImage(reader.result)
          : setBackgroundImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleYearSelection = (e) => {
    setSelectedYear(e.target.value);
    setSelectedMonth(""); // Reset month selection
  };

  const handleMonthSelection = (e) => {
    setSelectedMonth(e.target.value);
  };

  // Generate years dynamically
  const years = Array.from({ length: 2024 - 2020 + 1 }, (_, i) => 2020 + i);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center">
      {/* Profile Section */}
      <div
        className="w-full h-64 bg-cover bg-center"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <label className="absolute top-4 right-4 bg-gray-800 text-cyan-600 p-2 rounded-full cursor-pointer">
          <FaPencilAlt />
          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleImageUpload(e, "background")}
            className="hidden"
          />
        </label>
      </div>

      <div className="w-full sm:max-w-4xl max-w-full bg-white shadow-md rounded-lg sm:p-6 p-2 -top-10">
        {!editMode ? (
          <div className="flex items-center space-x-4 justify-between">
            <img
              src={profileImage}
              alt="Profile"
              className="w-24 h-24 rounded-full object-cover"
            />
            <div>
              <h2 className="sm:text-2xl text-cyan-600 text-lg font-bold">
                {profile.firstName} {profile.lastName}
              </h2>
              <p className="text-gray-600">@{profile.username}</p>
              <p className="text-gray-500 mt-1">{profile.dept}</p>
            </div>
            <div className="ml-auto">
              <button
                onClick={toggleEditMode}
                className="bg-green-500 text-white sm:px-4 px-2 py-2 rounded hover:bg-green-600"
              >
                Edit Profile
              </button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center">
            <h2 className="text-2xl font-bold mb-4 text-black">Edit Profile</h2>
            <form className="w-full max-w-lg">
              <div className="mb-4 flex items-center space-x-4">
                <img
                  src={profileImage}
                  alt="Profile"
                  className="w-24 h-24 rounded-full object-cover"
                />
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageUpload(e, "profile")}
                  className="text-gray-700"
                />
              </div>
              <div className="mb-4">
                <label className="block text-black font-bold mb-2">
                  First Name
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={profile.firstName}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded text-black bg-white"
                />
              </div>
              <div className="mb-4">
                <label className="block text-black font-bold mb-2">
                  Last Name
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={profile.lastName}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded text-black bg-white"
                />
              </div>
              <div className="mb-4">
                <label className="block text-black font-bold mb-2">
                  Username
                </label>
                <input
                  type="text"
                  name="username"
                  value={profile.username}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded text-black bg-gray-200"
                />
              </div>
              <div className="mb-4">
                <label className="block text-black font-bold mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  value={profile.email}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded text-black bg-white"
                />
              </div>
              <div className="mb-4">
                <label className="block text-black font-bold mb-2">Mobile</label>
                <input
                  type="tel"
                  name="mobile"
                  value={profile.mobile}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded text-black bg-white"
                />
              </div>
              <div className="mb-4">
                <label className="block text-black font-bold mb-2">Gender</label>
                <select
                  name="gender"
                  value={profile.gender}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded text-black bg-white"
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="mb-4">
                <label className="block text-black font-bold mb-2">
                  Department
                </label>
                <select
                  name="dept"
                  value={profile.dept}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded text-black bg-white"
                >
                  <option value="CSE">Computer Science & Engineering</option>
                  <option value="ECE">
                    Electronics & Communication Engineering
                  </option>
                  <option value="MECH">Information Technology</option>
                  <option value="CIVIL">Civil Engineering</option>
                  <option value="OTHER">Other</option>
                </select>
              </div>

              <div className="flex flex-row justify-center items-end space-y-2 mt-4">
                <button
                  type="button"
                  onClick={toggleEditMode}
                  className="bg-green-500 text-white px-4 mr-6 py-2 rounded hover:bg-green-600"
                >
                  Save
                </button>
                <button
                  type="button"
                  onClick={toggleEditMode}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}
      </div>

       {/* Year and Month Selection */}
       <div className="w-full max-w-4xl text-cyan-600 shadow-md rounded-lg p-6 mt-6">
        <h2 className="text-xl font-bold">Year and Month Selection</h2>
        <div className="flex flex-col space-y-4 mt-4">
          <div>
            <label className="block font-bold mb-2">Select Year:</label>
            <select
              value={selectedYear}
              onChange={handleYearSelection}
              className="w-full px-3 py-2 border rounded bg-white text-black"
            >
              <option value="">-- Select Year --</option>
              {years.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>
          {selectedYear && (
            <div>
              <label className="block font-bold mb-2">Select Month:</label>
              <select
                value={selectedMonth}
                onChange={handleMonthSelection}
                className="w-full px-3 py-2 border rounded bg-white text-black"
              >
                <option value="">-- Select Month --</option>
                {[
                  "January",
                  "February",
                  "March",
                  "April",
                  "May",
                  "June",
                  "July",
                  "August",
                  "September",
                  "October",
                  "November",
                  "December",
                ].map((month) => (
                  <option key={month} value={month}>
                    {month}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>

        {selectedYear && selectedMonth && (
          <div className="flex my-4 lg:flex-row flex-col space-y-4 lg:space-y-0 lg:space-x-4">
            {/* Attendance Calendar */}
            <div className="lg:w-1/2 w-full bg-white shadow-md rounded-lg p-6">
              <h3 className="text-xl font-bold mb-4">
                Attendance for {selectedMonth}
              </h3>
              <div className="grid grid-cols-7 gap-2">
                {[...Array(31)].map((_, day) => {
                  const date = day + 1;
                  const isPresent = attendance.present.includes(date);
                  const isAbsent = attendance.absent.includes(date);
                  return (
                    <div
                      key={date}
                      className={`w-10 h-10 flex items-center justify-center rounded ${
                        isPresent
                          ? "bg-green-500 text-white"
                          : isAbsent
                          ? "bg-red-500 text-white"
                          : "bg-gray-300"
                      }`}
                    >
                      {date}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Leave Details */}
            <div className="lg:w-1/2 w-full bg-white shadow-md rounded-lg p-6">
              <h3 className="text-xl font-bold mb-4">Leave Details</h3>
              <div className="grid grid-cols-3 gap-4">
                {Object.entries(leaves).map(([key, value]) => (
                  <div
                    key={key}
                    className="flex flex-col items-center justify-center bg-cyan-100 shadow-lg rounded-lg p-4"
                  >
                    <h4 className="text-lg font-bold text-cyan-800">{key}</h4>
                    <p className="text-xl font-semibold text-cyan-600">{value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;