import React, { useState, useEffect, useRef } from "react";
import Webcam from "react-webcam";
import axios from "axios";

const MakeAttendance = () => {
  const [showWebcam, setShowWebcam] = useState(false);
  const [location, setLocation] = useState(null);
  const [attendanceMessage, setAttendanceMessage] = useState("");
  const [empData, setEmpData] = useState({ name: "", id: "" });
  const [capturedImage, setCapturedImage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false); // State for disabling button

  const webcamRef = useRef(null);

  const videoConstraints = {
    width: 1280,
    height: 720,
    facingMode: "user",
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("No token found in localStorage");
      return;
    }

    const fetchEmpData = async () => {
      try {
        const response = await axios.get("http://localhost:8080/auth/empdata", {
          headers: { Authorization: Bearer ${token} },
        });
        const data = response.data;
        setEmpData({
          name: data.empName,
          id: data.empId || "",
        });
      } catch (error) {
        if (error.response && error.response.status === 401) {
          console.error("Unauthorized: Invalid token");
        } else {
          console.error("Error fetching user data:", error);
        }
      }
    };

    fetchEmpData();
  }, []);

  const handleStart = () => {
    setShowWebcam(true);
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
  };

  const handleCaptureImage = () => {
    try {
      if (webcamRef.current) {
        const imageSrc = webcamRef.current.getScreenshot();
        if (!imageSrc) {
          throw new Error("Failed to capture image from webcam.");
        }
        setCapturedImage(imageSrc);
        console.log(imageSrc);
      }
    } catch (error) {
      console.error("Error capturing image:", error.message);
      alert("Error capturing the image. Please try again.");
    }
  };

  
  const handleSubmitAttendance = async () => {
    if (!capturedImage || !location) {
      alert("Please capture your image and get your location first.");
      return;
    }

    setIsSubmitting(true); // Disable button during submission

    try {
      const token = localStorage.getItem("token");
      console.log("Captured Image:", capturedImage); // Log the correct variable
      const response = await axios.post(
        "http://localhost:8080/auth/attendance",
        {
          frontendImage: capturedImage.split(",")[1], // Extract base64 from src
          latitude: location.latitude,
          longitude: location.longitude,
        },
        {
          headers: {
            Authorization: Bearer ${token},
            "Content-Type": "application/json",
          },
        }
      );
      setAttendanceMessage(response.data.message || "Attendance marked successfully!");
    } catch (error) {
      console.error("Error marking attendance:", error);
      setAttendanceMessage("Failed to mark attendance. Please try again.");
    } finally {
      setIsSubmitting(false); // Re-enable button after submission
    }
  };

  const handleExit = () => {
    setShowWebcam(false);
    setCapturedImage(null);
    setAttendanceMessage("Attendance is not marked.");
  };

  return (
   
      <>
return (
  <div className="min-h-screen bg-gray-100 flex flex-col items-center px-4 sm:px-6 lg:px-8">
    <h1 className="font-bold text-[#15156a] text-2xl sm:text-4xl mt-8 sm:mt-10 text-center">
      Make Attendance
    </h1>
    <div className="text-[#15156a] my-6 text-sm sm:text-xl mx-auto w-full sm:w-[80%] flex flex-col sm:flex-row sm:justify-between items-center space-y-2 sm:space-y-0">
      <h3>Name - {empData.name}</h3>
      <h3>EmpId - {empData.id}</h3>
    </div>

    {attendanceMessage ? (
      <div className="mt-6 text-[#15156a] text-sm sm:text-base text-center">
        <p>{attendanceMessage}</p>
      </div>
    ) : (
      <>
        {showWebcam && (
          <div className="mt-6 sm:mt-10 w-full flex justify-center">
            <div className="relative border border-gray-300 rounded-lg overflow-hidden w-full max-w-xs sm:max-w-md">
              <Webcam
                audio={false}
                videoConstraints={videoConstraints}
                className="w-full h-auto"
                ref={webcamRef}
                screenshotFormat="image/jpeg"
              />
            </div>
          </div>
        )}

        <div className="mt-8 sm:mt-10 flex flex-col items-center space-y-4">
          {!showWebcam ? (
            <button
              onClick={handleStart}
              className="bg-[#15156a] text-white px-6 sm:px-8 py-3 rounded-lg hover:bg-cyan-600 shadow-md w-full max-w-xs sm:max-w-sm"
            >
              Start Webcam
            </button>
          ) : (
            <>
              <button
                onClick={handleCaptureImage}
                className="bg-[#15156a] text-white px-6 sm:px-8 py-3 rounded-lg hover:bg-cyan-600 shadow-md w-full max-w-xs sm:max-w-sm"
              >
                Capture Image
              </button>
              <button
                onClick={handleExit}
                className="bg-red-500 text-white px-6 sm:px-8 py-3 rounded-lg hover:bg-red-600 shadow-md w-full max-w-xs sm:max-w-sm"
              >
                Exit
              </button>
            </>
          )}

          {capturedImage && (
            <div className="mt-6 flex flex-col items-center">
              <p className="text-sm sm:text-base text-[#15156a]">
                Captured Image Preview:
              </p>
              <img
                src={capturedImage}
                alt="Captured Preview"
                className="border border-gray-300 rounded-lg mt-4 w-64 h-auto"
              />
            </div>
          )}

          {capturedImage && location && (
            <div className="mt-6 text-[#15156a] text-sm sm:text-base text-center">
              <p>
                Location: {location.latitude}, {location.longitude}
              </p>
            </div>
          )}

          <button
            onClick={handleSubmitAttendance}
            className={`${
              isSubmitting ? "bg-gray-400 cursor-not-allowed" : "bg-[#15156a] hover:bg-cyan-600"
            } text-white px-6 sm:px-8 py-3 rounded-lg shadow-md w-full max-w-xs sm:max-w-sm`}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Submit Attendance"}
          </button>
        </div>
      </>
    )}
  </div>
);
     
 


      </>
    );
    
  
};

export default MakeAttendance;
