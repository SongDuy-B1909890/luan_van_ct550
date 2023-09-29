import React from 'react';
import DensityMediumIcon from '@mui/icons-material/DensityMedium';

const MenuPage = ({ closeModal }) => {

    const handleBackdropClick = (event) => {
        if (event.target === event.currentTarget) {
          closeModal(); // Gọi hàm closeModal khi nhấp vào nền
        }
      };

      return (
        <div className="w-screen h-screen bg-black bg-opacity-50 flex py fixed inset-0 z-50  " onClick={handleBackdropClick}>
            <div className="w-[240px] h-screen bg-white">
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
                            <li className="hover:bg-gray-200 py-2 px-2 rounded-xl">Trang chủ</li>
                            <li className="hover:bg-gray-200 py-2 px-2 rounded-xl">Kênh Của Tôi</li>
                            <li className="hover:bg-gray-200 py-2 px-2 rounded-xl">Kênh Đăng ký</li>
                        </ul>
                        <hr/>
                        <ul className="mt-2">
                            <li className="hover:bg-gray-200 py-2 px-2 rounded-xl">Video đã xem</li>
                            <li className="hover:bg-gray-200 py-2 px-2 rounded-xl">Video yêu thích</li>
                            <li className="hover:bg-gray-200 py-2 px-2 rounded-xl">Kênh Đăng ký</li>
                        </ul>
                    </div>

                </div>
               

            </div>
        </div>
      );
    };

export default MenuPage;