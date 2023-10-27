import React, { useState } from 'react';
import DensityMediumIcon from '@mui/icons-material/DensityMedium';
import VideoCallOutlinedIcon from '@mui/icons-material/VideoCallOutlined';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import SearchIcon from '@mui/icons-material/Search';
import Badge from '@mui/material/Badge';
import LoginPage from '../auth/login';
import MenuPage from './menu';
import Avatar from '@mui/material/Avatar';
import { Link } from 'react-router-dom';

// Lấy dữ liệu user trả về
const userString = localStorage.getItem('user');
const user = userString ? JSON.parse(userString) : null;

// Trả về giá trị đăng nhập
const login = localStorage.getItem('login');
// console.log(login); // Kết quả: "John"
if (user != null) {
    console.log('');
}

const HeaderPage = () => {
    const [isLoginModal, setIsLoginModal] = useState(false);
    const openLoginModal = () => {
        if (login === "true") {
            setIsLoginModal(false);
        } else {
            setIsLoginModal(true);
        }

    };
    const closeLogout = () => {
        localStorage.setItem('login', 'false');
        //localStorage.setItem('user', JSON.stringify(null));
        window.location.href = '/';
    };
    const closeLoginModal = () => {
        setIsLoginModal(false);
    };

    const [isMenuModal, setIsMenuModal] = useState(false);
    const openMenuModal = () => {
        setIsMenuModal(true);
    };
    const closeMenuModal = () => {
        setIsMenuModal(false);
    };
    if (login === 'true') {
        return (
            <div className="flex items-center w-full h-[60px] bg-white fixed inset-x-0 top-0 shadow z-50">
                <div className="w-max-[180px] mr-[180px]">
                    <button
                        className="flex justify-center items-center ml-5 mt-1 w-10 h-10 hover:bg-gray-100 rounded-full"
                        onClick={openMenuModal}
                    >
                        <DensityMediumIcon />
                    </button>
                    {isMenuModal && <MenuPage closeModal={closeMenuModal} />}
                </div>

                <div className="mx-auto flex items-center ">
                    <input
                        className="w-[535px] h-[40px] px-2 py-1 pl-4 pr-4 border border-gray-300 rounded-l-full placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-800 focus:border-blue-100 sm:text-sm"
                        type="text"
                        placeholder="Tìm kiếm"
                    />
                    <button
                        className="w-[65px] h-[40px] bg-gray-100 border border-gray-300 rounded-r-full hover:bg-gray-200"
                        title="Tìm kiếm"
                    >
                        <SearchIcon />
                    </button>
                </div>

                <div className="w-max-[180px] flex mr-8">
                    <button
                        className="flex justify-center items-center mr-4 mt-1 w-10 h-10 hover:bg-gray-100 rounded-full"
                        title="Tạo video"
                        onClick={openLoginModal}
                    >
                        <VideoCallOutlinedIcon />
                    </button>

                    <button
                        className="flex justify-center items-center mr-6 mt-1 w-10 h-10 hover:bg-gray-100 rounded-full"
                        title="Thông báo"
                        onClick={openLoginModal}
                    >
                        <Badge color="secondary" badgeContent={99}>
                            <NotificationsNoneIcon />
                        </Badge>
                    </button>

                    <button
                        className="flex justify-center items-center text-blue-500 mt-1 mr-6 h-10 hover:bg-blue-100 rounded-full border border-blue-500"
                        onClick={openLoginModal}
                    >
                        {/* <div className="mr-2">
                            <AccountCircleIcon />
                        </div>
                        {user && user.lastname ? user.lastname : "Sign in"} */}
                        <Link to="/profile">
                            <Avatar
                                alt="Remy Sharp"
                                src="https://vapa.vn/wp-content/uploads/2022/12/hinh-nen-dep-ngau-nu-001.jpg"
                                sx={{ width: 50, height: 50 }}
                            />
                        </Link>

                    </button>

                    <button
                        className="flex justify-center items-center text-blue-500 mt-1 w-[120px] h-10 hover:bg-blue-100 rounded-full border border-blue-500"
                        title="Đăng xuất"
                        onClick={closeLogout}
                    >
                        <div className="mr-2">
                            <AccountCircleIcon />
                        </div>
                        Sign out
                    </button>

                    {isLoginModal && <LoginPage closeModal={closeLoginModal} />}
                </div>
            </div>
        );
    } else {
        return (
            <div className="flex items-center w-full h-[60px] bg-white fixed inset-x-0 top-0 shadow z-50">
                <div className="w-max-[180px] mr-[180px]">
                    <button
                        className="flex justify-center items-center ml-5 mt-1 w-10 h-10 hover:bg-gray-100 rounded-full"
                        onClick={openMenuModal}
                    >
                        <DensityMediumIcon />
                    </button>
                    {isMenuModal && <MenuPage closeModal={closeMenuModal} />}
                </div>

                <div className="mx-auto flex items-center ">
                    <input
                        className="w-[535px] h-[40px] px-2 py-1 pl-4 pr-4 border border-gray-300 rounded-l-full placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-800 focus:border-blue-100 sm:text-sm"
                        type="text"
                        placeholder="Tìm kiếm"
                    />
                    <button
                        className="w-[65px] h-[40px] bg-gray-100 border border-gray-300 rounded-r-full hover:bg-gray-200"
                        title="Tìm kiếm"
                    >
                        <SearchIcon />
                    </button>
                </div>

                <div className="w-max-[180px] flex mr-8">
                    <button
                        className="flex justify-center items-center mr-4 mt-1 w-10 h-10 hover:bg-gray-100 rounded-full"
                        title="Tạo video"
                        onClick={openLoginModal}
                    >
                        <VideoCallOutlinedIcon />
                    </button>
                    <button
                        className="flex justify-center items-center mr-6 mt-1 w-10 h-10 hover:bg-gray-100 rounded-full"
                        title="Thông báo"
                        onClick={openLoginModal}
                    >
                        <Badge color="secondary" > {/*badgeContent={99} */}
                            <NotificationsNoneIcon />
                        </Badge>
                    </button>
                    <button
                        className="flex justify-center items-center text-blue-500 mt-1 w-[120px] h-10 hover:bg-blue-100 rounded-full border border-blue-500"
                        title="Đăng nhập"
                        onClick={openLoginModal}
                    >
                        <div className="mr-2">
                            <AccountCircleIcon />
                        </div>
                        Sign in
                    </button>
                    {isLoginModal && <LoginPage closeModal={closeLoginModal} />}
                </div>
            </div>
        );
    }

};

export default HeaderPage;