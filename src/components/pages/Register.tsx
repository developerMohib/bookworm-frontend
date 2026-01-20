"use client"
import { axiosInstance } from '@/api/axiosInstance';
import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
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
    const router = useRouter()

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
        if (!data.name || !data.email || !data.password) {
            console.warn('Missing form data:', data);
            Swal.fire({
                title: `Missing form data: ${data}`,
                showConfirmButton: false,
                timer: 1000
            });
            return;
        }
        const formData = new FormData();
        // Append text fields
        formData.append('name', data.name);
        formData.append('email', data.email);
        formData.append('password', data.password);

        // Append file (if exists)
        if (imageFile) {
            formData.append('image', imageFile);
        }
        try {
            setLoading(true)
            const res = await axiosInstance.post('/register', formData);
            if (res.data.success) {
                Swal.fire({
                    title: res.data.message,
                    showConfirmButton: false,
                    timer: 1000
                });
                reset();
                setProfileImage(null);
                setImageFile(null);
                router.replace('/login')
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
        } finally {
            setLoading(false)
        }
    };

    return (
        <section className="min-h-screen w-full flex items-center justify-center px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-md space-y-2 p-8 rounded-2xl shadow-xl">

                <form onSubmit={handleSubmit(handleRegister)}>
                    {/* Logo/Avatar */}
                    <div className="flex justify-center mx-auto">
                        <Image
                            width={100}
                            height={100}
                            className="w-auto h-20 sm:h-12 rounded-full"
                            src="https://www.w3schools.com/howto/img_avatar.png"
                            alt="Logo"
                        />
                    </div>

                    <div className="mt-4">
                        <p className='font-semibold text-center text-gray-800 text-2xl capitalize'>
                            Register an account!
                        </p>
                    </div>

                    {/* User Name Input */}
                    <div className="relative flex flex-col mt-8">
                        <div className="relative flex items-center">
                            <span className="absolute left-3">
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                            </span>
                            <input
                                {...register("name", { required: "User name is required" })}
                                type="text"
                                className="block w-full py-3 text-gray-700 bg-white border rounded-lg pl-11 pr-4 focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40 transition-all"
                                placeholder="User name"
                            />
                        </div>
                        {errors.name && <p className="text-red-500 text-xs mt-1 ml-1">{String(errors.name.message)}</p>}
                    </div>

                    {/* Profile Photo with Preview */}
                    <div className="mt-6">
                        <label className="block text-sm font-medium text-gray-600 mb-2">Profile Photo</label>
                        <div className="flex gap-4 items-center">
                            <label htmlFor="profile-photo" className="flex items-center px-4 py-2 bg-gray-50 border-2 border-dashed rounded-lg cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition-all flex-1 justify-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-gray-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                                </svg>
                                <span className="text-sm text-gray-500">Choose Photo</span>
                                <input id="profile-photo" type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
                            </label>
                            {profileImage && (
                                <div className="shrink-0 animate-in fade-in zoom-in duration-300">
                                    <Image width={64} height={64} src={profileImage} alt="Preview" className="w-14 h-14 rounded-full object-cover border-2 border-blue-400 shadow-sm" />
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Email Input */}
                    <div className="relative flex flex-col mt-6">
                        <div className="relative flex items-center">
                            <span className="absolute left-3">
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                            </span>
                            <input
                                {...register("email", {
                                    required: "Email is required",
                                    pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Invalid email" }
                                })}
                                type="email"
                                className="block w-full py-3 text-gray-700 bg-white border rounded-lg pl-11 pr-4 focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                                placeholder="Email address"
                            />
                        </div>
                        {errors.email && <p className="text-red-500 text-xs mt-1 ml-1">{String(errors.email.message)}</p>}
                    </div>

                    {/* Password Input */}
                    <div className="relative flex flex-col mt-4">
                        <div className="relative flex items-center">
                            <span className="absolute left-3">
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                </svg>
                            </span>
                            <input
                                {...register("password", {
                                    required: "Password required",
                                    minLength: { value: 6, message: "Min 6 chars" }
                                })}
                                type={showPassword ? "text" : "password"}
                                className="block w-full py-3 text-gray-700 bg-white border rounded-lg pl-11 pr-12 focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                                placeholder="Password"
                            />
                            <button type="button" className="absolute right-3 text-gray-400 hover:text-gray-600" onClick={() => setShowPassword(!showPassword)}>
                                {showPassword ? <IoEyeOffOutline className="w-5 h-5" /> : <MdOutlineRemoveRedEye className="w-5 h-5" />}
                            </button>
                        </div>
                        {errors.password && <p className="text-red-500 text-xs mt-1 ml-1">{String(errors.password.message)}</p>}
                    </div>

                    {/* Confirm Password Input */}
                    <div className="relative flex flex-col mt-4">
                        <div className="relative flex items-center">
                            <span className="absolute left-3">
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                </svg>
                            </span>
                            <input
                                {...register("confirmPassword", {
                                    required: "Confirm password",
                                    validate: (value) => value === password || "Passwords mismatch"
                                })}
                                type={showConfirmPassword ? "text" : "password"}
                                className="block w-full py-3 text-gray-700 bg-white border rounded-lg pl-11 pr-12 focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                                placeholder="Confirm Password"
                            />
                            <button type="button" className="absolute right-3 text-gray-400 hover:text-gray-600" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                                {showConfirmPassword ? <IoEyeOffOutline className="w-5 h-5" /> : <MdOutlineRemoveRedEye className="w-5 h-5" />}
                            </button>
                        </div>
                        {errors.confirmPassword && <p className="text-red-500 text-xs mt-1 ml-1">{String(errors.confirmPassword.message)}</p>}
                    </div>

                    <div className="mt-8">
                        <button
                            disabled={loading}
                            type="submit"
                            className="w-full px-6 py-3 text-sm font-semibold tracking-wide text-white capitalize transition-all duration-300 transform bg-blue-600 rounded-lg hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50 disabled:opacity-70 disabled:cursor-not-allowed shadow-lg"
                        >
                            {loading ? (
                                <span className="flex items-center justify-center">
                                    <svg className="animate-spin h-5 w-5 mr-3 border-t-2 border-white rounded-full" viewBox="0 0 24 24"></svg>
                                    Processing...
                                </span>
                            ) : "Sign Up"}
                        </button>

                        <div className="mt-6 text-center">
                            <Link href="/login" className="text-sm font-medium text-blue-600 hover:text-blue-500 hover:underline transition-all">
                                Already have an account? Sign in
                            </Link>
                        </div>
                    </div>
                </form>
            </div>
        </section>
    );
};

export default Register;
