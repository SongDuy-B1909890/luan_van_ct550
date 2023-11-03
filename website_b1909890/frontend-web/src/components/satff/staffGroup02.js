import React from 'react';

const StaffGroup02Page = () => {

    return (
        <div  > {/* backdrop-blur-sm */}
            <div className="text-center mt-12 ml-8">
                Trang Nhân Viên
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
};

export default StaffGroup02Page;
