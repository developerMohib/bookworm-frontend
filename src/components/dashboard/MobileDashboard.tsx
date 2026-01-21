'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { getNavItemsByRole } from '@/data/navigation';
import { useApiData } from '@/hooks/useLoginUser';
import { Icons } from '@/data/icon';
import Image from 'next/image';
import { axiosInstance } from '@/api/axiosInstance';
import Swal from 'sweetalert2';

export default function MobileSidebar() {
    const [isOpen, setIsOpen] = useState(false);
    const router = useRouter()
    const pathname = usePathname();
    const { data: user, isLoading } = useApiData('presentUser', '/present/user');
    if (isLoading) {
        return <p>Loading...</p>
    }
    const navItems = getNavItemsByRole(user?.role);
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
        <>
            {/* Mobile Menu Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-md bg-gray-800 text-white"
            >
                {isOpen ? (
                    <Icons.CloseOutline className="h-6 w-6" />
                ) : (
                    <Icons.MenuOutline className="h-6 w-6" />
                )}
            </button>

            {/* Mobile Sidebar Overlay */}
            {isOpen && (
                <div
                    className="lg:hidden fixed inset-0 z-40 bg-black bg-opacity-50"
                    onClick={() => setIsOpen(false)}
                />
            )}

            {/* Mobile Sidebar */}
            <aside
                className={`lg:hidden fixed top-0 left-0 z-40 h-full w-64 bg-gray-900 text-white transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'
                    }`}
            >
                {/* Sidebar Header */}
                <div className="p-4 border-b border-gray-700">
                    <div className="flex items-center space-x-3">
                        <div className="h-10 w-10 rounded-full bg-blue-500 flex items-center justify-center">
                            {user?.photo ? (
                                <Image width={450} height={450}
                                    src={user.photo}
                                    alt={user.name}
                                    className="h-10 w-10 rounded-full"
                                />
                            ) : (
                                <span className="text-lg font-semibold">
                                    {user?.name?.charAt(0).toUpperCase()}
                                </span>
                            )}
                        </div>
                        <div>
                            <p className="font-semibold">{user?.name}</p>
                            <p className="text-sm text-gray-400 capitalize">{user?.role}</p>
                        </div>
                    </div>
                </div>

                {/* Navigation */}
                <nav className="p-4">
                    <ul className="space-y-2">
                        {navItems.map((item) => {
                            const Icon = item.icon;
                            const ActiveIcon = item.activeIcon || item.icon;
                            const isActive = pathname === item.href;

                            return (
                                <li key={item.name}>
                                    <Link
                                        href={item.href}
                                        onClick={() => setIsOpen(false)}
                                        className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${isActive
                                                ? 'bg-blue-600 text-white'
                                                : 'text-gray-300 hover:bg-gray-800'
                                            }`}
                                    >
                                        {isActive ? (
                                            <ActiveIcon className="h-5 w-5" />
                                        ) : (
                                            <Icon className="h-5 w-5" />
                                        )}
                                        <span>{item.name}</span>
                                        {item.badge && (
                                            <span className="ml-auto bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                                                {item.badge}
                                            </span>
                                        )}
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </nav>

                {/* Logout Button */}
                <div className="p-4 border-t border-gray-700">
                <button onClick={handleLogout}
                    className="w-full flex items-center justify-center space-x-2 px-4 py-2.5 bg-gray-800 hover:bg-red-600 text-white rounded-lg transition-colors"
                >
                    <Icons.SettingsOutline className="h-5 w-5" />
                    <span>Log out</span>
                </button>
            </div>
            </aside>
        </>
    );
}