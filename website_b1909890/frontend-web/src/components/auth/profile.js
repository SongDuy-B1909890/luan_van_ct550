import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useFormik } from "formik"
import * as Yup from "yup"

const userString = localStorage.getItem('user');
const user = userString ? JSON.parse(userString) : null;

//console.log(user.gender);
// console.log(user);
const ProfilePage = () => {
    const validationSchema = Yup.object({
        firstname: Yup.string().required('Vui lòng nhập tên'),
        lastname: Yup.string().required('Vui lòng nhập họ'),
        avatar: Yup.string().required('Vui lòng nhập đường dẫn ảnh đại diện'),
        phone: Yup.string().required('Vui lòng nhập số điện thoại'),
        address: Yup.string().required('Vui lòng nhập địa chỉ'),
        gender: Yup.string().required('Vui lòng chọn giới tính'),
        birthday: Yup.string().required('Vui lòng nhập ngày tháng năm sinh'),

    });

    const formik = useFormik({
        initialValues: {
            id: user.id,
            firstname: '',
            lastname: '',
            avatar: '',
            phone: '',
            address: '',
            gender: '',
            birthday: '',
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            console.log(values);
            axios
                .put('http://localhost:5000/api/changeProfile', values)
                .then((response) => {
                    // Xử lý thành công
                    console.log(response.data);
                    // Hiển thị thông báo cập nhật thành công
                    alert('Cập nhật thành công')
                    localStorage.setItem('login', 'false');
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
                                Thông Tin Tài Khoản
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
                                <div className="flex">
                                    <div className="w-1/2 mr-2">
                                        <label
                                            htmlFor="firstname"
                                            className="block text-sm font-medium text-gray-700"
                                        >
                                            Họ
                                        </label>
                                        <div className="mt-1">
                                            <input
                                                id="firstname"
                                                name="firstname"
                                                type="text"
                                                autoComplete="firstname"
                                                placeholder={user.firstname}
                                                value={formik.values.firstname}
                                                // Đặt giá trị của input từ state user
                                                onChange={formik.handleChange} // Gọi hàm formik.handleChange khi giá trị thay đổi
                                                // required
                                                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                            />
                                        </div>
                                        {formik.errors.firstname && formik.touched.firstname && <div>{formik.errors.firstname}</div>}
                                    </div>

                                    <div className="w-1/2 mr-2">
                                        <label
                                            htmlFor="lastname"
                                            className="block text-sm font-medium text-gray-700"
                                        >
                                            Tên
                                        </label>
                                        <div className="mt-1">
                                            <input
                                                id="lastname"
                                                name="lastname"
                                                type="text"
                                                autoComplete="lastname"
                                                placeholder={user.lastname}
                                                value={formik.values.lastname}
                                                onChange={formik.handleChange} // Gọi hàm formik.handleChange khi giá trị thay đổi
                                                // required
                                                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                            />
                                        </div>
                                        {formik.errors.lastname && formik.touched.lastname && <div>{formik.errors.lastname}</div>}
                                    </div>
                                </div>

                                <div className="flex">
                                    <div className="w-1/2 mr-2">
                                        <label
                                            htmlFor="gender"
                                            className="block text-sm font-medium text-gray-700"
                                        >
                                            Giới tính
                                        </label>
                                        <div className="mt-1">
                                            <input
                                                id="gender"
                                                name="gender"
                                                type="gender"
                                                autoComplete="gender"
                                                placeholder={user.gender}
                                                value={formik.values.gender}
                                                onChange={formik.handleChange} // Gọi hàm formik.handleChange khi giá trị thay đổi
                                                // required
                                                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                            />
                                        </div>
                                        {formik.errors.gender && formik.touched.gender && <div>{formik.errors.gender}</div>}
                                    </div>

                                    <div className="w-1/2 mr-2">
                                        <label
                                            htmlFor="birthday"
                                            className="block text-sm font-medium text-gray-700"
                                        >
                                            Ngày sinh
                                        </label>
                                        <div className="mt-1">
                                            <input
                                                id="birthday"
                                                name="birthday"
                                                type="birthday"
                                                autoComplete="birthday"
                                                placeholder={user.birthday}
                                                value={formik.values.birthday}
                                                onChange={formik.handleChange} // Gọi hàm formik.handleChange khi giá trị thay đổi
                                                // required
                                                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                            />

                                        </div>
                                        {formik.errors.birthday && formik.touched.birthday && <div>{formik.errors.birthday}</div>}
                                    </div>
                                </div>

                                <div className="flex">

                                    <div className="w-1/2 mr-2">
                                        <label
                                            htmlFor="avatar"
                                            className="block text-sm font-medium text-gray-700"
                                        >
                                            Ảnh đại diện
                                        </label>
                                        <div className="mt-1">
                                            <input
                                                id="avatar"
                                                name="avatar"
                                                type="avatar"
                                                autoComplete="avatar"
                                                placeholder={user.avatar}
                                                value={formik.values.avatar}
                                                onChange={formik.handleChange} // Gọi hàm formik.handleChange khi giá trị thay đổi
                                                // required
                                                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                            />

                                        </div>
                                        {formik.errors.avatar && formik.touched.avatar && <div>{formik.errors.avatar}</div>}
                                    </div>

                                    <div className="w-1/2 mr-2">
                                        <label
                                            htmlFor="phone"
                                            className="block text-sm font-medium text-gray-700"
                                        >
                                            Số điện thoại
                                        </label>
                                        <div className="mt-1">
                                            <input
                                                id="phone"
                                                name="phone"
                                                type="phone"
                                                autoComplete="phone"
                                                placeholder={user.phone}
                                                value={formik.values.phone}
                                                onChange={formik.handleChange} // Gọi hàm formik.handleChange khi giá trị thay đổi
                                                // required
                                                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                            />
                                        </div>
                                        {formik.errors.phone && formik.touched.phone && <div>{formik.errors.phone}</div>}
                                    </div>

                                </div>

                                <div>
                                    <label
                                        htmlFor="address"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        Địa chỉ
                                    </label>
                                    <div className="mt-1">
                                        <input
                                            id="address"
                                            name="address"
                                            type="address"
                                            autoComplete="address"
                                            placeholder={user.address}
                                            value={formik.values.address}
                                            onChange={formik.handleChange} // Gọi hàm formik.handleChange khi giá trị thay đổi
                                            // required
                                            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        />
                                    </div>
                                    {formik.errors.address && formik.touched.address && <div>{formik.errors.address}</div>}
                                </div>

                                <div className="z-10">
                                    <button
                                        type="submit"
                                        className="group  w-full flex justify-center  py-2 px-4 border border-transparent text-sm font-medium rounded-md text-black bg-gray-200 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                    >
                                        Cập nhật
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



export default ProfilePage;