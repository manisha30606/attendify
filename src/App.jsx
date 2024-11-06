import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Front from "./Router/Front";
import Login from "./Router/Login";
import SignUp from './Router/Signup';
import Home from "./Router/dashBoard"
// import { useState } from 'react';
// import RefrshHandler from './RefrshHandler';
function App() {

// const [isAuthenticated, setIsAuthenticated] = useState(false);

//     const PrivateRoute = ({ element }) => {
//       return isAuthenticated ? element : <Navigate to="/login" />
//     }
    return (
        <div className="App">
             {/* <RefrshHandler setIsAuthenticated={setIsAuthenticated} /> */}
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
