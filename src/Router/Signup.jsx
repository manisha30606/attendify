import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../App.css';
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { handleError, handleSuccess } from '../utils';

function SignUp() {
    const [signupInfo, setsignUpInfo] = useState({
        name: '',
        email: '',
        phone: '',
        empId: '',
        password: ''
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setsignUpInfo(prev => ({ ...prev, [name]: value }));
    };

    const handleSignup = async (e) => {
     
        e.preventDefault();

        const { name, email, phone, empId, password } = signupInfo;

        if (!name || !email || !password || !phone || !empId) {
            return handleError('All fields are required');
        }

        try {
            const url = `http://localhost:8000/auth/signup`;
            const response = await fetch(url, {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(signupInfo)
            });

            if (!response.ok) {
                const result = await response.json();
                throw new Error(result.message || "Signup failed, please try again.");
            }

            const result = await response.json();
            const { success, message } = result;

            if (success) {
                handleSuccess(message);
                navigate('/login'); 
            } else {
                handleError(message || "Signup failed");
            }
        } catch (err) {
            handleError(err.message || "An unexpected error occurred");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-[#071952]">
            <ToastContainer />
            <div className="bg-white p-8 rounded-lg shadow-[0_4px_30px_rgba(236,72,153,0.8)] max-w-md w-full 
                           transform transition duration-500 
                           hover:shadow-[0_4px_30px_rgba(236,72,153,0.8)] hover:bg-white"
            >
                <h2 className="text-2xl font-bold text-[#37B7C3] text-center mb-6">Sign Up</h2>
                <form onSubmit={handleSignup}>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Name of Employee:</label>
                        <input
                            type="text"
                            name="name"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
                            onChange={handleChange}
                            required
                            value={signupInfo.name}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Email of Employee:</label>
                        <input
                            type="email"
                            name="email"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
                            onChange={handleChange}
                            required
                            value={signupInfo.email}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Phone Number:</label>
                        <input
                            type="tel"
                            name="phone"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
                            onChange={handleChange}
                            required
                            value={signupInfo.phone}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Employee ID:</label>
                        <input
                            type="text"
                            name="empId"  // Fix name attribute
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
                            onChange={handleChange}
                            required
                            value={signupInfo.empId}  // Fix value prop
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Password:</label>
                        <input
                            type="password"
                            name="password"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
                            onChange={handleChange}
                            required
                            value={signupInfo.password}
                        />
                    </div>
                    <div className="flex justify-between">
                        <button 
                       
                            type="submit"
                            className="bg-white text-black py-2 px-6 rounded-lg shadow-lg hover:bg-[#37B7C3] hover:text-white hover:shadow-xl transition duration-200 flex items-center"
                        >
                            Sign Up Now <span className="ml-2">→</span>
                        </button>
                        <Link to="/login">
                            <button
                                type="button"
                                className="bg-white text-black py-2 px-6 rounded-lg shadow-lg hover:bg-[#37B7C3] hover:text-white hover:shadow-xl transition duration-200 flex items-center"
                            >
                                Login Now <span className="ml-2">→</span>
                            </button>
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default SignUp;
