import React from 'react';

import '../../index.css';

const DescriptionPage = (props) => {
    return (
        <div className="flex w-[450px] h-[675px] py-5 bg-white rounded-xl border shadow overflow-auto">
            <div className="w-full h-full custom-scrollbar-content custom-scrollbar ml-5 mr-5 ">
                <div className="text-center flex">
                    <h1 className="text-xl font-bold bg-yellow-600 text-white px-5 py-1 rounded-full">Mô tả </h1>
                    <span className="font-bold rounded-full bg-gray-200 px-3 py-1 text-right ml-auto text-blue-900"> ID: {props.values.cloudinaryId}</span>
                </div>
                <div className="ml-2 mb-2 mt-2">
                    {props.values.description}
                </div>
            </div>
        </div>
    );
};
export default DescriptionPage;