    // src/components/PostForm.jsx
    import React, { useState, useEffect } from 'react';
    import { useNavigate, useParams } from 'react-router-dom';
    import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
    import { createPost, updatePost, getPost } from '../api/api';

    function PostForm() {
    const { id } = useParams();
    const isEdit = Boolean(id);
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');

    const { data: postData, isLoading } = useQuery({
        queryKey: ['post', id],
        queryFn: () => getPost(id),
        enabled: isEdit,
    });

    useEffect(() => {
        if (postData) {
        setTitle(postData.title);
        setBody(postData.body);
        }
    }, [postData]);

    const mutation = useMutation({
        mutationFn: (newPost) => (isEdit ? updatePost(id, newPost) : createPost(newPost)),
        onSuccess: () => {
        queryClient.invalidateQueries(['posts']);
        navigate('/');
        },
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        mutation.mutate({ title, body });
    };

    if (isEdit && isLoading) return <div>Đang tải dữ liệu...</div>;

    return (
        <form onSubmit={handleSubmit}>
        <h2>{isEdit ? 'Chỉnh sửa bài viết' : 'Tạo bài viết mới'}</h2>
        <div>
            <label>Tiêu đề:</label>
            <input value={title} onChange={(e) => setTitle(e.target.value)} required />
        </div>
        <div>
            <label>Nội dung:</label>
            <textarea value={body} onChange={(e) => setBody(e.target.value)} required />
        </div>
        <button type="submit">{isEdit ? 'Cập nhật' : 'Tạo mới'}</button>
        {mutation.isError && <div>Lỗi: {mutation.error.message}</div>}
        </form>
    );
    }

    export default PostForm;
