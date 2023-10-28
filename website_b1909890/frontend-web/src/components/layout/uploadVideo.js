import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useFormik } from "formik"
import * as Yup from "yup"

const userString = localStorage.getItem('user');
const user = userString ? JSON.parse(userString) : null;

const UploadVideoPage = () => {

    const validationSchema = Yup.object({
        title: Yup.string().required('Vui lòng nhập tiêu đề'),
        description: Yup.string().required('Vui lòng nhập mô tả'),
        category: Yup.string().required('Vui lòng nhập email'),
    });

    const formik = useFormik({
        initialValues: {
            id_user: user.id,
            title: '',
            description: '',
            category: '',
            file: null,
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            console.log(values);

            axios
                .post('http://localhost:5000/api/uploadVideo', values)
                .then((response) => {
                    // Xử lý thành công
                    console.log(response.data);
                    // Hiển thị thông báo đăng ký thành công
                    alert('Tải video lên thành công')
                    window.location.href = '/';

                })
                .catch((error) => {
                    if (error.response) {
                        // Xử lý lỗi trả về từ backend
                        const errorMessage = error.response.data.error;
                        formik.setErrors({ file: errorMessage });
                        console.error(errorMessage);
                    } else {
                        // Xử lý lỗi không nhận được phản hồi từ backend
                        const errorMessage = 'Đã xảy ra lỗi khi tải video lên';
                        formik.setErrors({ file: errorMessage });
                        console.error(errorMessage);
                    }
                });
        },
    })

    return (
        <>
            <div className="min-h-screen bg-gray-300 flex flex-col justify-center  py-12 sm:px-6 lg:px-8 fixed inset-0  bg-opacity-30 backdrop-blur-sm z-50  ">
                <div className="bg-white sm:mx-auto sm:rounded-lg sm:w-full sm:max-w-md mt-8 mb-28">
                    <div className=" py-8 px-4 shadow sm:rounded-lg sm:px-10">

                        <div className="sm:mx-auto sm:w-full sm:max-w-md mb-6">
                            <h2 className=" text-center text-3xl font-extrabold text-gray-900">
                                Tải video
                            </h2>
                            <p className="mt-2 text-center text-sm text-gray-600">
                                <Link
                                    className="font-medium text-indigo-600 hover:text-indigo-500 text-red-300"
                                    to="/"
                                >
                                    <b>Quay lại</b>
                                </Link>
                            </p>
                        </div>


                        <div>
                            <form className="space-y-6" onSubmit={formik.handleSubmit} encType="multipart/form-data">

                                <div>
                                    <label
                                        htmlFor="title"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        Tiêu đề
                                    </label>
                                    <div className="mt-1">
                                        <input
                                            id="title"
                                            name="title"
                                            type="text"
                                            autoComplete="title"
                                            placeholder="Title video"
                                            value={formik.values.title} // Đặt giá trị của input từ state user
                                            onChange={formik.handleChange} // Gọi hàm formik.handleChange khi giá trị thay đổi
                                            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        />
                                    </div>
                                    {formik.errors.title && formik.touched.title && <div>{formik.errors.title}</div>}
                                </div>

                                <div>
                                    <label
                                        htmlFor="description"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        Mô tả
                                    </label>
                                    <div className="mt-1">
                                        <input
                                            id="description"
                                            name="description"
                                            type="address"
                                            autoComplete="description"
                                            placeholder="description video"
                                            value={formik.values.description}
                                            onChange={formik.handleChange} // Gọi hàm formik.handleChange khi giá trị thay đổi
                                            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        />
                                    </div>
                                    {formik.errors.description && formik.touched.description && <div>{formik.errors.description}</div>}
                                </div>

                                <div>
                                    <label
                                        htmlFor="category"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        Danh mục
                                    </label>
                                    <div className="mt-1">
                                        <input
                                            id="category"
                                            name="category"
                                            type="text"
                                            autoComplete="category"
                                            placeholder=""
                                            value={formik.values.category}
                                            onChange={formik.handleChange} // Gọi hàm formik.handleChange khi giá trị thay đổi
                                            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        />

                                    </div>
                                    {formik.errors.category && formik.touched.category && <div>{formik.errors.category}</div>}
                                </div>

                                <div>
                                    <label htmlFor="video" className="block text-sm font-medium text-gray-700">
                                        Video
                                    </label>
                                    <div className="mt-1">
                                        <input
                                            id="file"
                                            name="file"
                                            type="file" // Thay đổi type thành "file" để cho phép tải tệp
                                            accept="video/*" // Chỉ chấp nhận các tệp video
                                            onChange={(event) => {
                                                formik.setFieldValue("file", event.currentTarget.files[0]);
                                                console.log(event.currentTarget.files[0]); // Console.log giá trị của trường file
                                            }}
                                            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        />
                                    </div>
                                    {formik.errors.file && formik.touched.file && (
                                        <div className="text-red-500">{formik.errors.file}</div>
                                    )}
                                </div>

                                <div className="z-10">
                                    <button
                                        type="submit"
                                        className="group  w-full flex justify-center  py-2 px-4 border border-transparent text-sm font-medium rounded-md text-black bg-gray-200 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                    >
                                        Tải video
                                    </button>
                                </div>

                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>

    );

};



export default UploadVideoPage;