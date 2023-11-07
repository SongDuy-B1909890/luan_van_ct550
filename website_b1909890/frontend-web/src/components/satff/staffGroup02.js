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

    const [videos, setVideos] = useState([]);
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);

    useEffect(() => {
        axios
            .get('http://localhost:5000/api/videos')
            .then((response) => {
                // response.data.filter((video) => {
                //     if (video.status === "chờ xem xét") {
                //         setVideos((prevVideos) => [...prevVideos, video]);
                //         console.log(video);
                //     }
                // });

                const newVideos = response.data.filter(
                    (video) => video.status === 'chờ xem xét'
                );

                setVideos((prevVideos) => {
                    const updatedVideos = [...prevVideos];

                    newVideos.forEach((video) => {
                        if (!updatedVideos.some((prevVideo) => prevVideo.cloudinary_id === video.cloudinary_id)) {
                            updatedVideos.push(video);
                        }
                    });

                    return updatedVideos;
                });

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
    }, []);

    useEffect(() => {
        // Lọc danh sách người dùng dựa trên id_user của video
        const filteredUsers = users.filter((user) =>
            videos.some((video) => video.id_user === user.id)
        );
        setFilteredUsers(filteredUsers);
    }, [videos, users]);

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
                    {videos.map((video, index) => (
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
                                            {filteredUsers
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

    } if (staff.level === 2) { // Giao diện trang tổ phản biện nhóm 02
        return (
            <div>

                <div>
                    <div className="text-center mt-8 ml-8">
                        Trang Tổ Phản Biện Nhóm 02
                    </div>
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
                        {staff.id}
                    </div>
                </div>
                {/* Nội dung */}
                <div className="w-full h-full overflow-auto bg-white mt-[70px]">
                    {videos.map((video, index) => (
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
                                            {filteredUsers
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

                <div>
                    <div className="text-center mt-8 ml-8">
                        Trang Quản Lý Trưởng Nhóm 02
                    </div>
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
                        {staff.id}
                    </div>
                </div>

                {/* Nội dung */}
                <div className="w-full h-full overflow-auto bg-white mt-[70px]">
                    {videos.map((video, index) => (
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
                                            {filteredUsers
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
