import React, { useEffect, useState } from 'react';
import ReactPlayer from 'react-player/lazy';
import axios from 'axios';

const MoviePage = () => {
    const [videos, setVideos] = useState([]);
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);

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
    }, []);

    useEffect(() => {
        // Lọc danh sách người dùng dựa trên id_user của video
        const filteredUsers = users.filter((user) =>
            videos.some((video) => video.id_user === user.id)
        );
        setFilteredUsers(filteredUsers);
    }, [videos, users]);

    return (
        <div className="w-full h-full overflow-auto bg-gray-100">
            {videos.map((video, index) => (
                <div key={index} className="flex flex-wrap justify-center items-center h-screen mt-6">
                    <div className="min-w-[1000px] min-h-[650px] max-w-[1000px] max-h-[650px] bg-white rouder-xl flex justify-center rounded-2xl shadow-md">
                        <div className="overflow-hidden">
                            <div className="mt-5">
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
                            <div className="mt-2 mb-2 min-h-[150px] max-h-[150px]">
                                <h1>{video.title}</h1>
                                {filteredUsers
                                    .filter((user) => user.id === video.id_user)
                                    .map((user) => (
                                        <div key={user.id}>
                                            <span>{user.lastname}</span>
                                            <span>{user.gender}</span>
                                            <span>{user.email}</span>
                                        </div>
                                    ))}
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default MoviePage;