import React, { useEffect, useState } from 'react';
import ReactPlayer from 'react-player/lazy';
import axios from 'axios';

import Avatar from '@mui/material/Avatar';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import CommentRoundedIcon from '@mui/icons-material/CommentRounded';
import ReplyIcon from '@mui/icons-material/Reply';
import FlagIcon from '@mui/icons-material/Flag';

import HeaderPage from './header';
// import CommentPage from './comment';
const id_category = localStorage.getItem('id_category');

const CategoryVideoPage = () => {
    const [videos, setVideos] = useState([]);
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);

    useEffect(() => {
        axios
            .get('http://localhost:5000/api/videos')
            .then((response) => {
                // console.log(response.data);
                const videosData = response.data;
                const filteredVideos = videosData.filter((video) => video.id_category === id_category);
                setVideos(filteredVideos);
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
            videos.some((video) => video.id_user === user.id && video.id_category === id_category)
        );
        setFilteredUsers(filteredUsers);
    }, [videos, users]);
    return (
        <div>
            <HeaderPage />
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
};

export default CategoryVideoPage;