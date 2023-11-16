import React, { useEffect, useState } from 'react';
import axios from 'axios';

import DensityMediumIcon from '@mui/icons-material/DensityMedium';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import SubscriptionsOutlinedIcon from '@mui/icons-material/SubscriptionsOutlined';
import LiveTvOutlinedIcon from '@mui/icons-material/LiveTvOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';

import FooterPage from './footer';
import '../../index.css';
import { Link } from 'react-router-dom';

const userString = localStorage.getItem('user');
const user = userString ? JSON.parse(userString) : null;

const MenuPage = ({ closeModal }) => {
    const handleBackdropClick = (event) => {
        if (event.target === event.currentTarget) {
            closeModal(); // Gọi hàm closeModal khi nhấp vào nền
        }
    };

    const [categories, setCategories] = useState([]);

    useEffect(() => {
        axios
            .get('http://localhost:5000/api/admin/categories')
            .then((response) => {
                // console.log(response.data);
                const categoriesData = response.data;
                setCategories(categoriesData);
            })
            .catch((error) => {
                console.error(error);
            });

    }, []);

    const handleCategoryClick = (categoryId,) => {
        localStorage.setItem('id_category', categoryId);
        window.location.href = '/category/id:' + categoryId;

    };

    const handleMyChannelClick = (userId,) => {
        localStorage.setItem('id_user', userId);
        window.location.href = '/myChannel/id:' + userId;

    };

    const handleFavoriteClick = (userId,) => {
        localStorage.setItem('id_user', userId);
        window.location.href = '/favorite/id:' + userId;

    };

    return (

        <div className="w-screen h-screen bg-black bg-opacity-50 flex py fixed inset-0 z-50 " onClick={handleBackdropClick}>
            <div className="w-[250px] h-screen bg-white relative slide-in">
                <div className="ml-5 mt-3 mr-4">

                    <div className="mb-5">
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
                        <div>
                            <ul className="mb-2 font-bold">

                                <Link to="/">
                                    <li className="hover:bg-gray-200 hover:text-blue-800 py-2 px-2 rounded-xl cursor-pointer">
                                        <HomeOutlinedIcon className="mr-4" />
                                        Trang Chủ
                                    </li>
                                </Link>

                                <Link to="/">
                                    <li className="hover:bg-gray-200 hover:text-blue-800 py-2 px-2 rounded-xl cursor-pointer"
                                        onClick={() => handleMyChannelClick(user.id)}
                                    >
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
                                    <li className="hover:bg-gray-200 hover:text-blue-800 py-2 px-2 rounded-xl cursor-pointer"
                                        onClick={() => handleFavoriteClick(user.id)}
                                    >
                                        <FavoriteBorderOutlinedIcon className="mr-4" />
                                        Video yêu thích
                                    </li>
                                </Link>

                            </ul>
                        </div>
                        <hr />
                        {/* <span className="flex justify-center items-center mt-2 text-blue-500 font-bold">Danh mục</span> */}
                        {categories.map((category) => (
                            <div key={category.id}>
                                <ul className="mt-2">
                                    <li className="hover:bg-gray-200 hover:text-blue-500 py-2 px-2 rounded-xl cursor-pointer text-blue-900 font-bold"
                                        onClick={() => handleCategoryClick(category.id)}
                                    >
                                        <SubscriptionsOutlinedIcon className="mr-4" />
                                        {category.name}
                                    </li>
                                </ul>
                            </div>
                        ))}
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