import React from 'react';

import '../../index.css';

const DescriptionPage = (props) => {
    return (
        <div className="flex w-[450px] h-[675px] py-5 bg-gray-50 rounded-xl shadow overflow-auto">
            <div className="w-full h-full custom-scrollbar-content custom-scrollbar ml-5 mr-2 ">
                <div className="text-center flex">
                    <span className="text-xl font-bold bg-black text-white px-5 py-1 rounded-full">Mô tả </span>
                    <span className="font-bold rounded-full bg-gray-200 px-3 py-1 text-right ml-auto text-blue-900"> ID: {props.values.cloudinaryId}</span>
                </div>
                <div className="ml-2 mb-2 mt-5">
                    {props.values.description}
                </div>
            </div>
        </div>
    );
};
export default DescriptionPage;