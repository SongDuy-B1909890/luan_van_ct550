import React, { useRef, useState, useCallback } from 'react';
import ReactPlayer from 'react-player/lazy';
import { InView } from 'react-intersection-observer';

import CommentRoundedIcon from '@mui/icons-material/CommentRounded';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import ReplyIcon from '@mui/icons-material/Reply';
//import FlagIcon from '@mui/icons-material/Flag';
import Avatar from '@mui/material/Avatar';
import StarsIcon from '@mui/icons-material/Stars';
//import DeleteIcon from '@mui/icons-material/Delete';

import CommentPage from './comment';
import '../../index.css';
const WatchPage = () => {

  const videoRefs = useRef([]);
  const videos = [
    {
      id: 1,
      url: "http://res.cloudinary.com/davybpzph/video/upload/v1698206529/video/d0drwiyaeqrejykplqxr.mp4",
    },
    {
      id: 2,
      url: "http://res.cloudinary.com/davybpzph/video/upload/v1698206529/video/d0drwiyaeqrejykplqxr.mp4",
    },
    {
      id: 3,
      url: "http://res.cloudinary.com/davybpzph/video/upload/v1698206529/video/d0drwiyaeqrejykplqxr.mp4",
    },
    {
      id: 4,
      url: "http://res.cloudinary.com/davybpzph/video/upload/v1698206529/video/d0drwiyaeqrejykplqxr.mp4",
    },
    {
      id: 5,
      url: "http://res.cloudinary.com/davybpzph/video/upload/v1698206529/video/d0drwiyaeqrejykplqxr.mp4",
    },
    {
      id: 6,
      url: "http://res.cloudinary.com/davybpzph/video/upload/v1698206529/video/d0drwiyaeqrejykplqxr.mp4",
    },
    {
      id: 7,
      url: "http://res.cloudinary.com/davybpzph/video/upload/v1698206529/video/d0drwiyaeqrejykplqxr.mp4",
    },
    {
      id: 8,
      url: "http://res.cloudinary.com/davybpzph/video/upload/v1698206529/video/d0drwiyaeqrejykplqxr.mp4",
    },
    {
      id: 9,
      url: "http://res.cloudinary.com/davybpzph/video/upload/v1698206529/video/d0drwiyaeqrejykplqxr.mp4",
    },
    {
      id: 10,
      url: "http://res.cloudinary.com/davybpzph/video/upload/v1698206529/video/d0drwiyaeqrejykplqxr.mp4",
    },
    {
      id: 11,
      url: "http://res.cloudinary.com/davybpzph/video/upload/v1698206529/video/d0drwiyaeqrejykplqxr.mp4",
    },
    {
      id: 12,
      url: "http://res.cloudinary.com/davybpzph/video/upload/v1698206529/video/d0drwiyaeqrejykplqxr.mp4",
    },
    {
      id: 13,
      url: "http://res.cloudinary.com/davybpzph/video/upload/v1698206529/video/d0drwiyaeqrejykplqxr.mp4",
    },
    {
      id: 14,
      url: "http://res.cloudinary.com/davybpzph/video/upload/v1698206529/video/d0drwiyaeqrejykplqxr.mp4",
    },
    {
      id: 15,
      url: "http://res.cloudinary.com/davybpzph/video/upload/v1698206529/video/d0drwiyaeqrejykplqxr.mp4",
    },
    {
      id: 16,
      url: "http://res.cloudinary.com/davybpzph/video/upload/v1698206529/video/d0drwiyaeqrejykplqxr.mp4",
    },
    {
      id: 17,
      url: "http://res.cloudinary.com/davybpzph/video/upload/v1698206529/video/d0drwiyaeqrejykplqxr.mp4",
    },
    {
      id: 18,
      url: "http://res.cloudinary.com/davybpzph/video/upload/v1698206529/video/d0drwiyaeqrejykplqxr.mp4",
    },
  ];
  const [playingVideos, setPlayingVideos] = useState([]);
  const handleVideoChange = useCallback((videoId) => {
    if (playingVideos.includes(videoId)) {
      setPlayingVideos([]);
    } else {
      // Tạm dừng tất cả các video
      const pausePromises = videoRefs.current.map((ref) => {
        if (ref.current && ref.current.dataset.id !== videoId && ref.current.getCurrentTime() > 0 && !ref.current.ended && !ref.current.paused) {
          return ref.current.pause();
        }
        return Promise.resolve();
      });
      Promise.all(pausePromises).then(() => {
        // Trở về điểm bắt đầu của tất cả các video
        videoRefs.current.forEach((ref) => {
          if (ref.current && ref.current.dataset.id !== videoId) {
            ref.current.seekTo(0);
          }
        });
        // Phát video mới
        setPlayingVideos([videoId]);
      });
    }
  }, [playingVideos]);

  const handleIntersection = useCallback(
    (entries) => {
      if (Array.isArray(entries)) {
        entries.forEach((entry) => {
          const videoId = entry.target.dataset.id;
          const isPlaying = playingVideos.includes(videoId);
          const videoRef = videoRefs.current.find(
            (ref) => ref.current.dataset.id === videoId
          );

          if (entry.isIntersecting && !isPlaying) {
            videoRef.seekTo(0);
            videoRef.play(); // Bắt đầu phát video khi cuộn đến
            setPlayingVideos((prevPlayingVideos) => [
              ...prevPlayingVideos,
              videoId,
            ]);
          } else if (!entry.isIntersecting && isPlaying) {
            videoRef.pause();
            setPlayingVideos((prevPlayingVideos) =>
              prevPlayingVideos.filter((id) => id !== videoId)
            );
          }
        });
      }
    },
    [playingVideos]
  );

  const [isCommentModal, setIsCommentModal] = useState(false);

  // const openCommentModal = () => {
  //   setIsCommentModal(true);
  // };

  // const closeCommentModal = () => {
  //   if (isCommentModal===true) {
  //     setIsCommentModal(false);
  //   }
  // };

  const [CommentModalStates, setCommentModalStates] = useState({});

  const openCommentModal = (videoId) => {
    setIsCommentModal(true);
    setCommentModalStates((prevCommentModalStates) => ({
      ...prevCommentModalStates,
      [videoId]: true,
    }));
  };

  const closeCommentModal = (videoId) => {
    if (isCommentModal === true && CommentModalStates[videoId] === true) {
      // setIsCommentModal(false);
      setCommentModalStates((prevCommentModalStates) => ({
        ...prevCommentModalStates,
        [videoId]: false,
      }));
    }
  };

  return (
    <div className="w-full h-full overflow-auto bg-white ">

      <div className="flex flex-wrap justify-center items-center mt-[105px]">
        {videos.map((video) => (
          <div
            key={video.id}
            className="flex justify-center items-center"
          >
            <div className=" mb-[45px] rounded-xl overflow-hidden">
              <ReactPlayer
                ref={(ref) => (videoRefs.current[video.id] = ref)}
                data-id={video.id}
                url={video.url}
                playing={playingVideos.includes(video.id)}
                onPlay={() => handleVideoChange(video.id)}
                autoPlay={false}
                width="960px"
                height="540px"
                controls
                allowFullScreen={true}
                loading="lazy"
                preload="true"
              />
            </div>

            <div className=" flex justify-center ml-2">   {/* ml-2 */}
              <div
                className="h-[540px] w-[90px] mb-[45px] pr-2 bg-white rounded-xl shadow border border-gray-300">
                <ul className="ml-2 mt-10 ">

                  <li className="mb-12 text-center">
                    <button >
                      <Avatar
                        alt="Remy Sharp"
                        src="https://vapa.vn/wp-content/uploads/2022/12/hinh-nen-dep-ngau-nu-001.jpg"
                        sx={{ width: 50, height: 50 }}
                      />
                    </button>
                    <button
                      className="block w-[65px] h-[30px] ml-1 bg-red-200 text-black text-xs font-bold rounded-full hover:bg-gray-200">
                      Đăng ký
                    </button>
                    <span className="text-yellow-500">
                      {Array.from({ length: 3 }, (_, index) => (
                        <StarsIcon key={index} />
                      ))}
                    </span>

                  </li>

                  <li className="mb-3 text-center">
                    <button
                      className="w-[50px] h-[50px] bg-gray-100 rounded-full hover:bg-gray-200" title='Tích cực'>
                      <FavoriteRoundedIcon />
                    </button>
                    <span className="block">
                      200k
                    </span>
                  </li>

                  <li
                    className="mb-3 text-center"
                    onClick={() => closeCommentModal(video.id)}
                  >
                    <button
                      className="w-[50px] h-[50px] bg-gray-100 rounded-full hover:bg-gray-200"
                      onClick={() => openCommentModal(video.id)}
                    >
                      <CommentRoundedIcon />
                    </button>
                    <span className="block">
                      2k
                    </span>
                  </li>

                  <li className="mb-3 text-center ">
                    <button
                      className="w-[50px] h-[50px] bg-gray-100 rounded-full hover:bg-gray-200 transform scale-x-[-1]">
                      <ReplyIcon />
                    </button>
                    <span className="block">
                      2k
                    </span>

                  </li>

                </ul>
              </div>
              {/* Phần comment */}
              {isCommentModal && CommentModalStates[video.id] && (
                <CommentPage />
              )}
            </div>

          </div>

        ))}

      </div>

      {videoRefs.current.length > 0 && (
        <InView
          rootMargin="0px"
          threshold={0.5}
          onChange={handleIntersection}
        >
          {videos.map((video) => (
            <div
              key={video.id}
              data-id={video.id}
              ref={(ref) => (videoRefs.current[video.id] = ref)}
            />
          ))}
        </InView>
      )}
    </div>
  );
};

export default WatchPage;

