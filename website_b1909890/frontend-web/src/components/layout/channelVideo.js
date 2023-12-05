import React, { useEffect, useState, useRef } from 'react';
import ReactPlayer from 'react-player/lazy';
import axios from 'axios';
import { useParams } from 'react-router-dom';

import Avatar from '@mui/material/Avatar';
import HeaderPage from './header';
import SkeletonChildrenDemo from './skeletonChildrenDemo';

const ChannelVideoPage = () => {
    const { channelId } = useParams();
    const str = channelId;
    const parts = str.split("-");
    const id = parts[parts.length - 1].trim();

    // console.log(`-${id}`); // Output: "-Ni2kLC_X99s1P_mEN3i"
    // console.log(name); // Output: "DươngHoàng"

    const [videos, setVideos] = useState([]);

    const [channel, setChannel] = useState([]);

    const [isLoading, setIsLoading] = useState(false);
    useEffect(() => {

        axios.get('http://localhost:5000/api/acceptedVideos')
            .then((videosResponse) => {
                const videosData = videosResponse.data;
                const channelVideos = videosData.filter((video) => video.id_user === `-${id}`);
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
                const channel = usersData.filter((user) => user.id === `-${id}`);
                setChannel(channel[0]);
                //console.log(channel[0].firstname);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

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
                        <div className=" ml-8 mr-8 ">
                            <div className="w-full h-[100px] border-b-2 mb-5 py-5">
                                <div className="flex items-center">
                                    <Avatar
                                        alt="Remy Sharp"
                                        src={channel.avatar}
                                        sx={{ width: 50, height: 50 }}
                                    />
                                    <span className="ml-2 font-bold max-w-[180px] text-blue-900 overflow-hidden line-clamp-1">{channel.firstname + " " + channel.lastname}</span>
                                </div>
                            </div>
                            <div className=" h-screen">
                                <div className="flex">
                                    {videos.map((video, index) => (
                                        <div
                                            className="w-[335px] h-[265px] col-span-1 border-2 rounded-lg ml-2 mr-2"
                                            key={index}
                                        >
                                            {/* Hiển thị nội dung video */}
                                            <div className="py-2 px-4">
                                                <div className=" mb-2">
                                                    <ReactPlayer
                                                        id={video.cloudinary_id}
                                                        url={video.url_video}
                                                        width="300px"
                                                        height="180px"
                                                        controls={true}
                                                        allowFullScreen={true}
                                                        loading="lazy"
                                                        preload="true"
                                                        loop={true}
                                                        playing={currentPlayingVideo === video.cloudinary_id}
                                                        onPlay={() => handleVideoPlay(video.cloudinary_id)}

                                                    />
                                                </div>
                                            </div>

                                            {/* Hiển thị tiêu đề video */}
                                            <div className="product-name overflow-hidden ml-4 mr-4 line-clamp-2 min-h-[50px]">
                                                {video.title}
                                            </div>
                                        </div>
                                    ))}
                                </div>

                            </div>
                        </div>
                    )
                }
            </div>
        </div>
    );
};

export default ChannelVideoPage;