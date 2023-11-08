import React, { useEffect, useState } from 'react';
import ReactPlayer from 'react-player/lazy';
import axios from 'axios';

import Avatar from '@mui/material/Avatar';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import CommentRoundedIcon from '@mui/icons-material/CommentRounded';
import ReplyIcon from '@mui/icons-material/Reply';
import FlagIcon from '@mui/icons-material/Flag';

import CommentPage from './comment';

const VideoPage = () => {
    const [videos, setVideos] = useState([]);

    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);

    const [categories, setCategories] = useState([]);
    const [filteredCategories, setFilteredCategories] = useState([]);

    useEffect(() => {
        axios
            .get('http://localhost:5000/api/videos')
            .then((response) => {
                // console.log(response.data);
                const videosData = response.data;
                setVideos(videosData);
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

        // Lọc danh mục dựa trên id_category của video
        const filteredCategories = categories.filter((category) =>
            videos.some((video) => video.id_category === category.id)
        );
        setFilteredCategories(filteredCategories);
    }, [videos, users, categories]);

    const [isSelectVideo, setIsSelectVideo] = useState(null);
    const [isCommentModal, setIsCommentModal] = useState(false);
    const CommentModal = (videoId) => {

        if (isCommentModal === false) {
            //console.log(videoId);
            setIsSelectVideo(videoId);
            setIsCommentModal(true);
        }
        if (isCommentModal === true) {
            //  console.log(videoId);
            setIsSelectVideo(videoId);
            setIsCommentModal(true);
        }
        if (isCommentModal === true && isSelectVideo === videoId) {
            console.log(videoId);
            setIsSelectVideo(videoId);
            setIsCommentModal(false);
        }
    };

    return (
        <div className="w-full h-full overflow-auto bg-white mt-[70px]">
            {videos.map((video, index) => (
                <div key={index} className="flex justify-center items-center" >
                    <div className="flex flex-wrap justify-center items-center mb-8">
                        <div className="min-w-[1000px] min-h-[675px] max-w-[1000px] max-h-[675px] px-5 bg-white rouder-xl flex justify-center rounded-2xl border shadow">
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
                                    <h1 className="font-bold text-xl overflow-hidden line-clamp-1 mr-5 text-blue-900">{video.title}</h1>
                                    {filteredUsers
                                        .filter((user) => user.id === video.id_user)
                                        .map((user) => (
                                            <div key={user.id} className="flex items-center mt-3">

                                                <Avatar
                                                    alt="Remy Sharp"
                                                    src={user.avatar}
                                                    sx={{ width: 50, height: 50 }}
                                                />
                                                <span className="ml-2 font-bold max-w-[180px] overflow-hidden line-clamp-1">{user.firstname + " " + user.lastname}</span>
                                                <button
                                                    className="w-[100px] h-[35px] ml-3 bg-black text-white font-bold rounded-full hover:bg-gray-800">
                                                    Đăng ký
                                                </button>
                                                <div className="text-right ml-auto">
                                                    <ul className="flex">
                                                        {filteredCategories
                                                            .filter((category) => category.id === video.id_category)
                                                            .map((category) => (
                                                                <li key={category.id} className="mr-4 text-blue-900 text-xl font-bold">
                                                                    <button
                                                                        className="min-w-[125px] max-w-[125px] h-[50px] bg-gray-100 rounded-full hover:bg-gray-200"
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

                                                        <li
                                                            className="mr-4"
                                                            onClick={() => CommentModal(video.cloudinary_id)}
                                                        >
                                                            <button
                                                                className="w-[50px] h-[50px] bg-gray-100 rounded-full hover:bg-gray-200"
                                                                title='Bình luận'
                                                            >
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
                        {isSelectVideo === video.cloudinary_id && isCommentModal && <CommentPage />}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default VideoPage;