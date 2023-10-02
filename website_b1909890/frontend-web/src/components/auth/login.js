import React from 'react';
import { Link } from 'react-router-dom';

const LoginPage = ({ closeModal }) =>{
  
  const handleBackdropClick = (event) => {
    if (event.target === event.currentTarget) {
      closeModal(); // Gọi hàm closeModal khi nhấp vào nền
    }
  };

    return ( 
        <div className="min-h-screen bg-black bg-opacity-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8 fixed inset-0 z-50" onClick={handleBackdropClick}> {/* backdrop-blur-sm */}
          <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md mb-28 bg-white py-1 px-4 shadow sm:rounded-lg sm:px-10 mb-26 ">
            
            <div className="sm:mx-auto sm:w-full sm:max-w-md ">
              <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                Đăng Nhập Tài Khoản
              </h2>
            </div>

            <div>
              <form className=" space-y-6">
                <input type="hidden" name="remember" value="true" />
                <div className="rounded-md py-6 shadow-sm -space-y-px-10">
                  <div className="form-outline mb-4">
                    <label
                      htmlFor="email" 
                      className="block text-sm font-medium text-gray-700"
                    >
                      Tài khoản đăng nhập
                    </label>

                    <div className="mt-1">
                      <input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                    
                        // onChange={(e) => setEmail(e.target.value)}
                
                        required
                        placeholder="my@gmail.com"
                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                    
                    </div>
                  </div>

                  <div className="form-outline mb-4 mt-6">
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Mật khẩu
                    </label>

                    <div className="mt-1">
                      <input
                        id="password"
                        name="password"
                        type="password"
                        autoComplete="current-password"
                
                        // onChange={(e) => setPassword(e.target.value)}
                       
                        required
                        placeholder="••••••••"
                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                     
                    </div>
                  </div>

                  <div className="flex items-center">
                    <input
                      id="remember_me"
                      name="remember_me"
                      type="checkbox"
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                    />
                    <label
                      htmlFor="remember_me"
                      className="ml-2 block text-sm text-gray-900"
                    >
                      Ghi nhớ đăng nhập
                    </label>
                  </div>
                </div>

                <div className="flex items-center justify-between ">
                  <div className="text-sm">
                    <Link
                      to="/Register"
                      className="font-medium text-indigo-600 hover:text-indigo-500"
                    
                    >
                      <b>Đăng ký tài khoản</b>
                    </Link>
                  </div>

                  <div className="text-sm">
                    <Link
                      to="/forgotPassword"
                      className="font-medium text-indigo-600 hover:text-indigo-500"
                
                    >
                      <b>Quên mật khẩu?</b>
                    </Link>
                  </div>
                </div>

                <div className="py-6 flex justify-center  space-x-36 ">
                  <button
                    type="submit"
                    className=" py-2 px-4 w-full border border-transparent text-sm font-medium rounded-md text-black bg-gray-200 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Đăng nhập
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
    );
};

export default LoginPage;
