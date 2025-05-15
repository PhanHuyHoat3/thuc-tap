import React from 'react';
import { Button, Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();

  return (
    <Box className="text-center mt-20">
      <Typography variant="h3" gutterBottom>Chào mừng đến với Blog-App</Typography>
      <Button variant="contained" onClick={() => navigate('/posts')}>Xem bài viết</Button>
    </Box>
  );
}