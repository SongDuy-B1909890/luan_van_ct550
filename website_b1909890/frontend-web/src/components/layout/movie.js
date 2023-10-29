import React, { useEffect } from 'react';
import ReactPlayer from 'react-player/lazy';
import axios from 'axios';

const MoviePage = () => {
    useEffect(() => {
        // Gọi API để lấy danh sách video
        axios
            .get('http://localhost:5000/api/videos')
            .then((response) => {
                // Xử lý thành công
                //console.log(response.data);
                const videos = response.data;
                console.log(videos);
                // Lưu danh sách video vào localStorage
                // localStorage.setItem('videos', JSON.stringify(response.data));
                // console.log(localStorage.getItem('videos'));
            })
            .catch((error) => {
                // Xử lý lỗi, ví dụ: hiển thị thông báo lỗi
                console.error(error);
            });
    }, []);

    return (
        <div className="w-full h-full overflow-auto bg-white ">

            <div className="flex flex-wrap justify-center items-center mt-[105px]">
                <div
                    className="flex justify-center items-center"
                >
                    <div className=" mb-[45px] overflow-hidden"
                        style={{ borderRadius: '10px' }}
                    >
                        <ReactPlayer
                            url="http://res.cloudinary.com/davybpzph/video/upload/v1698206529/video/d0drwiyaeqrejykplqxr.mp4"
                            width="960px"
                            height="540px"
                            controls
                            allowFullScreen={true}
                            loading="lazy"
                            preload="true"
                        />
                    </div>

                </div>


            </div>

        </div>
    );
};

export default MoviePage;