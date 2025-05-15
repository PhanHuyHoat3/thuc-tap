import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { CircularProgress, Alert } from '@mui/material';
import { getBlog } from '../api/api';

export default function PostDetail() {
  const { id } = useParams();

  const { data, error, isLoading, isError } = useQuery({
    queryKey: ['post', id],
    queryFn: () => getBlog(id),
  });

  if (isLoading) return <CircularProgress />;
  if (isError) return <Alert severity="error">Lỗi: {error.message}</Alert>;

  const post = data;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-3xl font-bold mb-4 text-gray-900">{post.title}</h1>
      <p className="text-base text-gray-700 whitespace-pre-line">{post.content}</p>
      <p className="text-sm text-gray-500 mt-6">Tác giả: {post.author}</p>
    </div>
  );
}