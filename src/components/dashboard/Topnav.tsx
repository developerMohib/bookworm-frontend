'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useApiData } from '@/hooks/useLoginUser';
import { Icons } from '@/data/icon';
import Image from 'next/image';
import { axiosInstance } from '@/api/axiosInstance';
import Swal from 'sweetalert2';
import { useRouter } from 'next/navigation';

export default function TopNav() {
    const [showProfileMenu, setShowProfileMenu] = useState(false);
    const router = useRouter()
    const { data: user, isLoading } = useApiData('presentUser', '/present/user');
    if (isLoading) {
        return <p>Loading...</p>
    }
 const handleLogout = async () => {
        const res = await axiosInstance.post('/logout')
        if (res?.status === 200) {
            Swal.fire({
                timer: 1000,
                title: res.data.message,
                showConfirmButton: false,
            })
            router.push('/login');
        }
    }
    return (
        <header className="lg:ml-64 bg-white border-b border-gray-200">
            <div className="px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Left side - Search */}
                    <div className="flex-1 flex items-center">
                        <div className="max-w-xs w-full">
                            <label htmlFor="search" className="sr-only">
                                Search
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <svg
                                        className="h-5 w-5 text-gray-400"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                        />
                                    </svg>
                                </div>
                                <input
                                    id="search"
                                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                    placeholder="Search..."
                                    type="search"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Right side - Notifications & Profile */}
                    <div className="flex items-center space-x-4">
                        {/* Notifications */}
                        <button className="p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                            <span className="sr-only">View notifications</span>
                            <Icons.NotificationOutline className="h-6 w-6" />
                            <span className="absolute top-2 right-2 h-2 w-2 bg-red-500 rounded-full"></span>
                        </button>

                        {/* Role Badge */}
                        {user?.role === 'admin' && (
                            <div className="hidden sm:block">
                                <span className="px-3 py-1 text-xs font-semibold bg-red-100 text-red-800 rounded-full">
                                    Administrator
                                </span>
                            </div>
                        )}

                        {/* Profile Dropdown */}
                        <div className="relative ml-3">
                            <div>
                                <button
                                    onClick={() => setShowProfileMenu(!showProfileMenu)}
                                    className="flex items-center max-w-xs text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                >
                                    <span className="sr-only">Open user menu</span>
                                    {user?.photo ? (
                                        <Image width={450} height={450}
                                            src={user.photo}
                                            alt={user.name}
                                            className="h-10 w-10 rounded-full"
                                        />
                                    ) : (
                                        <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center text-white">
                                            {user?.name?.charAt(0).toUpperCase()}
                                        </div>
                                    )}
                                    <span className="hidden md:block ml-2 text-sm font-medium text-gray-700">
                                        {user?.name}
                                    </span>
                                    <svg
                                        className="ml-1 h-5 w-5 text-gray-400"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </button>
                            </div>

                            {/* Dropdown Menu */}
                            {showProfileMenu && (
                                <>
                                    <div
                                        className="fixed inset-0 z-10"
                                        onClick={() => setShowProfileMenu(false)}
                                    />
                                    <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 py-1 z-20">
                                        <div className="px-4 py-2 border-b">
                                            <p className="text-sm font-medium">{user?.name}</p>
                                            <p className="text-xs text-gray-500">{user?.email}</p>
                                            <p className="text-xs text-gray-500 capitalize">
                                                {user?.role}
                                            </p>
                                        </div>
                                        <Link
                                            href="/dashboard/profile"
                                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                            onClick={() => setShowProfileMenu(false)}
                                        >
                                            Your Profile
                                        </Link>
                                        <Link
                                            href="/dashboard/settings"
                                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                            onClick={() => setShowProfileMenu(false)}
                                        >
                                            Settings
                                        </Link>
                                        {user?.role === 'admin' && (
                                            <Link
                                                href="/dashboard/admin"
                                                className="block px-4 py-2 text-sm text-red-700 hover:bg-gray-100"
                                                onClick={() => setShowProfileMenu(false)}
                                            >
                                                Admin Panel
                                            </Link>
                                        )}
                                        <div className="border-t border-gray-100">
                                            <button onClick={handleLogout}
                                                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                            >
                                                Sign out
                                            </button>
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}