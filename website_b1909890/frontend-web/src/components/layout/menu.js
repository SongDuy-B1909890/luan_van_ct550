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

const MenuPage = ({ closeModal }) => {
    const handleBackdropClick = (event) => {
        if (event.target === event.currentTarget) {
          closeModal(); // Gọi hàm closeModal khi nhấp vào nền
        }
      };

      return (
        
        <div className="w-screen h-screen bg-black bg-opacity-50 flex py fixed inset-0 z-50 " onClick={handleBackdropClick}>
            <div className="w-[240px] h-screen bg-white relative slide-in">
                <div className="ml-5 mt-3 mr-4 ">

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
                            <li className="hover:bg-gray-200 py-2 px-2 rounded-xl"> 
                                <HomeOutlinedIcon className="mr-4"/> 
                                Trang Chủ
                            </li>
                            <li className="hover:bg-gray-200 py-2 px-2 rounded-xl">
                                <LiveTvOutlinedIcon className="mr-4"/>
                                Kênh Của Tôi
                            </li>
                            <li className="hover:bg-gray-200 py-2 px-2 rounded-xl">
                                <SubscriptionsOutlinedIcon className="mr-4"/>
                                Kênh Đăng Ký
                            </li>
                        </ul>

                        <hr/>

                        <ul className="mt-2">
                            <li className="hover:bg-gray-200 py-2 px-2 rounded-xl"> 
                                <RemoveRedEyeOutlinedIcon className="mr-4"/> 
                                Video Đã Xem
                            </li>
                            <li className="hover:bg-gray-200 py-2 px-2 rounded-xl">
                                <FavoriteBorderOutlinedIcon className="mr-4"/>
                                Video Yêu Thích
                            </li>
                            <li className="hover:bg-gray-200 py-2 px-2 rounded-xl"> 
                                <FlagOutlinedIcon className="mr-4"/> 
                                Video Vi Phạm
                            </li>
                        </ul>
                    </div>

                    <div className="absolute bottom-0">
                        <FooterPage/>
                    </div>

                </div>

                

            </div>
            
        </div>
      
      );
    };

export default MenuPage;