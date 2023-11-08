import React, { useEffect, useState } from 'react';
import ReactPlayer from 'react-player/lazy';
import axios from 'axios';

import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Avatar from '@mui/material/Avatar';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import CommentRoundedIcon from '@mui/icons-material/CommentRounded';
import ReplyIcon from '@mui/icons-material/Reply';
import FlagIcon from '@mui/icons-material/Flag';

const staffString = localStorage.getItem('staff');
const staff = staffString ? JSON.parse(staffString) : null;

const closeLogout = () => {
    localStorage.setItem('loginStaffGroup02', 'false');
    window.location.href = '/login/staff';
};

const StaffGroup02Page = () => {

    const [videosStatus01, setVideosStatus01] = useState([]);
    const [videosStatus02, setVideosStatus02] = useState([]);
    const [videosStatus03, setVideosStatus03] = useState([]);

    const [users, setUsers] = useState([]);

    const [categories, setCategories] = useState([]);

    const [filteredUsers01, setFilteredUsers01] = useState([]);
    const [filteredUsers02, setFilteredUsers02] = useState([]);
    const [filteredUsers03, setFilteredUsers03] = useState([]);

    const [filteredCategories, setFilteredCategories] = useState([]);


    useEffect(() => {
        axios
            .get('http://localhost:5000/api/videos')
            .then((response) => {
                const videosData = response.data;

                // Giao đoạn nhân viên sơ tuyển
                const VideosStatus01 = videosData.filter((video) => video.status === "chờ xem xét");
                setVideosStatus01(VideosStatus01);

                // Giao đoạn nhân viên sơ tuyển
                const VideosStatus02 = videosData.filter((video) => video.status === "sơ tuyển");
                setVideosStatus02(VideosStatus02);

                // Giao đoạn nhân viên sơ tuyển
                const VideosStatus03 = videosData.filter((video) => video.status === "phản biện");
                setVideosStatus03(VideosStatus03);
            })
            .catch((error) => {
                console.error(error);
            });

        axios
            .get('http://localhost:5000/api/users')
            .then((response) => {
                // console.log(response.data);
                const usersData = response.data;
                setUsers(usersData);
            })
            .catch((error) => {
                console.error(error);
            });

        axios
            .get('http://localhost:5000/api/admin/categories')
            .then((response) => {
                // console.log(response.data);
                const categoriesData = response.data;
                setCategories(categoriesData);
                console.log(categoriesData);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    // Giao đoạn nhân viên sơ tuyển
    useEffect(() => {
        // Lọc danh sách người dùng dựa trên id_user của video
        const filteredUsers = users.filter((user) =>
            videosStatus01.some((video) => video.id_user === user.id)
        );
        // Lọc danh mục dựa trên id_category của video
        const filteredCategories = categories.filter((category) =>
            videosStatus01.some((video) => video.id_category === category.id)
        );
        setFilteredUsers01(filteredUsers);
        setFilteredCategories(filteredCategories);
    }, [videosStatus01, users, categories]);

    // Giao đoạn tổ phản biện
    useEffect(() => {
        // Lọc danh sách người dùng dựa trên id_user của video
        const filteredUsers = users.filter((user) =>
            videosStatus02.some((video) => video.id_user === user.id)
        );
        setFilteredUsers02(filteredUsers);
    }, [videosStatus02, users]);

    // Giao đoạn quản lý trưởng
    useEffect(() => {
        // Lọc danh sách người dùng dựa trên id_user của video
        const filteredUsers = users.filter((user) =>
            videosStatus03.some((video) => video.id_user === user.id)
        );
        setFilteredUsers03(filteredUsers);
    }, [videosStatus03, users]);

    if (staff.level === 1) { // giao diện trang nhân viên sơ tuyển nhóm 02
        return (
            <div>

                <div className="fixed top-0 left-0 w-full h-[65px] bg-white shadow z-50">
                    <div className="text-center mt-2 ml-8">
                        <b className="text-3xl ml-8 text-blue-800">Trang Nhân Viên Sơ Tuyển - Nội Dung Video Theo Danh Mục</b>
                        <div className="float-right mr-4">
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
                        </div>
                    </div>
                </div>

                {/* Nội dung */}
                <div className="w-full h-full overflow-auto bg-white mt-[70px]">
                    {videosStatus01.map((video, index) => (
                        <div className="flex justify-center items-center" key={index}>
                            <div className="flex flex-wrap justify-center items-center mb-8">
                                <div className="min-w-[1000px] min-h-[675px] max-w-[1000px] max-h-[675px] bg-white rouder-xl flex justify-center rounded-2xl border shadow">
                                    <div className="overflow-hidden" >

                                        <div className="mt-5" >
                                            <ReactPlayer
                                                url={video.url_video}
                                                width="960px"
                                                height="540px"
                                                controls
                                                allowFullScreen={true}
                                                loading="lazy"
                                                preload="true"
                                            />
                                        </div>
                                        <div className="mt-2 w-full h-full">
                                            <h1 className="font-bold text-xl">{video.title}</h1>
                                            {filteredUsers01
                                                .filter((user) => user.id === video.id_user)
                                                .map((user) => (
                                                    <div key={user.id} className="flex items-center mt-3">

                                                        <Avatar
                                                            alt="Remy Sharp"
                                                            src={user.avatar}
                                                            sx={{ width: 50, height: 50 }}
                                                        />
                                                        <span className="ml-2 text-md">{user.firstname + " " + user.lastname}</span>

                                                        <div className="text-right ml-auto">
                                                            <ul className="flex">

                                                                {filteredCategories
                                                                    .filter((category) => category.id === video.id_category)
                                                                    .map((category) => (
                                                                        <li className="mr-4 text-blue-800 text-xl font-bold">
                                                                            <button
                                                                                className="min-w-[150px] max-w-[150px] h-[50px] bg-gray-200 rounded-full hover:bg-gray-200"
                                                                            >
                                                                                {category.name}
                                                                            </button>
                                                                        </li>

                                                                    ))}

                                                                <li className="mr-4">
                                                                    <button
                                                                        className="w-[50px] h-[50px] bg-gray-100 rounded-full hover:bg-gray-200 " title='Yêu thích'
                                                                    >
                                                                        <FavoriteRoundedIcon />
                                                                    </button>
                                                                </li>

                                                                <li className="mr-4">
                                                                    <button
                                                                        className="w-[50px] h-[50px] bg-gray-100 rounded-full hover:bg-gray-200" title='Bình luận'
                                                                    >
                                                                        <CommentRoundedIcon />
                                                                    </button>
                                                                </li>

                                                                <li className="mr-4">
                                                                    <button
                                                                        className="w-[50px] h-[50px] bg-gray-100 rounded-full hover:bg-gray-200 transform scale-x-[-1]"
                                                                    >
                                                                        <ReplyIcon />
                                                                    </button>
                                                                </li>


                                                            </ul>

                                                        </div>
                                                    </div>
                                                ))}
                                        </div>
                                    </div>
                                </div>

                            </div>

                            {/* <CommentPage /> */}
                        </div>
                    ))}
                </div>
            </div>
        );

    } if (staff.level === 2) { // Giao diện trang tổ phản biện nhóm 02
        return (
            <div>

                <div className="fixed top-0 left-0 w-full h-[65px] bg-white shadow z-50">
                    <div className="text-center mt-2 ml-8">
                        <b className="text-3xl ml-8 text-blue-800">Trang Tổ Phản Biện - Nội Dung Video Theo Danh Mục</b>
                        <div className="float-right mr-4">
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
                        </div>
                    </div>
                </div>
                {/* Nội dung */}
                <div className="w-full h-full overflow-auto bg-white mt-[70px]">
                    {videosStatus02.map((video, index) => (
                        <div className="flex justify-center items-center" key={index}>
                            <div className="flex flex-wrap justify-center items-center mb-8">
                                <div className="min-w-[1000px] min-h-[675px] max-w-[1000px] max-h-[675px] bg-white rouder-xl flex justify-center rounded-2xl border shadow">
                                    <div className="overflow-hidden" >

                                        <div className="mt-5" >
                                            <ReactPlayer
                                                url={video.url_video}
                                                width="960px"
                                                height="540px"
                                                controls
                                                allowFullScreen={true}
                                                loading="lazy"
                                                preload="true"
                                            />
                                        </div>
                                        <div className="mt-2 w-full h-full">
                                            <h1 className="font-bold text-xl">{video.title}</h1>
                                            {filteredUsers02
                                                .filter((user) => user.id === video.id_user)
                                                .map((user) => (
                                                    <div key={user.id} className="flex items-center mt-3">

                                                        <Avatar
                                                            alt="Remy Sharp"
                                                            src={user.avatar}
                                                            sx={{ width: 50, height: 50 }}
                                                        />
                                                        <span className="ml-2 text-md">{user.firstname + " " + user.lastname}</span>
                                                        <button
                                                            className="w-[80px] h-[30px] ml-5 bg-red-200 text-black text-xs font-bold rounded-full hover:bg-gray-200">
                                                            Đăng ký
                                                        </button>
                                                        <div className="text-right ml-auto">
                                                            <ul className="flex">

                                                                {filteredCategories
                                                                    .filter((category) => category.id === video.id_category)
                                                                    .map((category) => (
                                                                        <li className="mr-4 text-blue-800 text-xl font-bold">
                                                                            <button
                                                                                className="min-w-[150px] max-w-[150px] h-[50px] bg-gray-200 rounded-full hover:bg-gray-200"
                                                                            >
                                                                                {category.name}
                                                                            </button>
                                                                        </li>

                                                                    ))}

                                                                <li className="mr-4">
                                                                    <button className="w-[50px] h-[50px] bg-gray-100 rounded-full hover:bg-gray-200 " title='Yêu thích'>
                                                                        <FavoriteRoundedIcon />
                                                                    </button>
                                                                </li>

                                                                <li className="mr-4">
                                                                    <button className="w-[50px] h-[50px] bg-gray-100 rounded-full hover:bg-gray-200" title='Bình luận'>
                                                                        <CommentRoundedIcon />
                                                                    </button>
                                                                </li>

                                                                <li className="mr-4">
                                                                    <button
                                                                        className="w-[50px] h-[50px] bg-gray-100 rounded-full hover:bg-gray-200 transform scale-x-[-1]">
                                                                        <ReplyIcon />
                                                                    </button>
                                                                </li>

                                                                <li className="">
                                                                    <button className="w-[50px] h-[50px] bg-gray-100 rounded-full hover:bg-gray-200" title='Báo cáo'>
                                                                        <FlagIcon />
                                                                    </button>
                                                                </li>

                                                            </ul>

                                                        </div>
                                                    </div>
                                                ))}
                                        </div>
                                    </div>
                                </div>

                            </div>

                            {/* <CommentPage /> */}
                        </div>
                    ))}
                </div>
            </div>
        );

    } else { // Giao diện trang quản lý trưởng nhóm 02
        return (
            <div>

                <div className="fixed top-0 left-0 w-full h-[65px] bg-white shadow z-50">
                    <div className="text-center mt-2 ml-8">
                        <b className="text-3xl ml-8 text-blue-800">Trang Quản Lý Trưởng - Nội Dung Video Theo Danh Mục</b>
                        <div className="float-right mr-4">
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
                        </div>
                    </div>
                </div>

                {/* Nội dung */}
                <div className="w-full h-full overflow-auto bg-white mt-[70px]">
                    {videosStatus03.map((video, index) => (
                        <div className="flex justify-center items-center" key={index}>
                            <div className="flex flex-wrap justify-center items-center mb-8">
                                <div className="min-w-[1000px] min-h-[675px] max-w-[1000px] max-h-[675px] bg-white rouder-xl flex justify-center rounded-2xl border shadow">
                                    <div className="overflow-hidden" >

                                        <div className="mt-5" >
                                            <ReactPlayer
                                                url={video.url_video}
                                                width="960px"
                                                height="540px"
                                                controls
                                                allowFullScreen={true}
                                                loading="lazy"
                                                preload="true"
                                            />
                                        </div>
                                        <div className="mt-2 w-full h-full">
                                            <h1 className="font-bold text-xl">{video.title}</h1>
                                            {filteredUsers03
                                                .filter((user) => user.id === video.id_user)
                                                .map((user) => (
                                                    <div key={user.id} className="flex items-center mt-3">

                                                        <Avatar
                                                            alt="Remy Sharp"
                                                            src={user.avatar}
                                                            sx={{ width: 50, height: 50 }}
                                                        />
                                                        <span className="ml-2 text-md">{user.firstname + " " + user.lastname}</span>
                                                        <button
                                                            className="w-[80px] h-[30px] ml-5 bg-red-200 text-black text-xs font-bold rounded-full hover:bg-gray-200">
                                                            Đăng ký
                                                        </button>
                                                        <div className="text-right ml-auto">
                                                            <ul className="flex">

                                                                {filteredCategories
                                                                    .filter((category) => category.id === video.id_category)
                                                                    .map((category) => (
                                                                        <li className="mr-4 text-blue-800 text-xl font-bold">
                                                                            <button
                                                                                className="min-w-[150px] max-w-[150px] h-[50px] bg-gray-200 rounded-full hover:bg-gray-200"
                                                                            >
                                                                                {category.name}
                                                                            </button>
                                                                        </li>

                                                                    ))}

                                                                <li className="mr-4">
                                                                    <button className="w-[50px] h-[50px] bg-gray-100 rounded-full hover:bg-gray-200 " title='Yêu thích'>
                                                                        <FavoriteRoundedIcon />
                                                                    </button>
                                                                </li>

                                                                <li className="mr-4">
                                                                    <button className="w-[50px] h-[50px] bg-gray-100 rounded-full hover:bg-gray-200" title='Bình luận'>
                                                                        <CommentRoundedIcon />
                                                                    </button>
                                                                </li>

                                                                <li className="mr-4">
                                                                    <button
                                                                        className="w-[50px] h-[50px] bg-gray-100 rounded-full hover:bg-gray-200 transform scale-x-[-1]">
                                                                        <ReplyIcon />
                                                                    </button>
                                                                </li>

                                                                <li className="">
                                                                    <button className="w-[50px] h-[50px] bg-gray-100 rounded-full hover:bg-gray-200" title='Báo cáo'>
                                                                        <FlagIcon />
                                                                    </button>
                                                                </li>

                                                            </ul>

                                                        </div>
                                                    </div>
                                                ))}
                                        </div>
                                    </div>
                                </div>

                            </div>

                            {/* <CommentPage /> */}
                        </div>
                    ))}
                </div>
            </div>
        );
    }
};

export default StaffGroup02Page;
