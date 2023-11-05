import React from 'react';

import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const staffString = localStorage.getItem('staff');
const staff = staffString ? JSON.parse(staffString) : null;

const closeLogout = () => {
    localStorage.setItem('loginStaffGroup01', 'false');
    window.location.href = '/login/staff';
};

const StaffGroup01Page = () => {

    if (staff.level === 1) { // giao diện trang nhân viên sơ tuyển nhóm 01
        return (
            <div>
                {/* HeaderPage  */}
                <div>
                    <div className="text-center mt-8 ml-8">
                        Trang Nhân Viên Sơ Tuyển Nhóm 01

                        <div className=" flex justify-center items-center float-right mr-4">
                            <span className="mr-4">{staff.name}</span>
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

                        </div></div>
                </div>
                {/* Nội dung */}
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

    } if (staff.level === 2) { // Giao diện trang tổ phản biện nhóm 01
        return (
            <div>

                <div>
                    <div className="text-center mt-8 ml-8">
                        Trang Tổ Phản Biện Nhóm 01
                    </div>
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
                        {staff.id}
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
                    <div className="text-center mt-8 ml-8">
                        Trang Quản Lý Trưởng Nhóm 01
                    </div>
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
                        {staff.id}
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
