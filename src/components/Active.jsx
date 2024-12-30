import React, { useState } from "react";

const Active = () => {
  // State to track whether the button is "On" or "Off"
  const [isActive, setIsActive] = useState(false);

  // Toggle the state when the button is clicked
  const toggleState = () => {
    setIsActive(prevState => !prevState);
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="text-center">
        <h1 className="mb-4">{isActive ? "On" : "Off"}</h1>
        <button 
          onClick={toggleState} 
          className={`px-10 py-5 rounded-full text-white font-bold transition-all duration-300 
            ${isActive ? "bg-green-500" : "bg-[#821131]"}`}
        >
          {isActive ? "Turn Off" : "Turn On"}
        </button>
      </div>
    </div>
  );
}

export default Active;