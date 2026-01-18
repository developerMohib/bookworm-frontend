"use client"

import { useApiData } from '@/hooks/useLoginUser';
import { redirect } from 'next/navigation';

const HomeMainForLayout = () => {

    const { data: user, isLoading, error } = useApiData('presentUser', '/present/user');

    if (isLoading) return <p>Loading...</p>;


    console.log('data', user)

    if (error) return <p>Error: {(error as Error).message}</p>;
    if (!user) {
        redirect('/login');
    }

    if (user.role === 'admin') {
        redirect('/dashboard');
    }

    redirect('/my-library');
};

export default HomeMainForLayout;