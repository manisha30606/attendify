import React, { useState } from 'react';
import Webcam from 'react-webcam';

const MakeAttendance = () => {
  const [showWebcam, setShowWebcam] = useState(false);
  const [showExitButton, setShowExitButton] = useState(false);
  const [location, setLocation] = useState(null);

  const videoConstraints = {
    width: 1280,
    height: 720,
    facingMode: "user", // Front-facing camera
  };

  const handleStart = () => {
    setShowWebcam(true); // Show the webcam
    setShowExitButton(false); // Hide the exit button (if previously shown)
    setLocation(null); // Reset location
  };

  const handleClick = () => {
    alert('Click button pressed!'); // Show alert message

    // Fetch live location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ latitude, longitude });
        },
        (error) => {
          console.error("Error fetching location:", error);
          alert("Unable to fetch location. Please enable location services.");
        }
      );
    } else {
      alert("Geolocation is not supported by your browser.");
    }

    setShowExitButton(true); // Show the Exit button
  };

  const handleExit = () => {
    setShowWebcam(false); // Turn off the webcam
    setShowExitButton(false); // Hide the Exit button
    setLocation(null); // Reset location
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center px-4 sm:px-6 lg:px-8">
      {/* Header Section */}
      <h1 className="font-bold text-[#15156a] text-2xl sm:text-4xl mt-8 sm:mt-10 text-center">
        Make Attendance
      </h1>
      <div className="text-[#15156a] my-6 text-sm sm:text-xl mx-auto w-full sm:w-[80%] flex flex-col sm:flex-row sm:justify-between items-center space-y-2 sm:space-y-0">
        <h3>Name - Umesh Kumar</h3>
        <h3>EmpId - ume002</h3>
      </div>

      {/* Webcam Section */}
      {showWebcam && (
        <div className="mt-6 sm:mt-10 w-full flex justify-center">
          <div className="relative border border-gray-300 rounded-lg overflow-hidden w-full max-w-xs sm:max-w-md">
            <Webcam
              audio={false}
              videoConstraints={videoConstraints}
              className="w-full h-auto"
            />
          </div>
        </div>
      )}

      {/* Location Section */}
      {location && (
        <div className="mt-6 text-[#15156a] text-sm sm:text-base text-center">
          <p><strong>Live Location:</strong></p>
          <p>Latitude: {location.latitude}</p>
          <p>Longitude: {location.longitude}</p>
        </div>
      )}

      {/* Buttons Section */}
      <div className="mt-8 sm:mt-10 flex flex-col items-center space-y-4">
        {!showExitButton && (
          <>
            <button
              onClick={handleStart}
              className="bg-[#15156a] text-white px-6 sm:px-8 py-3 rounded-lg hover:bg-cyan-600 shadow-md w-full max-w-xs sm:max-w-sm"
            >
              Start
            </button>
            <button
              onClick={handleClick}
              className="bg-[#15156a] text-white px-6 sm:px-8 py-3 rounded-lg hover:bg-cyan-600 shadow-md w-full max-w-xs sm:max-w-sm"
            >
              Click
            </button>
          </>
        )}

        {/* Exit Button */}
        {showExitButton && (
          <button
            onClick={handleExit}
            className="bg-red-500 text-white px-6 sm:px-8 py-3 rounded-lg hover:bg-red-600 shadow-md w-full max-w-xs sm:max-w-sm"
          >
            Exit
          </button>
        )}
      </div>
    </div>
  );
};

export default MakeAttendance;