import React from 'react';

const DescriptionPage = (props) => {
    return (
        <div className="flex justify-center w-[450px] h-[675px] bg-white rounded-xl border shadow">
            {props.value}
        </div>
    );
};
export default DescriptionPage;