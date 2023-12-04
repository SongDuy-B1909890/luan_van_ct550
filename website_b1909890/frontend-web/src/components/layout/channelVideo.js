import React, { useEffect, useState, useRef } from 'react';
import ReactPlayer from 'react-player/lazy';
import axios from 'axios';

import Avatar from '@mui/material/Avatar';
import HeaderPage from './header';
import SkeletonChildrenDemo from './skeletonChildrenDemo';

const id_channel = localStorage.getItem('id_channel');

const ChannelVideoPage = () => {
    const [videos, setVideos] = useState([]);

    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);

    const [isLoading, setIsLoading] = useState(false);
    useEffect(() => {

        axios.get('http://localhost:5000/api/acceptedVideos')
            .then((videosResponse) => {
                const videosData = videosResponse.data;
                const channelVideos = videosData.filter((video) => video.id_user === id_channel);
                setVideos(channelVideos);
                setIsLoading(true);
                //console.log(categoryVideos);
            })
            .catch((error) => {
                console.error(error);
            })

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

    const [currentPlayingVideo, setCurrentPlayingVideo] = useState(null);
    const playerRef = useRef(null);

    const handleVideoPlay = (cloudinaryId) => {
        if (currentPlayingVideo && currentPlayingVideo !== cloudinaryId) {
            const previousPlayer = playerRef.current;
            if (previousPlayer) {
                previousPlayer.pause();
            }
        }
        setCurrentPlayingVideo(cloudinaryId);
    };

    return (
        <div>
            <HeaderPage />
            <div className="w-full h-full overflow-auto bg-white mt-[70px]">
                {
                    videos.length === 0 ? (
                        <React.Fragment>
                            {isLoading ? (
                                <div className="w-full h-screen flex items-center justify-center ">
                                    <div>
                                        <h1 className="text-2xl text-gray-500">Danh mục không có nội dung phù hợp</h1>
                                    </div>
                                </div>
                            ) : (
                                <div className="w-full h-screen flex justify-center">
                                    <SkeletonChildrenDemo />
                                </div>
                            )}
                        </React.Fragment>
                    ) : (
                        videos.map((video, index) => (
                            <div key={index} className="flex justify-center items-center" >
                                <div className="flex flex-wrap justify-center items-center mb-8">
                                    <div className="w-full h-full px-5 bg-white rouder-xl flex justify-center rounded-2xl border shadow">
                                        <div className="overflow-hidden" >

                                            <div className="mt-2 mb-2" >
                                                <ReactPlayer
                                                    id={video.cloudinary_id}
                                                    url={video.url_video}
                                                    width="300px"
                                                    height="170px"
                                                    controls={true}
                                                    allowFullScreen={true}
                                                    loading="lazy"
                                                    preload="true"
                                                    loop={true} // Tự động lặp lại video
                                                    playing={currentPlayingVideo === video.cloudinary_id}
                                                    onPlay={() => handleVideoPlay(video.cloudinary_id)}
                                                />
                                            </div>
                                            <div className="mt-2 w-full h-full">
                                                <h1 className="font-bold text-xl overflow-hidden line-clamp-1 mr-5 text-blue-900">{video.title} </h1>
                                                {filteredUsers
                                                    .filter((user) => user.id === video.id_user)
                                                    .map((user) => (
                                                        <div key={user.id} className="flex items-center mt-2">

                                                            <div className="flex items-center">
                                                                <Avatar
                                                                    alt="Remy Sharp"
                                                                    src={user.avatar}
                                                                    sx={{ width: 50, height: 50 }}
                                                                />
                                                                <span className="ml-2 font-bold max-w-[180px] text-blue-900 overflow-hidden line-clamp-1">{user.firstname + " " + user.lastname}</span>
                                                            </div>

                                                        </div>
                                                    ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    )
                }
            </div>
        </div>
    );
};

export default ChannelVideoPage;