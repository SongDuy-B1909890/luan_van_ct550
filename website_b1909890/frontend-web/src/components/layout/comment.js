import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useFormik } from "formik"

import Avatar from '@mui/material/Avatar';

import '../../index.css';

const userString = localStorage.getItem('user');
const user = userString ? JSON.parse(userString) : null;

const CommentPage = (props) => {

    const [comments, setComments] = useState([]);
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [reloadComments, setReloadComments] = useState(false);

    useEffect(() => {
        axios
            .get('http://localhost:5000/api/comments')
            .then((response) => {
                const commentsData = response.data;

                // Giao đoạn nhân viên sơ tuyển
                const videosComment = commentsData.filter((comment) => comment.id_video === props.value);
                setComments(videosComment);
                console.log(videosComment);
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

    }, [props.value, reloadComments]);

    // Bình luận

    useEffect(() => {
        // Lọc danh sách người dùng dựa trên id_user của video
        const filteredUsers = users.filter((user) =>
            comments.some((comment) => comment.id_user === user.id)
        );

        setFilteredUsers(filteredUsers);

    }, [comments, users]);


    const formik = useFormik({
        initialValues: {
            id_video: props.value,
            id_user: user.id,
            content: '',
        },
        onSubmit: (values) => {
            console.log(values);
            axios
                .post('http://localhost:5000/api/createComment', values)
                .then((response) => {
                    console.log(response.data);
                    formik.resetForm();
                    setReloadComments(true); // Kích hoạt việc tải lại danh sách bình luận
                })
                .catch((error) => {
                    console.error(error);
                });
        },
    })

    const handleCancel = () => {
        formik.resetForm(); // Đặt lại giá trị của form về giá trị ban đầu
    };

    return (
        <div className="flex w-[450px] h-[675px] py-5 bg-white rounded-xl border shadow overflow-auto ">
            <div className="w-full h-full custom-scrollbar-content custom-scrollbar ml-5 mr-5">
                <div className="box-container">
                    {
                        comments.map((comment, index) => (
                            <div
                                key={index}
                                className="box w-full h-full custom-scrollbar-content custom-scrollbar"
                            >

                                {comment.content}
                                {
                                    filteredUsers
                                        .filter((user) => user.id === comment.id_user)
                                        .map((user) => (
                                            <div key={user.id} className="flex items-center mt-3">
                                                <Avatar
                                                    alt="Remy Sharp"
                                                    src={user.avatar}
                                                    sx={{ width: 50, height: 50 }}
                                                />
                                            </div>
                                        ))
                                }
                            </div>
                        ))
                    }

                    {/* Phần nhập bình luận */}
                    <div
                        className="box w-full float-bottom"
                    >
                        <form
                            className="w-full"
                            onSubmit={formik.handleSubmit}
                        >
                            <textarea
                                id="content"
                                name="content"
                                type="text"
                                rows={5}
                                cols={50}
                                className="w-full py-2 px-2 border-2"
                                placeholder="Nhập bình luận của bạn..."
                                value={formik.values.content} // Đặt giá trị của input từ state user
                                onChange={formik.handleChange} // Gọi hàm formik.handleChange khi giá trị thay đổi

                            />

                            <button
                                type="submit"
                                className="float-right bg-blue-500 w-[100px] h-[35px] rounded-full"
                            >
                                Bình luận
                            </button>

                            <button
                                type="button"
                                onClick={handleCancel}
                                className="float-right bg-white hover:bg-gray-100 w-[50px] h-[35px] rounded-full mr-2"
                            >
                                Hủy
                            </button>

                        </form>
                    </div>
                </div>
            </div>
        </div >
    );
};
export default CommentPage;