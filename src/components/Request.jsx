import React, { useState } from "react";

const Request = () => {
  const [showModal, setShowModal] = useState(false); // Modal visibility state
  const [selectedRequest, setSelectedRequest] = useState(null); // Selected request data

  // Sample leave request data
  const requests = [
    { name: "John Doe", empId: "101", email: "john@example.com", leaveType: "EL", reason: "Family function" },
    { name: "Jane Smith", empId: "102", email: "jane@example.com", leaveType: "CL", reason: "Medical appointment" },
    { name: "Alice Brown", empId: "103", email: "alice@example.com", leaveType: "ML", reason: "Maternity leave" },
    { name: "Bob Johnson", empId: "104", email: "bob@example.com", leaveType: "EL", reason: "Vacation" },
  ];

  // Open the modal and set the selected request data
  const handleViewRequest = (request) => {
    setSelectedRequest(request);
    setShowModal(true);
  };

  // Close the modal
  const closeModal = () => {
    setShowModal(false);
    setSelectedRequest(null);
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <h1 className="text-3xl font-bold text-center my-6 text-[#821131]">Leave Request</h1>

      {/* Leave Request Boxes */}
      <div className="flex flex-col gap-4 p-4 w-[50%] mx-auto">
        {requests.map((request, index) => (
          <div
            key={index}
            className="flex justify-between items-center bg-green-500 text-white py-3 px-4 rounded shadow-md"
          >
            <div>
              <p className="font-bold">Name: {request.name}</p>
              <p>EmpID: {request.empId}</p>
            </div>
            <button
              className="bg-white text-green-500 font-semibold px-4 py-2 rounded hover:bg-gray-200 transition"
              onClick={() => handleViewRequest(request)}
            >
              View Request
            </button>
          </div>
        ))}
      </div>

      {/* Modal/Dialog Box */}
      {showModal && selectedRequest && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center text-black">
          <div className="bg-white p-6 rounded-lg w-[400px] shadow-lg">
            <h2 className="text-2xl font-bold mb-4 text-center text-gray-700">Leave Request Details</h2>
            
            {/* Input Fields */}
            <div className="flex flex-col gap-4">
              <div>
                <label className="text-sm font-bold block mb-1">Leave Type</label>
                <div className="w-full border rounded p-2 bg-gray-100 text-gray-700">
                  {selectedRequest.leaveType}
                </div>
              </div>
              <div>
                <label className="text-sm font-bold block mb-1">Name</label>
                <input
                  type="text"
                  className="w-full border rounded p-2 bg-gray-100 text-gray-700"
                  value={selectedRequest.name}
                  disabled
                />
              </div>
              <div>
                <label className="text-sm font-bold block mb-1">Email</label>
                <input
                  type="email"
                  className="w-full border rounded p-2 bg-gray-100 text-gray-700"
                  value={selectedRequest.email}
                  disabled
                />
              </div>
              <div>
                <label className="text-sm font-bold block mb-1">Employee ID</label>
                <input
                  type="text"
                  className="w-full border rounded p-2 bg-gray-100 text-gray-700"
                  value={selectedRequest.empId}
                  disabled
                />
              </div>
              <div>
                <label className="text-sm font-bold block mb-1">Reason for Leave</label>
                <textarea
                  className="w-full border rounded p-2 bg-gray-100 text-gray-700 h-[80px]"
                  value={selectedRequest.reason}
                  disabled
                ></textarea>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex justify-end gap-4 mt-6">
              <button
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
                onClick={() => alert("Request Accepted")}
              >
                Accept
              </button>
              <button
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
                onClick={() => alert("Request Denied")}
              >
                Deny
              </button>
              <button
                className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500 transition"
                onClick={closeModal}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Request;