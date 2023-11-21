import React, { useEffect, useState, useRef } from 'react';
import ReactPlayer from 'react-player/lazy';
import axios from 'axios';
import { useFormik } from "formik"

import Avatar from '@mui/material/Avatar';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import FavoriteBorderRoundedIcon from '@mui/icons-material/FavoriteBorderRounded';
import InsertCommentOutlinedIcon from '@mui/icons-material/InsertCommentOutlined';
import ReplyIcon from '@mui/icons-material/Reply';
import DeleteIcon from '@mui/icons-material/Delete';

import HeaderPage from './header';
import CommentPage from './comment';
import DescriptionPage from './description';

const userString = localStorage.getItem('user');
const user = userString ? JSON.parse(userString) : null;

const MyChannel = () => {

    const [videos, setVideos] = useState([]);

    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);

    const [categories, setCategories] = useState([]);
    const [filteredCategories, setFilteredCategories] = useState([]);

    const [reloadFavorites, setReloadFavorites] = useState(false);
    const [reloadDeleteVideos, setReloadDeleteVideos] = useState(false);
    useEffect(() => {
        axios.get(`http://localhost:5000/api/favorites/${user.id}`)
            .then((favoritesResponse) => {
                const favoritesData = favoritesResponse.data;

                axios
                    .get('http://localhost:5000/api/acceptedVideos')
                    .then((videosResponse) => {
                        const videosData = videosResponse.data;

                        // Lọc danh sách video dựa trên id_videos và cloudinary_id và thêm isFavorite vào dữ liệu video
                        const filteredVideos = videosData.map((video) => {
                            const isFavorite = favoritesData.some((favorite) =>
                                favorite.id_videos &&
                                Array.isArray(favorite.id_videos) &&
                                favorite.id_videos.includes(video.cloudinary_id)
                            );
                            return {
                                ...video,
                                isFavorite: isFavorite
                            };
                        });
                        // Chỉ hiển thị những video có isFavorite === true
                        const favoriteVideos = filteredVideos.filter((video) => video.id_user === user.id);
                        // Sử dụng danh sách video đã lọc
                        //console.log(favoriteVideos);
                        setVideos(favoriteVideos);

                    })
                    .catch((error) => {
                        console.error(error);
                    })
                    .finally(() => {
                        setReloadFavorites(false); // Đặt lại giá trị reloadFavorites thành false sau khi tải xong
                        setReloadDeleteVideos(false);
                    });
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
    }, [reloadFavorites, reloadDeleteVideos]);

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

    const [isSelectVideoDescription, setIsSelectVideoDescription] = useState(null);
    const [isSelectVideoComment, setIsSelectVideoComment] = useState(null);

    const [isDescriptionModal, setIsDescriptionModal] = useState(false);
    const [isCommentModal, setIsCommentModal] = useState(false);

    const DescriptionModal = (videoId) => {

        if (isDescriptionModal === false) {
            //console.log(videoId);
            setIsSelectVideoDescription(videoId);
            setIsDescriptionModal(true);
            setIsCommentModal(false);
        }
        if (isDescriptionModal === true) {
            //  console.log(videoId);
            setIsSelectVideoDescription(videoId);
            setIsDescriptionModal(true);
            setIsCommentModal(false);
        }
        if (isDescriptionModal === true && isSelectVideoDescription === videoId) {
            //console.log(videoId);
            setIsSelectVideoDescription(null);
            setIsDescriptionModal(false);
        }
    };

    const CommentModal = (videoId) => {

        if (isCommentModal === false) {
            //console.log(videoId);
            setIsSelectVideoComment(videoId);
            setIsCommentModal(true);
            setIsDescriptionModal(false);
        }
        if (isCommentModal === true) {
            //  console.log(videoId);
            setIsSelectVideoComment(videoId);
            setIsCommentModal(true);
            setIsDescriptionModal(false);
        }
        if (isCommentModal === true && isSelectVideoComment === videoId) {
            //console.log(videoId);
            setIsSelectVideoComment(null);
            setIsCommentModal(false);
        }
    };

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

    const [favorites, setFavorites] = useState(false);

    const handleFavoriteClick = (videoId, favorite) => {
        formik.setValues({
            id: user.id,
            id_video: videoId,
        });
        formik.handleSubmit();
        setFavorites(favorite);
    };

    const formik = useFormik({
        initialValues: {
            id: '',
            id_video: '',
        },
        onSubmit: (values) => {

            if (favorites !== true) {
                axios
                    .post('http://localhost:5000/api/createFavorite', values)
                    .then((response) => {
                        // console.log(response.data);
                        setReloadFavorites(true); // Kích hoạt việc tải lại danh sách bình luận

                    })
                    .catch((error) => {
                        console.error(error);
                    });
            } else {
                axios
                    .delete('http://localhost:5000/api/deleteFavorite', { data: values })
                    .then((response) => {
                        // console.log(response.data);
                        setReloadFavorites(true); // Kích hoạt việc tải lại danh sách bình luận

                    })
                    .catch((error) => {
                        console.error(error);
                    });
            }

        }

    });

    const handleDeleteVideoClick = (videoId) => {
        formik01.setValues({
            cloudinary_id: videoId,
        });
        formik01.handleSubmit();
    };

    const formik01 = useFormik({
        initialValues: {
            cloudinary_id: '',
        },
        onSubmit: (values) => {
            axios
                .delete('http://localhost:5000/api/deleteVideo', { data: values })
                .then((response) => {
                    // console.log(response.data);
                    setReloadDeleteVideos(true);

                })
                .catch((error) => {
                    console.error(error);
                });
        }
    });

    return (
        <div>
            <HeaderPage />
            <div className="w-full h-full overflow-auto bg-white mt-[70px]">
                {videos.map((video, index) => (
                    <div key={index} className="flex justify-center items-center" >
                        <div className="flex flex-wrap justify-center items-center mb-8">
                            <div className="min-w-[1000px] min-h-[675px] max-w-[1000px] max-h-[675px] px-5 bg-white rouder-xl flex justify-center rounded-2xl border shadow">
                                <div className="overflow-hidden" >

                                    <div className="mt-5" >
                                        <ReactPlayer
                                            id={video.cloudinary_id}
                                            url={video.url_video}
                                            width="960px"
                                            height="540px"
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

                                                    <Avatar
                                                        alt="Remy Sharp"
                                                        src={user.avatar}
                                                        sx={{ width: 50, height: 50 }}
                                                    />
                                                    <span className="ml-2 font-bold max-w-[180px] text-blue-900 overflow-hidden line-clamp-1">{user.firstname + " " + user.lastname}</span>

                                                    <div className="text-right ml-auto">
                                                        <ul className="flex">
                                                            {filteredCategories
                                                                .filter((category) => category.id === video.id_category)
                                                                .map((category) => (
                                                                    <li
                                                                        key={category.id}
                                                                        className="mr-4 text-blue-900 text-xl font-bold"
                                                                        onClick={() => DescriptionModal(video.cloudinary_id)}

                                                                    >
                                                                        <button
                                                                            className="min-w-[125px] max-w-[125px] h-[50px] bg-gray-100 rounded-full hover:bg-gray-200"
                                                                        >
                                                                            {category.name}
                                                                        </button>
                                                                    </li>

                                                                ))}

                                                            {video.isFavorite === true ? (
                                                                <li className="mr-4 text-red-500" onSubmit={formik.handleSubmit}>
                                                                    <button
                                                                        type="submit"
                                                                        className="w-[50px] h-[50px] bg-gray-100 rounded-full hover:bg-gray-200"
                                                                        title="Yêu thích"
                                                                        onClick={() => handleFavoriteClick(video.cloudinary_id, video.isFavorite)}
                                                                    >
                                                                        <FavoriteRoundedIcon />
                                                                    </button>
                                                                </li>
                                                            ) : (
                                                                <li className="mr-4" onSubmit={formik.handleSubmit}>
                                                                    <button
                                                                        type="submit"
                                                                        className="w-[50px] h-[50px] bg-gray-100 rounded-full hover:bg-gray-200"
                                                                        title="Yêu thích"
                                                                        onClick={() => handleFavoriteClick(video.cloudinary_id, video.isFavorite)}
                                                                    >
                                                                        <FavoriteBorderRoundedIcon />
                                                                    </button>
                                                                </li>
                                                            )}

                                                            <li
                                                                className="mr-4"
                                                            >
                                                                <button
                                                                    className="w-[50px] h-[50px] bg-gray-100 rounded-full hover:bg-gray-200"
                                                                    title='Bình luận'
                                                                    onClick={() => CommentModal(video.cloudinary_id)}
                                                                >
                                                                    <InsertCommentOutlinedIcon />
                                                                </button>

                                                            </li>

                                                            <li
                                                                className="mr-4"
                                                            >
                                                                <button
                                                                    className="w-[50px] h-[50px] bg-gray-100 rounded-full hover:bg-gray-200 transform scale-x-[-1]"
                                                                >
                                                                    <ReplyIcon />
                                                                </button>
                                                            </li>

                                                            <li
                                                                className="mr-auto text-white"
                                                                onSubmit={formik.handleSubmit}
                                                            >
                                                                <button
                                                                    type="submit"
                                                                    className="w-[50px] h-[50px] bg-yellow-600 rounded-full hover:bg-yellow-600 transform scale-x-[-1]"
                                                                    onClick={() => handleDeleteVideoClick(video.cloudinary_id)}
                                                                >
                                                                    <DeleteIcon />
                                                                </button>
                                                            </li>

                                                        </ul>

                                                    </div>
                                                </div>
                                            ))}
                                    </div>
                                </div>
                            </div>
                            {isSelectVideoDescription === video.cloudinary_id && isDescriptionModal && <DescriptionPage value={video.description} />}
                            {isSelectVideoComment === video.cloudinary_id && isCommentModal && <CommentPage value={video.cloudinary_id} />}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MyChannel;