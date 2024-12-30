import React, { useState, useEffect } from "react";

const Leave = () => {
  const [leaveData, setLeaveData] = useState({
    EarnedLeave: { used: 0, left: 0 },
    CasualLeave: { used: 0, left: 0 },
    MaternityLeave: { used: 0, left: 0 },
  });

  const [selectedYear, setSelectedYear] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal state

  const mockLeaveData = {
    "2024-January": {
      EarnedLeave: { used: 2, left: 4 },
      CasualLeave: { used: 1, left: 5 },
      MaternityLeave: { used: 0, left: 6 },
    },
    "2024-February": {
      EarnedLeave: { used: 3, left: 3 },
      CasualLeave: { used: 2, left: 4 },
      MaternityLeave: { used: 1, left: 5 },
    },
    "2024-December": {
      EarnedLeave: { used: 4, left: 2 },
      CasualLeave: { used: 3, left: 3 },
      MaternityLeave: { used: 2, left: 4 },
    },
  };

  useEffect(() => {
    const today = new Date();
    const currentYear = today.getFullYear();
    const currentMonth = [
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
    ][today.getMonth()];

    const key = `${currentYear}-${currentMonth}`;
    setLeaveData(
      mockLeaveData[key] || {
        EarnedLeave: { used: 0, left: 0 },
        CasualLeave: { used: 0, left: 0 },
        MaternityLeave: { used: 0, left: 0 },
      }
    );
    setSelectedYear(currentYear);
    setSelectedMonth(currentMonth);
  }, []);

  const handleSearch = () => {
    const key = `${selectedYear}-${selectedMonth}`;
    const searchedData = mockLeaveData[key] || {
      EarnedLeave: { used: 0, left: 0 },
      CasualLeave: { used: 0, left: 0 },
      MaternityLeave: { used: 0, left: 0 },
    };
    setLeaveData(searchedData);
  };

  return (
    <div className="p-6">
      {/* Paragraph and Button */}
      <div className="flex justify-between items-center bg-white p-6 rounded-lg shadow-lg mb-6">
        <p className="text-gray-700 text-lg">
          This section allows you to view and search leave data for a specific
          month and year. Use the button on the right to access leave cards.
        </p>
        <button
          onClick={() => setIsModalOpen(true)} // Open the modal
          className="bg-cyan-700 hover:bg-cyan-800 text-white font-bold py-2 px-4 rounded"
        >
          Want to Leave ➡️
        </button>
      </div>

      {/* Search Section */}
      <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
        <h3 className="font-bold text-lg mb-4 text-cyan-700">
          Search Attendance
        </h3>
        <div className="flex space-x-4">
          <div className="w-1/2">
            <label className="block text-gray-700 font-semibold mb-2">
              Select Year
            </label>
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="w-full px-3 py-2 border rounded bg-gray-100 text-black"
            >
              <option value="">-- Select Year --</option>
              {Array.from({ length: 2024 - 2020 + 1 }, (_, i) => 2020 + i).map(
                (year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                )
              )}
            </select>
          </div>

          <div className="w-1/2">
            <label className="block text-gray-700 font-semibold mb-2">
              Select Month
            </label>
            <select
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              className="w-full px-3 py-2 border rounded bg-gray-100 text-black"
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
        </div>

        <div className="flex justify-center mt-6">
          <button
            onClick={handleSearch}
            className="bg-cyan-700 hover:bg-cyan-800 text-white font-bold py-2 px-4 rounded"
          >
            Search
          </button>
        </div>
      </div>

      {/* Leave Cards */}
      <div className="flex justify-between space-x-4">
        <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
          <h2 className="font-bold text-xl mb-4 text-cyan-700">Earned Leave</h2>
          <p className="text-gray-700">Used: {leaveData.EarnedLeave.used}</p>
          <p className="text-gray-700">Left: {leaveData.EarnedLeave.left}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
          <h2 className="font-bold text-xl mb-4 text-cyan-700">Casual Leave</h2>
          <p className="text-gray-700">Used: {leaveData.CasualLeave.used}</p>
          <p className="text-gray-700">Left: {leaveData.CasualLeave.left}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
          <h2 className="font-bold text-xl mb-4 text-cyan-700">
            Maternity Leave
          </h2>
          <p className="text-gray-700">Used: {leaveData.MaternityLeave.used}</p>
          <p className="text-gray-700">Left: {leaveData.MaternityLeave.left}</p>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-cyan-700 p-6 rounded-lg shadow-lg w-1/3">
            <h2 className="text-xl font-bold mb-4">Select Leave Type</h2>

            <form
              className="space-y-4"
              onSubmit={(e) => {
                e.preventDefault(); 
                alert("Successfully Submitted"); 
                setIsModalOpen(false); 
              }}
            >
              <div>
                <label className="block text-black">Leave Type</label>
                <select className="w-full px-3 py-2 border rounded bg-gray-100 text-black">
                  <option value="">-- Select Leave Type --</option>
                  <option value="EL">Earned Leave</option>
                  <option value="CL">Casual Leave</option>
                  <option value="ML">Maternity Leave</option>
                </select>
              </div>

              <div>
                <label className="block text-black">Name</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border rounded bg-gray-100"
                  placeholder="Enter your name"
                />
              </div>

              <div>
                <label className="block text-black">Email</label>
                <input
                  type="email"
                  className="w-full px-3 py-2 border rounded bg-gray-100"
                  placeholder="Enter your email"
                />
              </div>

              <div>
                <label className="block text-black">Employee ID</label>
                <input
                  type="text"
                  className="text-black w-full px-3 py-2 border rounded bg-gray-100"
                  placeholder="Enter your Employee ID"
                />
              </div>

              <div>
                <label className="block text-black">Phone No.</label>
                <input
                  type="tel"
                  className="w-full px-3 py-2 border rounded bg-gray-100"
                  placeholder="Enter your phone number"
                />
              </div>

              <div>
                <label className="block text-black">Reason for Leave</label>
                <textarea
                  className="w-full px-3 py-2 border rounded bg-gray-100 text-black"
                  placeholder="Enter the reason for leave"
                ></textarea>
              </div>

              <div className="flex justify-between">
                <button
                  type="submit"
                  className="bg-gray-700 hover:bg-cyan-800 text-white font-bold py-2 px-4 rounded"
                >
                  Submit
                </button>
                <button
                  onClick={() => setIsModalOpen(false)} // Close the modal
                  className="bg-gray-700 hover:bg-cyan-800 text-white font-bold py-2 px-4 rounded"
                >
                  Close
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Leave;