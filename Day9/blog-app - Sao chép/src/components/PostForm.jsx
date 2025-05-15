import React, { useState, useEffect } from 'react';
import { TextField, Button, Box } from '@mui/material';

export default function PostForm({ 
  initialData = { title: '', content: '', author: '' }, 
  onSubmit, 
  formTitle = 'Thêm bài viết mới' // props truyền tiêu đề form
}) {
  const [title, setTitle] = useState(initialData.title);
  const [content, setContent] = useState(initialData.content);
  const [author, setAuthor] = useState(initialData.author);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setTitle(initialData.title);
    setContent(initialData.content);
    setAuthor(initialData.author);
  }, [initialData]);

  const validate = () => {
    const errs = {};
    if (!title.trim()) errs.title = 'Tiêu đề không được để trống';
    if (!content.trim()) errs.content = 'Nội dung không được để trống';
    if (!author.trim()) errs.author = 'Tên tác giả không được để trống';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    onSubmit({
      title: title.trim(),
      content: content.trim(),
      author: author.trim(),
    });
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md"
    >
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">{formTitle}</h1>

      <TextField
        label="Tiêu đề"
        fullWidth
        margin="normal"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        error={!!errors.title}
        helperText={errors.title}
        inputProps={{ maxLength: 100 }}
      />
      <TextField
        label="Nội dung"
        fullWidth
        margin="normal"
        multiline
        minRows={4}
        value={content}
        onChange={(e) => setContent(e.target.value)}
        error={!!errors.content}
        helperText={errors.content}
      />
      <TextField
        label="Tác giả"
        fullWidth
        margin="normal"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
        error={!!errors.author}
        helperText={errors.author}
      />
      <Box mt={4} className="flex justify-end">
        <Button variant="contained" type="submit" color="primary" className="px-6 py-2">
          Submit
        </Button>
      </Box>
    </Box>
  );
}