import React from 'react';
import ReactPlayer from 'react-player/lazy';

const MoviePage = () => {
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