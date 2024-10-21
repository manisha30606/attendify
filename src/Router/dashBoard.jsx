import React from 'react';

import Attendance from '../components/Attendance';
import Leave from "../components/Leave";
import MakeAttendance from "../components/MakeAttendance";
import Profile from "../components/Profile";


const Dashboard = () => {
    return (
        <section>
            <div className="flex flex-col md:flex-row my-10 text-gray-50">
                {/* Left Sidebar / Menu */}
                <aside className="w-[100%] md:w-[30%] bg-slate-600 p-4">
                    <h2>Menu</h2>
                    <p>Here Menu</p>
                    <Profile/>
                    <Attendance/>
                    <Leave/>
                    <MakeAttendance/>
                </aside>

             
                <main className="w-[100%] md:w-[70%] bg-slate-800 p-4">
                    <h2>Right</h2>
                    <p>Here Come from components one by one by clicking the Menu</p>
                </main>
            </div>
        </section>
    );
}

export default Dashboard;
