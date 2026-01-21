"use client"

import { useApiData } from "@/hooks/useLoginUser";
import { AxiosError } from "axios";
import { redirect } from "next/navigation";
import { TbLoader2 } from "react-icons/tb";

const DashboradHomePage = () => {
    const { data: user, isLoading, error } = useApiData('presentUser', '/present/user');

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <TbLoader2 className="h-8 w-8 animate-spin text-blue-500" />
            </div>
        );
    }

    if (error) {
        const axiosError = error as AxiosError;
        if (axiosError.response?.status === 401) {
            redirect('/login');
        }

        return <p>Error in backend: {axiosError.message}</p>;
    }

    if (!user) {
        redirect('/login');

    }

    return (
        <div>
            <h1 className="text-2xl font-semibold text-gray-900">
                {/* Welcome back, {user?.name}! */}
            </h1>
            <p className="mt-2 text-gray-600">
                Here s what s happening with your account today.
            </p>

            {/* Role-specific content */}
            {user?.role === 'user' && (
                <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="bg-white rounded-lg shadow p-6">
                        <h3 className="text-lg font-medium">My Orders</h3>
                        <p className="mt-2 text-gray-600">View and track your orders</p>
                    </div>
                    <div className="bg-white rounded-lg shadow p-6">
                        <h3 className="text-lg font-medium">Documents</h3>
                        <p className="mt-2 text-gray-600">Access your documents</p>
                    </div>
                </div>
            )}

            {user?.role === 'admin' && (
                <div className="mt-8">
                    <div className="bg-linear-to-r from-red-200 to-red-200 rounded-lg shadow-lg p-6 text-white">
                        <h3 className="text-xl font-bold">Administrator Panel</h3>
                        <p className="mt-2">You have full access to all system features</p>
                    </div>

                    <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <div className="bg-white rounded-lg shadow p-6">
                            <h3 className="text-lg font-medium">User Management</h3>
                            <p className="mt-2 text-gray-600">Manage all users</p>
                        </div>
                        <div className="bg-white rounded-lg shadow p-6">
                            <h3 className="text-lg font-medium">Analytics</h3>
                            <p className="mt-2 text-gray-600">View system analytics</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
};

export default DashboradHomePage;