'use client';

import { axiosInstance } from '@/api/axiosInstance';
import BookFormModal from '@/components/books/BookModal';
import BookTable from '@/components/books/BookTable';
import { useState, useEffect } from 'react';
type Genre = { _id: string; name: string };
type Book = {
    _id: string;
    title: string;
    author: string;
    genre: string;
    description: string;
    coverImage: string;
};

const Page = () => {
    const [books, setBooks] = useState<Book[]>([]);
    const [genres, setGenres] = useState<Genre[]>([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingBook, setEditingBook] = useState<Book | null>(null);



    useEffect(() => {
        const fetchData = async () => {
            try {
                const [booksRes, genresRes] = await Promise.all([
                    axiosInstance.get<Book[]>('/books'),
                    axiosInstance.get<Genre[]>('/genres'),
                ]);
                setBooks(booksRes.data);
                setGenres(genresRes.data);
            } catch (err) {
                console.log(err)
                console.error('Failed to fetch data');
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);


    const handleFormSubmit = async (data: Omit<Book, '_id'> & { imageFile?: File }) => {
        let imageUrl = data.coverImage;

        // Upload image if provided
        if (data.imageFile) {
            const formData = new FormData();
            formData.append('image', data.imageFile);
            const uploadRes = await axiosInstance.post<{ url: string }>('/upload', formData);
            imageUrl = uploadRes.data.url;
        }

        try {
            if (editingBook) {
                await axiosInstance.put(`/books/${editingBook._id}`, { ...data, coverImage: imageUrl });
            } else {
                await axiosInstance.post('/books', { ...data, coverImage: imageUrl });
            }
            // Refresh
            const res = await axiosInstance.get<Book[]>('/books');
            setBooks(res.data);
            handleCloseModal();
        } catch (err) {

            console.error('Save failed', err);
        }
    };

    const handleEdit = (book: Book) => {
        setEditingBook(book);
        setIsModalOpen(true);
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this book?')) return;
        try {
            await axiosInstance.delete(`/books/${id}`);
            setBooks(books.filter(b => b._id !== id));
        } catch (err) {
            console.error('Delete failed');
            console.log(err)
        }
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setEditingBook(null);
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Book Management</h1>

            <button
                onClick={() => setIsModalOpen(true)}
                className="bg-green-500 text-white px-4 py-2 mb-4"
            >
                + Add New Book
            </button>

            <BookTable
                books={books}
                genres={genres}
                onEdit={handleEdit}
                onDelete={handleDelete}
            />

            <BookFormModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                onSubmit={handleFormSubmit}
                initialData={editingBook}
                genres={genres}
            />
        </div>
    );
};

export default Page;