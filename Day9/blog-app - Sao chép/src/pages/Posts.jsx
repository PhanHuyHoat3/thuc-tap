import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { getBlogs } from '../api/api';
import PostItem from '../components/PostItem';
import { Grid, Typography, CircularProgress, Alert } from '@mui/material';

export default function Posts() {
  const { data:post, error, isLoading, isError } = useQuery({
    queryKey: ['posts'],
    queryFn: getBlogs,
  });
  console.log('post', post);
  

  if (isLoading) return <CircularProgress />;
  if (isError) return <Alert severity="error">Lỗi: {error.message}</Alert>;

  return (
    <Grid container spacing={2}>
      {post.map(post => (
        <Grid item xs={12} sm={6} md={4} key={post.id}>
          <PostItem post={post} />
        </Grid>
      ))}
    </Grid>
  );
}