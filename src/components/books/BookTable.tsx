// components/admin/books/BookTable.tsx
'use client';
import Image from 'next/image';
type Genre = { _id: string; name: string };
type Book = {
  _id: string;
  title: string;
  author: string;
  genre: string;
  description: string;
  coverImage: string;
};

export default function BookTable({
  books,
  genres,
  onEdit,
  onDelete,
}: {
  books: Book[];
  genres: Genre[];
  onEdit: (book: Book) => void;
  onDelete: (id: string) => void;
}) {
  const getGenreName = (genreId: string) => {
    return genres.find(g => g._id === genreId)?.name || '—';
  };

  return (
    <table className="min-w-full border">
      <thead>
        <tr>
          <th className="border p-2">Cover</th>
          <th className="border p-2">Title</th>
          <th className="border p-2">Author</th>
          <th className="border p-2">Genre</th>
          <th className="border p-2">Actions</th>
        </tr>
      </thead>
      <tbody>
        {books.map(book => (
          <tr key={book._id}>
            <td className="border p-2">
              {book.coverImage && (
                <Image width={450} height={450} src={book.coverImage} alt={book.title} className="w-10 h-10 object-cover" />
              )}
            </td>
            <td className="border p-2">{book.title}</td>
            <td className="border p-2">{book.author}</td>
            <td className="border p-2">{getGenreName(book.genre)}</td>
            <td className="border p-2">
              <button onClick={() => onEdit(book)} className="text-blue-500 mr-2">
                Edit
              </button>
              <button onClick={() => onDelete(book._id)} className="text-red-500">
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}