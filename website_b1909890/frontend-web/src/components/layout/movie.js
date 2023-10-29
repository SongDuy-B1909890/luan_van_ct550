import React, { useEffect, useState } from 'react';
import ReactPlayer from 'react-player/lazy';
import axios from 'axios';

const MoviePage = () => {
    const [videos, setVideos] = useState([]);
    useEffect(() => {
        // Gọi API để lấy danh sách video
        axios
            .get('http://localhost:5000/api/videos')
            .then((response) => {
                // Xử lý thành công
                const videosData = response.data;
                setVideos(videosData);
            })
            .catch((error) => {
                // Xử lý lỗi, ví dụ: hiển thị thông báo lỗi
                console.error(error);
            });
    }, []);

    return (
        <div className="w-full h-full overflow-auto bg-white">
            <div className="flex flex-wrap justify-center items-center mt-[105px]">
                {videos.map((video, index) => (
                    <div key={index} className="flex justify-center items-center">
                        <div className="mb-[45px] overflow-hidden" style={{ borderRadius: '10px' }}>
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
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MoviePage;