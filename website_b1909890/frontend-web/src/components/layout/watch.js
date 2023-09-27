import React, { useRef, useState, useCallback } from 'react';
import ReactPlayer from 'react-player/lazy';
import { InView } from 'react-intersection-observer';

const WatchPage = () => {

  const videoRefs = useRef([]);
  const videos = [
    { 
      id: 1,
      url: "https://www.youtube.com/watch?v=KxaX-eYPjQw",
    },
    { 
      id: 2,
      url: "https://www.youtube.com/watch?v=d1_JKFy_fIk",
    },
    { 
      id: 3,
      url: "https://www.youtube.com/watch?v=WSS6lnszkrc",
    },
    { 
      id: 4,
      url: "https://www.youtube.com/watch?v=KxaX-eYPjQw",
    },
    { 
      id: 5,
      url: "https://www.youtube.com/watch?v=d1_JKFy_fIk",
    },
    { 
      id: 6,
      url: "https://www.youtube.com/watch?v=WSS6lnszkrc",
    },
    { 
      id: 7,
      url: "https://www.youtube.com/watch?v=KxaX-eYPjQw",
    },
    { 
      id: 8,
      url: "https://www.youtube.com/watch?v=d1_JKFy_fIk",
    },
    { 
      id: 9,
      url: "https://www.youtube.com/watch?v=WSS6lnszkrc",
    },
    { 
      id: 10,
      url: "https://www.youtube.com/watch?v=KxaX-eYPjQw",
    },
    { 
      id: 11,
      url: "https://www.youtube.com/watch?v=d1_JKFy_fIk",
    },
    { 
      id: 12,
      url: "https://www.youtube.com/watch?v=WSS6lnszkrc",
    },
    { 
      id: 13,
      url: "https://www.youtube.com/watch?v=KxaX-eYPjQw",
    },
    { 
      id: 14,
      url: "https://www.youtube.com/watch?v=d1_JKFy_fIk",
    },
    { 
      id: 15,
      url: "https://www.youtube.com/watch?v=WSS6lnszkrc",
    },
    { 
      id: 16,
      url: "https://www.youtube.com/watch?v=KxaX-eYPjQw",
    },
    { 
      id: 17,
      url: "https://www.youtube.com/watch?v=d1_JKFy_fIk",
    },
    { 
      id: 18,
      url: "https://www.youtube.com/watch?v=WSS6lnszkrc",
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
  return (
    <div className="w-full h-full overflow-auto">
      <div className="flex flex-wrap justify-center items-center mt-[105px]">
        {videos.map((video) => (
          <div
            key={video.id}
            className="flex justify-center items-center mb-[45px] rounded-2xl overflow-hidden"
            
          >
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
              config={{
                youtube: {
                  playerVars: { showinfo: 1 },
                },
              }}
              loading="lazy"
              preload="true"
            />
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

