import React from 'react';

const CommentPage = (props) => {
    return (
        <div className="flex justify-center w-[450px] h-[675px] py-5 px-5 bg-white rounded-xl border shadow">
            {props.value}
        </div>
    );
};
export default CommentPage;