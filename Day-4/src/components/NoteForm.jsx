import React, { useState, useEffect } from 'react';
import { TextField, Button, Box } from '@mui/material';

const initialForm = {
  title: '',
  snippet: '',
};

function NoteForm({ addNote, editNote, editingNote, setEditingNote }) {
  const [formData, setFormData] = useState(initialForm);

  useEffect(() => {
    if (editingNote) {
      setFormData(editingNote);
    } else {
      setFormData(initialForm);
    }
  }, [editingNote]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('formData:', formData);
    if (!formData.title.trim() || !formData.snippet.trim()) return;

    if (editingNote) {
      editNote(formData);
      setEditingNote(null);
    } else {
      const newNote = {
        ...formData,
        createdAt: new Date().toISOString(),
      };
      addNote(newNote);
    }

    setFormData(initialForm);
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
      <TextField
        label="Title"
        name="title"
        variant="outlined"
        fullWidth
        value={formData.title}
        onChange={handleChange}
        sx={{ mb: 2 }}
      />
      <TextField
        label="Snippet"
        name="snippet"
        variant="outlined"
        fullWidth
        multiline
        minRows={3}
        value={formData.snippet}
        onChange={handleChange}
        sx={{ mb: 2 }}
      />
      <Button type="submit" variant="contained" color="primary">
        {editingNote ? 'Cập nhật' : 'Thêm ghi chú'}
      </Button>
    </Box>
  );
}

export default NoteForm;