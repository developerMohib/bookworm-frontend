"use client"
import { axiosInstance } from '@/api/axiosInstance';
import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { IoEyeOffOutline } from "react-icons/io5";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import Swal from 'sweetalert2';

type RegisterData = {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
    photo?: string;
};

const Register = () => {
    const { register, handleSubmit, formState: { errors }, control, reset } = useForm<RegisterData>();
    const password = useWatch({ control, name: 'password' });
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [profileImage, setProfileImage] = useState<string | null>(null);
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [loading, setLoading] = useState(false);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImageFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setProfileImage(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };
    const handleRegister = async (data: RegisterData) => {
        setLoading(true);
        const formData = new FormData();
        // Append text fields
        formData.append('name', data.name);
        formData.append('email', data.email);
        formData.append('password', data.password);

        // Append file (if exists)
        if (imageFile) {
            formData.append('photo', imageFile);
        }
        try {
            const res = await axiosInstance.post('/register', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            if (res.data.success) {
                Swal.fire({
                    title: res.data.message,
                    showConfirmButton: false,
                    timer: 800
                });
                reset();
            }
        } catch (error: unknown) {
            console.log(error)
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
        } finally {
            setLoading(false)
        }
    };

    return (
        <section className="bg-white">
            <div className="container flex items-center justify-center min-h-screen px-6 mx-auto">
                <form className="w-full max-w-md" onSubmit={handleSubmit(handleRegister)}>
                    <div className="flex justify-center mx-auto">
                        <Image width={450} height={450} className="w-auto h-7 sm:h-8" src="https://www.w3schools.com/howto/img_avatar.png" alt="Logo" />
                    </div>

                    <div className="mt-6">
                        <p className='font-medium text-center text-gray-800 capitalize border-b-2 border-blue-500'>Sign Up</p>
                    </div>

                    <div className="relative flex items-center mt-8">
                        <span className="absolute">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mx-3 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                        </span>
                        <input
                            {...register("name", { required: "User name is required" })}
                            type="text"
                            className="block w-full py-3 text-gray-700 bg-white border rounded-lg px-11 focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                            placeholder="User name"
                        />
                        {errors.name && <p className="text-red-500 text-sm mt-1 ml-11">{errors.name.message}</p>}
                    </div>

                    {/* Profile Photo with Preview */}
                    <div className="mt-6">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Profile Photo</label>
                        <div className="flex gap-4 items-center">
                            <label htmlFor="profile-photo" className="flex items-center px-3 py-3 text-center bg-white border-2 border-dashed rounded-lg cursor-pointer hover:border-blue-400 transition-colors flex-1 justify-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-gray-300 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                                </svg>
                                <span className="text-gray-400">Choose Photo</span>
                                <input
                                    id="profile-photo"
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={handleImageChange}
                                />
                            </label>
                            {profileImage && (
                                <div className="shrink-0">
                                    <Image width={450} height={450}
                                        src={profileImage}
                                        alt="Preview"
                                        className="w-16 h-16 rounded-full object-cover border-2 border-blue-200 shadow-md"
                                    />
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="relative flex items-center mt-6">
                        <span className="absolute">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mx-3 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                        </span>
                        <input
                            {...register("email", {
                                required: "Email is required",
                                pattern: {
                                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                    message: "Invalid email address"
                                }
                            })}
                            type="email"
                            className="block w-full py-3 text-gray-700 bg-white border rounded-lg px-11 focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                            placeholder="Email address"
                        />
                        {errors.email && <p className="text-red-500 text-sm mt-1 ml-11">{errors.email.message}</p>}
                    </div>

                    <div className="relative flex items-center mt-4">
                        <span className="absolute">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mx-3 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                            </svg>
                        </span>
                        <input
                            {...register("password", {
                                required: "Password is required",
                                minLength: {
                                    value: 6,
                                    message: "Password must be at least 6 characters"
                                }
                            })}
                            type={showPassword ? "text" : "password"}
                            className="block w-full px-10 py-3 text-gray-700 bg-white border rounded-lg focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40 pr-12"
                            placeholder="Password"
                        />
                        <button
                            type="button"
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? (
                                <IoEyeOffOutline className="w-5 h-5" />
                            ) : (
                                <MdOutlineRemoveRedEye className="w-5 h-5" />
                            )}
                        </button>
                        {errors.password && <p className="text-red-500 text-sm mt-1 ml-11">{errors.password.message}</p>}
                    </div>

                    <div className="relative flex items-center mt-4">
                        <span className="absolute">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mx-3 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                            </svg>
                        </span>
                        <input
                            {...register("confirmPassword", {
                                required: "Please confirm your password",
                                validate: (value) => value === password || "Passwords do not match"
                            })}
                            type={showConfirmPassword ? "text" : "password"}
                            className="block w-full px-10 py-3 text-gray-700 bg-white border rounded-lg focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40 pr-12"
                            placeholder="Confirm Password"
                        />
                        <button
                            type="button"
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        >
                            {showConfirmPassword ? (
                                <IoEyeOffOutline className="w-5 h-5" />
                            ) : (
                                <MdOutlineRemoveRedEye className="w-5 h-5" />
                            )}
                        </button>
                        {errors.confirmPassword && <p className="text-red-500 text-sm mt-1 ml-11">{errors.confirmPassword.message}</p>}
                    </div>

                    <div className="mt-6">
                        <button disabled={loading}
                            type="submit"
                            className="w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50"
                        >
                            {loading ? "Loading..." : "Sign Up"}
                        </button>
                        <div className="mt-6 text-center">
                            <Link href="/" className="text-sm text-blue-500 hover:underline">
                                Already have an account?
                            </Link>
                        </div>
                    </div>
                </form>
            </div>
        </section>
    );
};

export default Register;
