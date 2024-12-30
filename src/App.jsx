import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Front from "./Router/Front";
import EmpDashboard from "./Router/EmpDashBoard";
import EmpLogin from "./Router/EmpLogin";
import EmpSignup from "./Router/EmpSignup";
import Home from "./Router/Home";
import AdminLogin from "./Router/AdminLogin";
import AdminSignup from "./Router/AdminSignup";
import AdminDash from "./Router/AdminDashboard";


function App() {
  return (
    // Wrap the entire application with AccessProvider
    <>
   {/* <AccessProvider> */}
      <div className="App">
        <Routes>
          {/* General Routes */}
          <Route path="/" element={<Front />} />
          <Route path="/home" element={<Home />} />

          {/* Employee Routes */}
          <Route path="/EmpLogin" element={<EmpLogin />} />
          <Route path="/EmpSignup" element={<EmpSignup />} />
          <Route path="/EmpDash" element={<EmpDashboard />} />

          {/* Admin Routes */}
          <Route path="/AdminLogin" element={<AdminLogin />} />
          <Route path="/AdminSignup" element={<AdminSignup />} />
          <Route path="/AdminDash" element={<AdminDash />} />
        </Routes>
      </div>
    {/* </AccessProvider> */}
    </>
  );
}

export default App;
