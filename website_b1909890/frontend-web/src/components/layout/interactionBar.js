import React from 'react';
import ReplyIcon from '@mui/icons-material/Reply';
import BlockIcon from '@mui/icons-material/Block';
import ChatRoundedIcon from '@mui/icons-material/ChatRounded';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import Avatar from '@mui/material/Avatar';
const InteractionBar = () => {
    return (
        <div 
                className="h-[540px] mb-[45px] pr-2 bg-white rounded-xl shadow border border-gray-300">
                <ul className="ml-2 mt-10 ">

                  <li className="mb-16 text-center">
                    <button >
                      <Avatar 
                        alt="Remy Sharp" 
                        src="https://vapa.vn/wp-content/uploads/2022/12/hinh-nen-dep-ngau-nu-001.jpg" 
                        sx={{ width: 50, height: 50 }}
                      />
                    </button>
                    <button 
                      className="block w-[65px] h-[30px] bg-red-50 text-black text-xs font-bold rounded-full px-2 hover:bg-gray-200">
                      Đăng ký
                    </button>
                  </li>

                  <li className="mb-3 text-center"> 
                    <button 
                      className="w-[50px] h-[50px] bg-gray-100 rounded-full hover:bg-gray-200">
                      <FavoriteRoundedIcon/>
                    </button>
                    <span className="block">
                      200k
                    </span>
                  </li>
                  
                  <li 
                    className="mb-3 text-center" 
                    onClick={() => closeChatModal(video.id)}
                  > 
                    <button 
                      className="w-[50px] h-[50px] bg-gray-100 rounded-full hover:bg-gray-200" 
                      onClick={() => openChatModal(video.id)}
                    >
                        <ChatRoundedIcon/>
                    </button>
                    <span className="block">
                      2k
                    </span> 
                  </li>

                  <li className="mb-3 text-center "> 
                    <button 
                      className="w-[50px] h-[50px] bg-gray-100 rounded-full hover:bg-gray-200 transform scale-x-[-1]">
                      <ReplyIcon/>
                    </button>
                    <span className="block">
                      2k
                    </span>
  
                  </li>

                  <li className="mb-3 text-center bg-white"> 
                    <button 
                      className="w-[50px] h-[50px] bg-gray-100 rounded-full hover:bg-gray-200">
                      <BlockIcon/>
                    </button>
                    {/* <span className="block">
                      2k
                    </span> */}
  
                  </li>
                  
                </ul>
              </div>
    );
};

export default InteractionBar;