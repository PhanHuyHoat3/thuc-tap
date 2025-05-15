import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import PostForm from '../components/PostForm';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { CircularProgress, Alert } from '@mui/material';
import { createBlog, getBlog, updateBlog } from '../api/api';

export default function PostFormPage() {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['post', id],
    queryFn: () => getBlog(id),
    enabled: isEdit,
  });

  const createMutation = useMutation({
    mutationFn: createBlog,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      alert('Thêm mới thành công');
      navigate('/posts');
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, post }) => updateBlog(id, post),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      alert('Cập nhật thành công');
      navigate('/posts');
    },
  });

  const handleSubmit = (postData) => {
    if (isEdit) {
      updateMutation.mutate({ id, post: postData });
    } else {
      createMutation.mutate(postData);
    }
  };

  if (isEdit && isLoading) return <CircularProgress />;
  if (isEdit && isError) return <Alert severity="error">{error.message}</Alert>;

  const initialData = data || { title: '', content: '', author: '' };

  return <PostForm initialData={initialData} onSubmit={handleSubmit} />;
}