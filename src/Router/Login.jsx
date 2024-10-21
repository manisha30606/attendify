import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Logging in with: ", { email, password });
    };

    return (
        <div className=" bg-[#071952] flex items-center justify-center min-h-screen bg-gradient-to-b from-white-300 to-green-500">
            
            <div className="icon absolute icon1 w-[100px] h-[100px] bg-[#EBF4F6]"></div>
            <div className="icon absolute icon2 w-[100px] h-[100px] bg-[#EBF4F6]"></div>
            <div className="icon absolute icon3 w-[100px] h-[100px] bg-[#EBF4F6]"></div>
            <div className="icon absolute icon4 w-[100px] h-[100px] bg-[#EBF4F6]"></div>
            <div className="icon absolute icon5 w-[100px] h-[100px] bg-[#EBF4F6]"></div>
            <div className="icon absolute icon6 w-[100px] h-[100px] bg-[#EBF4F6]"></div>
            <div className="icon absolute icon7 w-[100px] h-[100px] bg-[#EBF4F6]"></div>
            <div className="icon absolute icon8 w-[100px] h-[100px] bg-[#EBF4F6]"></div>
            <div className="icon absolute icon9 w-[100px] h-[100px] bg-[#EBF4F6]"></div>
            
            <div 
                className="bg-white p-8 rounded-lg shadow-[0_4px_30px_rgba(236,72,153,0.8)] max-w-md w-full 
                           transform transition duration-500 hover:scale-105 
                           hover:shadow-[0_4px_30px_rgba(236,72,153,0.8)] hover:bg-white"
            >
                <h2 className="text-2xl text-center font-bold text-[#37B7C3] mb-6">Login</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
                            required
                        />
                    </div>
                    <div className="flex justify-between">
                        <Link to="/login/home">
                            <button
                                type="submit"
                                className="bg-white text-black py-2 px-6 rounded-lg shadow-lg hover:bg-[#37B7C3] hover:text-white hover:shadow-xl transition duration-200 flex items-center"
                            >
                                Login Now <span className="ml-2">→</span>
                            </button>
                        </Link>

                        <Link to="/signup">
                            <button
                                type="button"
                                className="bg-white text-black py-2 px-6 rounded-lg shadow-lg hover:bg-[#37B7C3] hover:text-white hover:shadow-xl transition duration-200 flex items-center"
                            >
                                Sign Up Now <span className="ml-2">→</span>
                            </button>
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;
