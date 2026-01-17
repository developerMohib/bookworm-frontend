"use client"
import { axiosInstance } from '@/api/axiosInstance';
import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { IoEyeOffOutline } from 'react-icons/io5';
import { MdOutlineRemoveRedEye } from 'react-icons/md';
import Swal from 'sweetalert2';

type LoginData = {
    email: string;
    password: string;
};

const Login = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm<LoginData>();
    const [showPassword, setShowPassword] = useState(false);

    const handleLogin = async (data: LoginData) => {
        try {
            const res = await axiosInstance.post('/login', data)
            if (res.data.success) {
                Swal.fire({
                    title: res.data.message,
                    showConfirmButton: false,
                    timer: 800
                });
                reset();
            }
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                const message = error.response?.data?.message;

                Swal.fire({
                    icon: "error",
                    title: message,
                    showConfirmButton: false,
                    timer: 800,
                });
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Axios error",
                    showConfirmButton: false,
                    timer: 800,
                });
            }
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-4">

            <div className="w-full max-w-sm overflow-hidden rounded-lg shadow-md bg-amber-200">
                <div className="px-6 py-4">
                    <div className="flex justify-center mx-auto">
                        <Image
                            width={450}
                            height={450}
                            className="w-auto h-12 rounded-full"
                            src="https://www.w3schools.com/howto/img_avatar.png"
                            alt="banner"
                        />
                    </div>
                    <h3 className="mt-3 text-xl font-medium text-center text-gray-600">Welcome Back</h3>
                    <p className="mt-1 text-center text-gray-500">Login or create account</p>

                    <form onSubmit={handleSubmit(handleLogin)}>
                        <div className="w-full mt-4">
                            <input
                                {...register("email", { required: "Email is required" })}
                                className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border rounded-lg focus:border-blue-400 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300"
                                type="email"
                                placeholder="Email Address"
                                aria-label="Email Address"
                            />
                            {errors.email && <p className="text-red-500 text-sm mt-1">{String(errors.email.message)}</p>}
                        </div>

                        <div className="w-full mt-4 relative">
                            <input
                                {...register("password", { required: "Password is required" })}
                                className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border rounded-lg focus:border-blue-400 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300"
                                type={showPassword ? "text" : "password"}
                                placeholder="Password"
                                aria-label="Password"
                            />
                            <button
                                type="button"
                                className="absolute right-3 top-1/2 -translate-y-1/2 mt-1 text-gray-400 hover:text-gray-600"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? (
                                    <IoEyeOffOutline className="w-5 h-5" />
                                ) : (
                                    <MdOutlineRemoveRedEye className="w-5 h-5" />
                                )}
                            </button>
                            {errors.password && <p className="text-red-500 text-sm mt-1">{String(errors.password.message)}</p>}
                        </div>

                        <div className="flex items-center justify-between mt-4">
                            <a href="#" className="text-sm text-gray-600 hover:text-gray-500">Forget Password?</a>
                            <button
                                type="submit"
                                className="px-6 py-2 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50"
                            >
                                Sign In
                            </button>
                        </div>
                    </form>
                </div>

                <div className="flex items-center justify-center py-4 text-center bg-gray-50">
                    <span className="text-sm text-gray-600">Don&apos;t have an account? </span>
                    <Link href="/register" className="mx-2 text-sm font-bold text-blue-500 hover:underline">Register</Link>
                </div>
            </div>
        </div>
    );
};

export default Login;
