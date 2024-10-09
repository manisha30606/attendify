import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Front from "./Router/Front";
import Login from "./Router/Login";
import SignUp from './Router/Signup';
import Home from "./Router/dashBoard"

function App() {
    return (
        <div className="App">
            <Routes>
                <Route path="/" element={<Front />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/login/home" element={<Home/>} />
            </Routes>
        </div>
    );
}

export default App;
