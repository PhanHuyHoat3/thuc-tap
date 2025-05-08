import React from 'react';
import { Button, Card, CardContent, Typography, Box } from '@mui/material';
import { Link } from 'react-router-dom';

const NoteItem = ({ note, onEdit, onDelete }) => {
  const formattedDate = new Date(note.createdAt);
  const isValidDate = !Number.isNaN(formattedDate);

  return (
    <Card sx={{ mb: 2, borderRadius: 2 }} style={{margin: "10px 0"}}>
      <CardContent>
        <Box sx={{ mb: 2 }}>
          <Typography variant="h6" component="div">
            {note.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {isValidDate ? formattedDate.toLocaleDateString() : 'Ngày không hợp lệ'}
          </Typography>
          <Typography variant="body1" sx={{ mt: 1 }}>
            {note.snippet}
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button variant="outlined" color="primary">
            <Link to={`/notes/${note.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
              Chi tiết
            </Link>
          </Button>
          <Button variant="outlined" color="primary" onClick={() => onEdit(note)}>
            Chỉnh sửa
          </Button>
          <Button variant="outlined" color="error" onClick={() => onDelete(note.id)}>
            Xóa
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default NoteItem;