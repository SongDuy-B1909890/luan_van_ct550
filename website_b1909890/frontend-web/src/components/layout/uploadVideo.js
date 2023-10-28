import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useFormik } from "formik"
import * as Yup from "yup"

const UploadVideoPage = () => {

    const validationSchema = Yup.object({
        title: Yup.string().required('Vui lòng nhập tên'),
        decription: Yup.string().required('Vui lòng nhập họ'),
        category: Yup.string().email('Địa chỉ email không hợp lệ').required('Vui lòng nhập email'),
    });

    const formik = useFormik({
        initialValues: {
            id_user: '',
            title: '',
            decription: '',
            category: '',
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            console.log(values);
            axios
                .post('http://localhost:5000/api/register', values)
                .then((response) => {
                    // Xử lý thành công
                    console.log(response.data);
                    // Hiển thị thông báo đăng ký thành công
                    alert('Đăng ký thành công')
                    window.location.href = '/';

                })
                .catch((error) => {
                    // Xử lý lỗi, ví dụ: hiển thị thông báo lỗi
                    console.error(error);
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
                            <form className="space-y-6" onSubmit={formik.handleSubmit}>

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
                                        htmlFor="decription"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        Mô tả
                                    </label>
                                    <div className="mt-1">
                                        <input
                                            id="decription"
                                            name="decription"
                                            type="address"
                                            autoComplete="decription"
                                            placeholder="Decription video"
                                            value={formik.values.decription}
                                            onChange={formik.handleChange} // Gọi hàm formik.handleChange khi giá trị thay đổi
                                            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        />
                                    </div>
                                    {formik.errors.decription && formik.touched.decription && <div>{formik.errors.decription}</div>}
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
                                            type="category"
                                            autoComplete="category"
                                            placeholder="my@gmail.com"
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
                                            id="video"
                                            name="video"
                                            type="file" // Thay đổi type thành "file" để cho phép tải tệp
                                            accept="video/*" // Chỉ chấp nhận các tệp video
                                            onChange={formik.handleChange} // Gọi hàm formik.handleChange khi giá trị thay đổi
                                            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        />
                                    </div>
                                    {formik.errors.video && formik.touched.video && <div>{formik.errors.video}</div>}
                                </div>

                                <div className="z-10">
                                    <button
                                        type="submit"
                                        className="group  w-full flex justify-center  py-2 px-4 border border-transparent text-sm font-medium rounded-md text-black bg-gray-200 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                    >
                                        Đăng ký
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