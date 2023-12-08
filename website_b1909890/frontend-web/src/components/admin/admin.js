import React, { useEffect, useState } from 'react';
import axios from 'axios';

import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';

import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const closeLogout = () => {
    localStorage.setItem('loginAdmin', 'false');
    window.location.href = '/login/admin';
};

const AdminPage = () => {
    const [value, setValue] = React.useState('1');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const [staffs, setStaffs] = useState([]);

    const [categories, setCategories] = useState([]);

    useEffect(() => {
        axios
            .get('http://localhost:5000/api/staffs')
            .then((response) => {
                // console.log(response.data);
                const staffsData = response.data;
                setStaffs(staffsData);
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

    }, []);

    return (
        <div>
            <div className="text-center mt-5 ml-8">
                <b className="text-3xl ml-8 text-blue-800">Trang Admin </b>

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

            <div className='w-full px-12 mt-5'>
                <Box sx={{ width: '100%', typography: 'body1' }}>
                    <TabContext value={value}>
                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                            <TabList onChange={handleChange} aria-label="lab API tabs example">
                                <Tab
                                    label="Quản lý nhân viên"
                                    value="1"
                                />
                                <Tab
                                    label="Quản lý danh mục"
                                    value="2"
                                />
                                <Tab
                                    label="Quản lý video"
                                    value="3"
                                />
                                <Tab
                                    label="Quản lý bình luận"
                                    value="4"
                                />
                                <Tab
                                    label="Quản lý báo cáo"
                                    value="5"
                                />
                            </TabList>
                        </Box>

                        <TabPanel value="1">
                            <div className="text-red-500">
                                {staffs.map((staff) => (
                                    <div key={staff.id}>
                                        <ul className="mt-2">
                                            <li className="hover:bg-gray-200 hover:text-blue-500 py-2 px-2 rounded-xl cursor-pointer text-blue-900 font-bold"
                                            >
                                                {staff.name}
                                            </li>
                                        </ul>
                                    </div>
                                ))}
                            </div>
                        </TabPanel>

                        <TabPanel value="2">
                            <div className="text-red-500">
                                {categories.map((category) => (
                                    <div key={category.id}>
                                        <ul className="mt-2">
                                            <li className="hover:bg-gray-200 hover:text-blue-500 py-2 px-2 rounded-xl cursor-pointer text-blue-900 font-bold"
                                            >
                                                {category.name}
                                            </li>
                                        </ul>
                                    </div>
                                ))}
                            </div>
                        </TabPanel>
                        <TabPanel value="3">
                            <div className="text-red-500">
                                Item One
                            </div>
                        </TabPanel>
                        <TabPanel value="4">
                            <div className="text-red-500">
                                Item One
                            </div>
                        </TabPanel>
                        <TabPanel value="5">
                            <div className="text-red-500">
                                Item One
                            </div>
                        </TabPanel>
                    </TabContext>
                </Box>
            </div>
        </div>

    );
};

export default AdminPage;
