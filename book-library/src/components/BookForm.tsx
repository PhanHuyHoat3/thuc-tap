'use client';

import { useMutation } from '@apollo/client';
import { CREATE_POST, UPDATE_POST } from '@/graphql/mutations';
import { useState } from 'react';
import { useRouter } from 'next/navigation';


interface Book {
  id: string;
  title: string;
  body: string;
}

interface BookFormProps {
  book?: Book;
}

export default function BookForm({ book }: BookFormProps) {
  const [title, setTitle] = useState(book?.title || '');
  const [body, setBody] = useState(book?.body || '');
  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const router = useRouter();

  const [createPost] = useMutation(CREATE_POST, {
    refetchQueries: ['GetBooks'],
  });

  const [updatePost] = useMutation(UPDATE_POST, {
    refetchQueries: ['GetBooks'],
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    if (!title.trim() || !body.trim()) {
      setFormError('Title and Body are required.');
      return;
    }

    setLoading(true);

    try {
      if (book) {
        await updatePost({
          variables: {
            id: book.id,
            input: { title, body },
          },
        });
        alert(' sua thanh cong.');
      } else {
        await createPost({
          variables: {
            input: { title, body },
          },
        });
        alert('them thanh cong.');
        setTitle('');
        setBody('');
      }
      router.push('/books');
    } catch (err: any) {
      setFormError(err.message || 'Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">
        {book ? 'Edit Book' : 'Add New Book'}
      </h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          className="border p-2 rounded"
          required
        />
        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder="Body"
          className="border p-2 rounded h-32"
          required
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? 'Submitting...' : book ? 'Update Post' : 'Create Post'}
        </button>
        {formError && <p className="text-red-500">{formError}</p>}
      </form>
    </div>
  );
}
