import React from 'react';

import '../../index.css';

const CommentPage = (props) => {
    return (
        <div className="flex w-[450px] h-[675px] py-5 bg-white rounded-xl border shadow overflow-auto ">
            <div className="w-full h-full custom-scrollbar-content custom-scrollbar ml-5 mr-5">
                {props.value}

            </div>
        </div>
    );
};
export default CommentPage;