import React, { useEffect, useState } from 'react';
import axios from 'axios';

import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const staffString = localStorage.getItem('staff');
const staff = staffString ? JSON.parse(staffString) : null;

const closeLogout = () => {
    localStorage.setItem('loginStaffGroup01', 'false');
    window.location.href = '/login/staff';
};



const StaffGroup01Page = () => {

    const [categories, setCategories] = useState([]);

    useEffect(() => {
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

    }, []);

    if (staff.level === 1) { // giao diện trang nhân viên sơ tuyển nhóm 01

        return (
            <div>
                {/* HeaderPage  */}
                <div className="text-center mt-5 ml-8">
                    <b>Trang Nhân Viên Đề Xuất - Nội Dung Danh Mục </b>

                    <div className=" float-right mr-8">
                        <button
                            className="flex justify-center items-center text-blue-500 mt-1 w-[120px] h-10 hover:bg-blue-100 rounded-full border border-blue-500"
                            title="Đăng xuất"
                            onClick={closeLogout}
                        >
                            <div className="mr-2">
                                <AccountCircleIcon />
                            </div>
                            Sign out
                        </button>
                    </div>
                </div>
                {/* Nội dung */}
                <div className="mt-8">
                    <table className="min-w-full divide-y divide-gray-100 table-fixed">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="w-1/5 px-6 py-3 text-center text-xs font-medium text-gray-800 uppercase tracking-wider border-r-2">Danh Mục</th>
                                <th className="w-2/5 px-6 py-3 text-center text-xs font-medium text-gray-800 uppercase tracking-wider border-r-2">Tiêu Chuẩn Nội Dung Danh Mục</th>
                                <th className="w-2/5 px-6 py-3 text-center text-xs font-medium text-gray-800 uppercase tracking-wider border-r-2">Đề Xuất Sửa Đổi Tiêu Chuẩn Nội Dung</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {categories.map((category) => (
                                <tr key={category.id} className="hover:bg-blue-200">
                                    <td className="w-1/5 px-6 py-4 whitespace-normal border-r-2"> {category.name}</td>
                                    <td className="w-2/5 px-6 py-4 whitespace-normal border-r-2"> {category.description}</td>
                                    <td className="w-2/5 px-6 py-4 whitespace-normal border-r-2">{category.suggestion}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                </div>
            </div>
        );

    } if (staff.level === 2) { // Giao diện trang tổ phản biện nhóm 01
        return (
            <div>

                <div>
                    <div className="text-center mt-5 ml-8">
                        <b>Trang Tổ Phản Biện - Nội Dung Danh Mục</b>
                        <div className="float-right mr-4">
                            <button
                                className="flex justify-center items-center text-blue-500 mt-1 w-[120px] h-10 hover:bg-blue-100 rounded-full border border-blue-500"
                                title="Đăng xuất"
                                onClick={closeLogout}
                            >
                                <div className="mr-2">
                                    <AccountCircleIcon />
                                </div>
                                Sign out
                            </button>
                        </div>
                    </div>
                </div>

                <div>
                    <ul>
                        <li className='mb-2 hover:bg-gray-300 w-[160px] ml-8 tex-center'>
                            Quản lý danh mục
                        </li>
                        <li className='mb-2 hover:bg-gray-300 w-[160px] ml-8 tex-center'>
                            Quản lý video
                        </li>
                        <li className='mb-2 hover:bg-gray-300 w-[160px] ml-8 tex-center'>
                            Quản lý bình luận
                        </li>
                        <li className='mb-2 hover:bg-gray-300 w-[160px] ml-8 tex-center'>
                            Quản lý báo cáo
                        </li>
                    </ul>
                </div>
            </div>
        );

    } else { // Giao diện trang quản lý trưởng nhóm 01
        return (
            <div>

                <div>
                    <div className="text-center mt-5 ml-8">
                        <b>Trang Quản Lý Trưởng - Nội Dung Danh Mục</b>
                        <div className="float-right mr-4">
                            <button
                                className="flex justify-center items-center text-blue-500 mt-1 w-[120px] h-10 hover:bg-blue-100 rounded-full border border-blue-500"
                                title="Đăng xuất"
                                onClick={closeLogout}
                            >
                                <div className="mr-2">
                                    <AccountCircleIcon />
                                </div>
                                Sign out
                            </button>
                        </div>
                    </div>
                </div>

                <div>
                    <ul>
                        <li className='mb-2 hover:bg-gray-300 w-[160px] ml-8 tex-center'>
                            Quản lý danh mục
                        </li>
                        <li className='mb-2 hover:bg-gray-300 w-[160px] ml-8 tex-center'>
                            Quản lý video
                        </li>
                        <li className='mb-2 hover:bg-gray-300 w-[160px] ml-8 tex-center'>
                            Quản lý bình luận
                        </li>
                        <li className='mb-2 hover:bg-gray-300 w-[160px] ml-8 tex-center'>
                            Quản lý báo cáo
                        </li>
                    </ul>
                </div>
            </div>
        );
    }
};

export default StaffGroup01Page;
