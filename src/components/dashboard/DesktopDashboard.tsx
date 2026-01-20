'use client';

import Link from 'next/link';
import { redirect, usePathname } from 'next/navigation';
import { COMMON_NAV_ITEMS, getNavItemsByRole } from '@/data/navigation';
import { useApiData } from '@/hooks/useLoginUser';
import Image from 'next/image';
import { Icons } from '@/data/icon';
import { axiosInstance } from '@/api/axiosInstance';
import Swal from 'sweetalert2';

export default function DesktopSidebar() {
    const pathname = usePathname();
    const { data: user, isLoading } = useApiData('presentUser', '/present/user');
    if (isLoading) {
        return <p>Loading...</p>
    }

    const handleLogout = async () => {
        console.log('user')
        const res = await axiosInstance.post('/logout')
        if (res.status === 200) {
            Swal.fire({
                timer: 1000,
                title: res.data.message,
                showConfirmButton: false,
            })
            redirect('/')
        }
        console.log('res', res)
    }

    const navItems = getNavItemsByRole(user?.role);

    return (
        <aside className="hidden lg:flex lg:flex-col lg:w-64 lg:fixed lg:inset-y-0 bg-gray-900 text-white">
            {/* Sidebar Header */}
            <div className="p-6 border-b border-gray-700">
                <div className="flex items-center space-x-3">
                    <div className="h-12 w-12 rounded-full bg-blue-500 flex items-center justify-center">
                        {user?.photo ? (
                            <Image width={450} height={450}
                                src={user.photo}
                                alt={user.name}
                                className="h-10 w-10 rounded-full"
                            />
                        ) : (
                            <span className="text-xl font-semibold">
                                {user?.name?.charAt(0).toUpperCase()}
                            </span>
                        )}
                    </div>
                    <div>
                        <h2 className="text-lg font-semibold">{user?.name}</h2>
                        <p className="text-sm text-gray-400 capitalize flex items-center">
                            {user?.role}
                            {user?.role === 'admin' && (
                                <span className="ml-2 px-2 py-1 text-xs bg-red-500 rounded-full">
                                    Admin
                                </span>
                            )}
                        </p>
                    </div>
                </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 p-4 overflow-y-auto">
                <div className="space-y-1">
                    {navItems.map((item) => {
                        const Icon = item.icon;
                        const ActiveIcon = item.activeIcon || item.icon;
                        const isActive = pathname === item.href;

                        return (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={`flex items-center space-x-3 px-3 py-2.5 rounded-lg transition-colors group ${isActive
                                    ? 'bg-blue-600 text-white'
                                    : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                                    }`}
                            >
                                {isActive ? (
                                    <ActiveIcon className="h-5 w-5" />
                                ) : (
                                    <Icon className="h-5 w-5" />
                                )}
                                <span className="flex-1">{item.name}</span>
                                {item.badge && (
                                    <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                                        {item.badge}
                                    </span>
                                )}
                                {/* Tooltip for icon-only view (if needed) */}
                                <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                                    {item.name}
                                </div>
                            </Link>
                        );
                    })}
                </div>

                {/* Role-specific sections */}
                {user?.role === 'admin' && (
                    <div className="mt-8 pt-6 border-t border-gray-700">
                        <h3 className="px-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                            Admin Tools
                        </h3>
                        <div className="mt-2 space-y-1">
                            {navItems
                                .filter(item => item.roles.includes('admin') && !COMMON_NAV_ITEMS.includes(item))
                                .map((item) => {
                                    const Icon = item.icon;
                                    const isActive = pathname === item.href;

                                    return (
                                        <Link
                                            key={item.name}
                                            href={item.href}
                                            className={`flex items-center space-x-3 px-3 py-2 rounded text-sm ${isActive
                                                ? 'bg-gray-800 text-white'
                                                : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                                                }`}
                                        >
                                            <Icon className="h-4 w-4" />
                                            <span>{item.name}</span>
                                        </Link>
                                    );
                                })}
                        </div>
                    </div>
                )}
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
    );
}