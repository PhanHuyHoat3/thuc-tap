import React, { useCallback } from 'react';
import { Card, CardContent, Typography, Button, CardActions, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteBlog } from '../api/api';

export default function PostItem({ post }) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: () => deleteBlog(post.id),

    onMutate: async () => {
      await queryClient.cancelQueries(['posts']);
      const previousPosts = queryClient.getQueryData(['posts']);

      queryClient.setQueryData(['posts'], old => {
        if (!old || !old.data) return old;
        return {
          ...old,
          data: old.data.filter(p => p.id !== post.id),
        };
      });
      alert('Xóa thành công');
      return { previousPosts };
    },

    onError: (err, _, context) => {
      if (context?.previousPosts) {
        queryClient.setQueryData(['posts'], context.previousPosts);
      }
    },
  });

  const handleDelete = useCallback(() => {
    if (window.confirm('Bạn có chắc chắn muốn xóa bài viết này?')) {
      deleteMutation.mutate();
    }
  }, [deleteMutation]);

  return (
    <Box maxWidth={800} mx="auto" mb={4}>
      <Card>
        <CardContent>
          <Typography variant="h5" component="div" gutterBottom>
            {post.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {post.content}
          </Typography>
          <Typography variant="caption" color="text.secondary" display="block" mt={1}>
            Tác giả: {post.author}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" onClick={() => navigate(`/posts/${post.id}`)}>
            Chi tiết
          </Button>
          <Button size="small" onClick={() => navigate(`/posts/${post.id}/edit`)}>
            Sửa
          </Button>
          <Button
            size="small"
            color="error"
            onClick={handleDelete}
            disabled={deleteMutation.isLoading}
          >
            {deleteMutation.isLoading ? 'Đang xóa...' : 'Xóa'}
          </Button>
        </CardActions>
      </Card>
    </Box>
  );
}