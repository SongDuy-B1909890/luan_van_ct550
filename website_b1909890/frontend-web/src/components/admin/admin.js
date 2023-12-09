import React, { useEffect, useState } from 'react';
import axios from 'axios';

import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';

import { DataGrid } from '@mui/x-data-grid';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import AccountCircleIcon from '@mui/icons-material/AccountCircle';

import '../../index.css';

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

    const [videos, setVideos] = useState([]);


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

        axios
            .get('http://localhost:5000/api/videos')
            .then((response) => {
                // console.log(response.data);
                const videosData = response.data;
                setVideos(videosData);
            })
            .catch((error) => {
                console.error(error);
            });

    }, []);

    // const columns = [
    //     { field: 'id', headerName: 'ID', width: 200, align: 'center', headerAlign: 'center' },
    //     { field: 'name', headerName: 'First name', width: 130, align: 'center', headerAlign: 'center' },
    //     { field: 'lastName', headerName: 'Last name', width: 200, align: 'center', headerAlign: 'center', },
    //     { field: 'age', headerName: 'Age', type: 'number', width: 190, align: 'center', headerAlign: 'center', },

    //     {
    //         field: 'fullName',
    //         headerName: 'Full name',
    //         description: 'This column has a value getter and is not sortable.',
    //         sortable: false,
    //         width: 160,
    //         align: 'center',
    //         headerAlign: 'center',
    //         valueGetter: (params) =>
    //             `${params.row.firstName || ''} ${params.row.lastName || ''}`,
    //     },
    // ];

    // Phần Quản lý Nhân Viên

    const handleEditStaff = (id) => {
        console.log(id);
    }
    const handleDeleteStaff = (id) => {

    }

    const columnsStaffs = [
        { field: 'id', headerName: 'ID', width: 200, align: 'center', headerAlign: 'center' },
        { field: 'name', headerName: 'Họ Tên', width: 200, align: 'center', headerAlign: 'center' },
        { field: 'email', headerName: 'Email', width: 200, align: 'center', headerAlign: 'center', },
        { field: 'group', headerName: 'Nhóm Nhân Viên', width: 200, align: 'center', headerAlign: 'center', },
        { field: 'level', headerName: 'Cấp Bậc Nhân Viên', type: 'number', width: 200, align: 'center', headerAlign: 'center', },
        {
            field: 'actions',
            headerName: 'Quản Lý Nhân Viên',
            width: 200,
            align: 'center',
            headerAlign: 'center',
            renderCell: (params) => (
                <div className="button-group">
                    <IconButton
                        className="px-5"
                        onClick={() => handleEditStaff(params.row.id)}
                        color="primary"
                    >
                        <EditIcon />
                    </IconButton>
                    <IconButton
                        onClick={() => handleDeleteStaff(params.row.id)}
                        color="error"
                    >
                        <DeleteIcon />
                    </IconButton>
                </div>
            ),
        },
    ];

    const rowsStaffs = staffs.map((staff) => {
        let group;

        if (staff.group === "1") {
            group = "Nhóm Ban Hành Quy Định";
        } else if (staff.group === "2") {
            group = "Nhóm Phát Hành Video";
        } else if (staff.group === "3") {
            group = "Nhóm Kiểm Tra Giám Sát";
        }

        return {
            id: staff.id,
            name: staff.name,
            email: staff.email,
            group: group,
            level: staff.level,
        };
    });

    // Phần Quản Lý Danh Mục

    const handleEditCategory = (id) => {
        console.log(id);
    }
    const handleDeleteCategory = (id) => {

    }

    const columnsCategories = [
        { field: 'id', headerName: 'ID', width: 200, align: 'center', headerAlign: 'center' },
        { field: 'name', headerName: 'Tên Danh Mục', width: 200, align: 'center', headerAlign: 'center' },
        {
            field: 'motto',
            headerName: 'Phương Châm Danh Mục',
            width: 650,
            align: 'center',
            headerAlign: 'center',
            renderCell: (params) => (
                <div style={{ whiteSpace: 'pre-wrap', overflowWrap: 'break-word' }}>
                    {params.value}
                </div>
            ),
        },
        {
            field: 'actions',
            headerName: 'Quản Lý Danh Mục',
            width: 200,
            align: 'center',
            headerAlign: 'center',
            renderCell: (params) => (
                <div className="button-group">
                    <IconButton
                        className="px-5"
                        onClick={() => handleEditCategory(params.row.id)}
                        color="primary"
                    >
                        <EditIcon />
                    </IconButton>
                    <IconButton
                        onClick={() => handleDeleteCategory(params.row.id)}
                        color="error"
                    >
                        <DeleteIcon />
                    </IconButton>
                </div>
            ),
        },
    ];

    const rowsCategories = categories.map((category) => ({
        id: category.id,
        name: category.name,
        motto: category.motto,

    }));

    // Phần Quản Lý Video

    const handleEditVideo = (id) => {
        console.log(id);
    }
    const handleDeleteVideo = (id) => {

    }

    const columnsVideos = [
        { field: 'id', headerName: 'ID', width: 100, align: 'center', headerAlign: 'center' },
        {
            field: 'title',
            headerName: 'Tiêu Đề Video',
            width: 200,
            align: 'center',
            headerAlign: 'center',
            renderCell: (params) => (
                <div
                    style={{
                        maxHeight: '3.0 em', // Chiều cao tương ứng với 2 dòng văn bản với font-size và line-height cụ thể
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'pre-wrap',
                        overflowWrap: 'break-word',
                    }}
                    title={params.value}
                >
                    {params.value}
                </div>
            ),
        },

        {
            field: 'actions',
            headerName: 'Quản Lý Video',
            width: 200,
            align: 'center',
            headerAlign: 'center',
            renderCell: (params) => (
                <div className="button-group">
                    <IconButton
                        className="px-5"
                        onClick={() => handleEditVideo(params.row.id)}
                        color="primary"
                    >
                        <EditIcon />
                    </IconButton>
                    <IconButton
                        onClick={() => handleDeleteVideo(params.row.id)}
                        color="error"
                    >
                        <DeleteIcon />
                    </IconButton>
                </div>
            ),
        },
    ];

    const rowsVideos = videos.map((video) => ({
        id: video.cloudinary_id,
        title: video.title,

    }));

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
                            <div
                                style={{ height: 550, width: '100%' }}
                                className="text-center"
                            >
                                <DataGrid
                                    rows={rowsStaffs}
                                    columns={columnsStaffs}
                                    initialState={{
                                        pagination: {
                                            paginationModel: { page: 0, pageSize: 10 },
                                        },
                                    }}
                                    pageSizeOptions={[10, 20]}
                                    checkboxSelection
                                />
                            </div>
                        </TabPanel>

                        <TabPanel value="2">
                            <div
                                style={{ height: 550, width: '100%' }}
                                className="text-center"
                            >
                                <DataGrid
                                    rows={rowsCategories}
                                    columns={columnsCategories}
                                    initialState={{
                                        pagination: {
                                            paginationModel: { page: 0, pageSize: 10 },
                                        },
                                    }}
                                    pageSizeOptions={[10, 20]}
                                    checkboxSelection
                                />
                            </div>
                        </TabPanel>
                        <TabPanel value="3">
                            <div
                                style={{ height: 550, width: '100%' }}
                                className="text-center"
                            >
                                <DataGrid
                                    rows={rowsVideos}
                                    columns={columnsVideos}
                                    initialState={{
                                        pagination: {
                                            paginationModel: { page: 0, pageSize: 10 },
                                        },
                                    }}
                                    pageSizeOptions={[10, 20]}
                                    checkboxSelection
                                />
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
