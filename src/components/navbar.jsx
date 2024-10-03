import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
    return (
        <nav className="bg-blue-500 p-4">
            <div className="container mx-auto">
                <ul className="flex justify-end space-x-4">
                    <li>
                        <Link className="text-white hover:text-gray-200" to="/login">Login</Link>
                    </li>
                    <li>
                        <Link className="text-white hover:text-gray-200" to="/signup">Sign Up</Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
}

export default Navbar;