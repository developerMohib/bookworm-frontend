"use client"
import { useApiData } from '@/hooks/useLoginUser';
import { AxiosError } from 'axios';
import { redirect } from 'next/navigation';
import { TbLoader2 } from 'react-icons/tb';

const HomeMainForLayout = () => {
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

    if (user.role === 'admin') {
        redirect('/dashboard');
    } else {
        redirect('/my-library');
    }

};

export default HomeMainForLayout;