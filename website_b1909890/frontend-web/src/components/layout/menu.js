import React from 'react';
import DensityMediumIcon from '@mui/icons-material/DensityMedium';
import FlagOutlinedIcon from '@mui/icons-material/FlagOutlined';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import SubscriptionsOutlinedIcon from '@mui/icons-material/SubscriptionsOutlined';
import LiveTvOutlinedIcon from '@mui/icons-material/LiveTvOutlined';
import FooterPage from './footer';
import '../../index.css';
import { Link } from 'react-router-dom';

const MenuPage = ({ closeModal }) => {
    const handleBackdropClick = (event) => {
        if (event.target === event.currentTarget) {
            closeModal(); // Gọi hàm closeModal khi nhấp vào nền
        }
    };

    return (

        <div className="w-screen h-screen bg-black bg-opacity-50 flex py fixed inset-0 z-50 " onClick={handleBackdropClick}>
            <div className="w-[225px] h-screen bg-white relative slide-in">
                <div className="ml-5 mt-3 mr-4">

                    <div className="mb-8">
                        <button
                            className="flex justify-center items-center 
                            w-10 h-10 hover:bg-gray-100 rounded-full"
                            onClick={handleBackdropClick}
                        >
                            <DensityMediumIcon
                                onClick={handleBackdropClick}
                            />
                        </button>

                        {/* logo website */}
                    </div>

                    <div>
                        <ul className="mb-2">

                            <Link to="/">
                                <li className="hover:bg-gray-200 hover:text-blue-800 py-2 px-2 rounded-xl cursor-pointer">
                                    <HomeOutlinedIcon className="mr-4" />
                                    Trang Chủ
                                </li>
                            </Link>

                            <Link to="/">
                                <li className="hover:bg-gray-200 hover:text-blue-800 py-2 px-2 rounded-xl cursor-pointer">
                                    <LiveTvOutlinedIcon className="mr-4" />
                                    Kênh Của Tôi
                                </li>
                            </Link>

                            <Link to="/">
                                <li className="hover:bg-gray-200 hover:text-blue-800 py-2 px-2 rounded-xl cursor-pointer">
                                    <SubscriptionsOutlinedIcon className="mr-4" />
                                    Kênh Đăng Ký
                                </li>
                            </Link>

                            <Link to="/">
                                <li className="hover:bg-gray-200 hover:text-blue-800 py-2 px-2 rounded-xl cursor-pointer">
                                    <SubscriptionsOutlinedIcon className="mr-4" />
                                    Video đã thích
                                </li>
                            </Link>

                        </ul>

                        <hr />

                        <ul className="mt-2">
                            <Link to="/">
                                <li className="hover:bg-gray-200 hover:text-blue-800 py-2 px-2 rounded-xl cursor-pointer">
                                    <RemoveRedEyeOutlinedIcon className="mr-4" />
                                    Kiến thức
                                </li>
                            </Link>

                            <Link to="/">
                                <li className="hover:bg-gray-200 hover:text-blue-800 py-2 px-2 rounded-xl cursor-pointer">
                                    <FavoriteBorderOutlinedIcon className="mr-4" />
                                    Tư duy
                                </li>
                            </Link>

                            <Link to="/">
                                <li className="hover:bg-gray-200 hover:text-blue-800 py-2 px-2 rounded-xl cursor-pointer">
                                    <FlagOutlinedIcon className="mr-4" />
                                    Ngôn từ
                                </li>
                            </Link>
                            <Link to="/">
                                <li className="hover:bg-gray-200 hover:text-blue-800 py-2 px-2 rounded-xl cursor-pointer">
                                    <FlagOutlinedIcon className="mr-4" />
                                    Hành động
                                </li>
                            </Link>
                            <Link to="/">
                                <li className="hover:bg-gray-200 hover:text-blue-800 py-2 px-2 rounded-xl cursor-pointer">
                                    <FlagOutlinedIcon className="mr-4" />
                                    Đời sống
                                </li>
                            </Link>
                            <Link to="/">
                                <li className="hover:bg-gray-200 hover:text-blue-800 py-2 px-2 rounded-xl cursor-pointer">
                                    <FlagOutlinedIcon className="mr-4" />
                                    Nổ lực
                                </li>
                            </Link>
                            <Link to="/">
                                <li className="hover:bg-gray-200 hover:text-blue-800 py-2 px-2 rounded-xl cursor-pointer">
                                    <FlagOutlinedIcon className="mr-4" />
                                    Tập trung
                                </li>
                            </Link>
                            <Link to="/">
                                <li className="hover:bg-gray-200 hover:text-blue-800 py-2 px-2 rounded-xl cursor-pointer">
                                    <FlagOutlinedIcon className="mr-4" />
                                    Thư giản
                                </li>
                            </Link>
                        </ul>

                        <div className="absolute bottom-0">
                            <FooterPage />
                        </div>
                    </div>



                </div>

            </div>

        </div>

    );
};

export default MenuPage;