'use client';

import Link from 'next/link';
import { redirect, usePathname } from 'next/navigation';
import { getNavItemsByRole } from '@/data/navigation';
import { useApiData } from '@/hooks/useLoginUser';
import Image from 'next/image';

export default function DesktopSidebar() {
    const pathname = usePathname();
    const { data: user, isLoading } = useApiData('presentUser', '/present/user');
    if (isLoading) {
        return <p>Loading...</p>
    }
    if (!user) {
        redirect('/login');

    }

    const navItems = getNavItemsByRole(user?.role);

    return (
        <aside className="hidden lg:flex lg:flex-col lg:w-64 lg:fixed lg:inset-y-0 bg-gray-900 text-white">
            {/* Sidebar Header */}
            <div className="p-6 border-b border-gray-700">
                <div className='flex items-center'>
                    <Image width={450} height={450}
                        src='/book-worm.png'
                        alt={user.name}
                        className="h-14 w-14 rounded-full"
                    />
                    <h2 className="text-lg font-semibold">Book Worm</h2>
                </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 p-2 overflow-y-auto">
                <div className="space-y-1">
                    {navItems.map((item) => {
                        const Icon = item.icon;
                        const ActiveIcon = item.activeIcon || item.icon;
                        const isActive = pathname === item.href;

                        return (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors group ${isActive
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
                            </Link>
                        );
                    })}
                </div>


            </nav>
        </aside>
    );
}