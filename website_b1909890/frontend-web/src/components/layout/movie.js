import React, { useEffect, useState } from 'react';
import ReactPlayer from 'react-player/lazy';
import axios from 'axios';

const MoviePage = () => {
    const [videos, setVideos] = useState([]);

    useEffect(() => {
        axios
            .get('http://localhost:5000/api/videos')
            .then((response) => {
                const videosData = response.data;
                setVideos(videosData);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    return (
        <div className="w-full h-full overflow-auto bg-gray-100">
            {videos.map((video, index) => (
                <div key={index} className="flex flex-wrap justify-center items-center h-screen">

                    <div className="min-w-[1000px] min-h-[625px] max-w-[1000px] max-h-[625px] bg-white rouder-xl flex justify-center rounded-xl">
                        <div className="overflow-hidden " >   {/* */}
                            <div className="mt-5 ">
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
                            <div className="mt-2 mb-2">
                                <span>{video.title}</span>
                            </div>

                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default MoviePage;