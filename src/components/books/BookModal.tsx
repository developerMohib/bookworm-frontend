'use client';

import Image from 'next/image';
import { useState } from 'react';

type Genre = { _id: string; name: string };
type Book = {
  _id?: string;
  title: string;
  author: string;
  genre: string;
  description: string;
  coverImage: string;
};

export default function BookFormModal({
  isOpen,
  onClose,
  onSubmit,
  initialData,
  genres,
}: {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: Omit<Book, '_id'> & { imageFile?: File }) => void;
  initialData?: Book | null;
  genres: Genre[];
}) {
  const [formData, setFormData] = useState({
    title: initialData?.title || '',
    author: initialData?.author || '',
    genre: initialData?.genre || '',
    description: initialData?.description || '',
    coverImage: initialData?.coverImage || '',
  });
  const [file, setFile] = useState<File | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ ...formData, imageFile: file });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">
          {initialData ? 'Edit Book' : 'Create Book'}
        </h2>
        <form onSubmit={handleSubmit}>
          <input
            name="title"
            placeholder="Title"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full p-2 border mb-3"
          />
          <input
            name="author"
            placeholder="Author"
            value={formData.author}
            onChange={handleChange}
            required
            className="w-full p-2 border mb-3"
          />
          <select
            name="genre"
            value={formData.genre}
            onChange={handleChange}
            required
            className="w-full p-2 border mb-3"
          >
            <option value="">Select Genre</option>
            {genres.map(g => (
              <option key={g._id} value={g._id}>{g.name}</option>
            ))}
          </select>
          <textarea
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
            required
            className="w-full p-2 border mb-3"
          />
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="mb-3"
          />
          {formData.coverImage && !file && (
            <Image width={450} height={450} src={formData.coverImage} alt="Preview" className="w-16 h-16 object-cover mb-3" />
          )}
          <div className="flex gap-2">
            <button type="submit" className="bg-blue-500 text-white px-4 py-2">
              {initialData ? 'Update' : 'Create'}
            </button>
            <button type="button" onClick={onClose} className="bg-gray-500 text-white px-4 py-2">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}