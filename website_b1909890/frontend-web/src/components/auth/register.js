import React from 'react';
import { Link } from 'react-router-dom';

const RegisterPage = () =>{
    return ( 
        <div className="min-h-screen bg-gray-100 flex flex-col justify-center  py-12 sm:px-6 lg:px-8 fixed inset-0  bg-opacity-30 backdrop-blur-sm z-50  ">
          <div className=" sm:mx-auto sm:w-full sm:max-w-md mt-8 mb-28">
            <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                
                <div className="sm:mx-auto sm:w-full sm:max-w-md mb-6">
                    <h2 className=" text-center text-3xl font-extrabold text-gray-900">
                        Đăng Ký Tài Khoản
                    </h2>
                    <p className="mt-2 text-center text-sm text-gray-600">
                <Link
                  className="font-medium text-indigo-600 hover:text-indigo-500 text-red-300"
                  to="/login"
                >
                  <b>Quay lại</b>
                </Link>
              </p>
                </div>

                
                <div>
                    <form className="space-y-6" >

                        <div>
                            <label
                                htmlFor="firstname"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Firstname
                            </label>
                            <div className="mt-1">
                                <input
                                id="firstname"
                                name="firstname"
                                type="text"
                                autoComplete="firstname"
                                required
                                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                />
                            </div>
                        </div>

                        <div>
                            <label
                                htmlFor="lastname"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Lastname
                            </label>
                            <div className="mt-1">
                                <input
                                id="lastname"
                                name="lastname"
                                type="text"
                                autoComplete="lastname"
                                required
                                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                />
                            </div>
                        </div>

                        <div>
                            <label
                                htmlFor="email"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Email
                            </label>
                            <div className="mt-1">
                                <input
                                id="email"
                                name="email"
                                type="email"
                                autoComplete="email"
                                placeholder="my@gmail.com"
                                required
                                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                />
                            
                            </div>
                        </div>

                        <div>
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
                                required
                                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                />  
                            </div>
                        </div>

                        <div className="z-10">
                            <button
                                type="submit"
                                className="group  w-full flex justify-center  py-2 px-4 border border-transparent text-sm font-medium rounded-md text-black bg-gray-200 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                Đăng ký
                            </button>
                        </div>

                    </form>
                </div>
            </div>
          </div>
        </div>
    );
};

export default RegisterPage;
