import React from 'react';
import { Link } from 'react-router-dom';
import Image from '../assets/h-4.avif';
import '../app.css';

const Front = () => {
  return (

   <div className=" bg-[#071952] flex items-center justify-center min-h-screen bg-gradient-to-b from-white-300 to-green-500">
     
  
            <div className="icon absolute icon1 w-[100px] h-[100px] bg-[#EBF4F6]"></div>
            <div className="icon absolute icon2 w-[100px] h-[100px] bg-[#EBF4F6]"></div>
            <div className="icon absolute icon3 w-[100px] h-[100px] bg-[#EBF4F6]"></div>
            <div className="icon absolute icon4 w-[100px] h-[100px] bg-[#EBF4F6]"></div>
            <div className="icon absolute icon5 w-[100px] h-[100px] bg-[#EBF4F6]"></div>
            <div className="icon absolute icon6 w-[100px] h-[100px] bg-[#EBF4F6]"></div>
            <div className="icon absolute icon7 w-[100px] h-[100px] bg-[#EBF4F6]"></div>
          
    

            <div className='w-5/6 mx-auto rounded h-full bg-gray-50 flex flex-col relative z-10 my-2' 
     style={{ boxShadow: '0 4px 8px #37B7C3' }}>

           <h1 className='p-4 text-[#37B7C3] text-2xl font-bold'>Attendity</h1>
          <div className='flex flex-col-reverse md:flex-row items-center justify-center'>
            <div className='md:w-1/2 w-full p-4 m-2'>
              <h1 className='text-2xl sm:text-3xl font-medium font-tektur text-[#071952] md:text-4xl'>
              Attendity - Simplifying Attendance Management
              </h1>
              <h2 className='text-[#37B7C3] text-xl font-normal py-4 md:text-2xl'>
              Efficient, Real-Time Employee Tracking Made Easy
              </h2>
              <p className='text-sm md:text-base'>
              Attendity is a user-friendly employee attendance system designed to simplify time tracking and absence management. With real-time monitoring and automated reports, it streamlines administrative tasks and improves transparency. Empower your organization with Attendity for effortless attendance management.
              </p>
              <div className='mt-6 md:mt-10 sm:space-x-4'>
                <Link to='./login'>
                  <button className='bg-[#071952] mr-4 text-white rounded mb-4 py-2 px-6 font-medium inline-block hover:bg-transparent hover:border-[#071952] hover:text-[#071952] duration-300 hover:border border border-transparent'>
                    Start Now ➡️
                  </button>
                </Link>
              </div>
            </div>

            <div className='md:w-1/2 w-full md:h-w-1/2 h-full p-2'>
              <img src={Image} alt="" className='w-full h-full' />
            </div>
          </div>
        </div>
      </div>
  );
};

export default Front;
