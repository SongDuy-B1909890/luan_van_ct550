import React, { useState } from 'react';
import DensityMediumIcon from '@mui/icons-material/DensityMedium';
import VideoCallOutlinedIcon from '@mui/icons-material/VideoCallOutlined';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import SearchIcon from '@mui/icons-material/Search';
import LoginPage from '../auth/login'
//import { Link } from 'react-router-dom';
const HeaderPage = () =>{
    const [isModal, setModal] = useState(false);
    const handleModalOpenClick = () => {
        setModal(true);
    };
    // const closeModal = () => {
    //     if (isModal===true) {
    //       setModal(false);
    //     }
    // };
 return ( 
       
    <div className="flex items-center w-full  h-[60px] bg-white fixed inset-x-0 top-0 shadow">

        <div className="w-max-[180px] mr-[180px]">

            <button className="flex justify-center items-center ml-5 mt-1 w-10 h-10 hover:bg-gray-100 rounded-full">
                <DensityMediumIcon />
                {/* chào */}
            </button>
            
        </div>

        <div className="mx-auto flex items-center ">

            <input
                type="text"
                placeholder="Tìm kiếm"
                className=" w-[535px] h-[40px] px-2 py-1 pl-4 pr-4 border border-gray-300 rounded-l-full placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
            <button className="w-[65px] h-[40px] bg-gray-100 border border-gray-300 rounded-r-full hover:bg-gray-200">
                <SearchIcon/>
            </button>
            
        </div>

        <div className="w-max-[180px] flex mr-8">
        
            <button 
                className="flex justify-center items-center mr-4 mt-1 w-10 h-10 hover:bg-gray-100 rounded-full" 
                title="Tạo video"
                onClick={handleModalOpenClick}
            > 
                <VideoCallOutlinedIcon />
            </button>

            <button 
                className="flex justify-center items-center mr-6 mt-1 w-10 h-10 hover:bg-gray-100 rounded-full" 
                title="Thông báo"
                onClick={handleModalOpenClick}
            > 
                <NotificationsNoneIcon />
            </button>

            
            <button 
                className="flex justify-center items-center text-blue-500 mt-1 w-[100px] h-10 hover:bg-blue-100 rounded-full border border-blue-500" 
                title="Đăng nhập"
                onClick={handleModalOpenClick}
            >   
                <div className="mr-2"> <AccountCircleIcon/> </div>
                    
                Sign in
            </button>
            {isModal && (
                
                <LoginPage />
                
            )}
            
        </div>
        
    </div>
 );
    };
export default HeaderPage;