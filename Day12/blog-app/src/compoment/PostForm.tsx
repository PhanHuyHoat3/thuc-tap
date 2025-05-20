'use client';

import { useState } from 'react';

interface PostFormProps {
  onSubmit: (data: { title: string; body: string }) => void;
}

export default function PostForm({ onSubmit }: PostFormProps) {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim() && body.trim()) {
      onSubmit({ title, body });
      setTitle('');
      setBody('');
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto mt-10 bg-white p-6 rounded-lg shadow-lg space-y-6"
    >
      <h2 className="text-2xl font-bold text-center text-blue-600">Thêm bài viết mới</h2>

      <div>
        <label htmlFor="title" className="block mb-1 font-medium text-gray-700">
          Tiêu đề
        </label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Nhập tiêu đề bài viết"
          required
        />
      </div>

      <div>
        <label htmlFor="body" className="block mb-1 font-medium text-gray-700">
          Nội dung
        </label>
        <textarea
          id="body"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          rows={6}
          className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Nhập nội dung bài viết"
          required
        />
      </div>

      <div className="text-center">
        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        >
          Thêm bài viết
        </button>
      </div>
    </form>
  );
}