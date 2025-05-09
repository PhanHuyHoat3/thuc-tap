    // src/pages/PostDetail.jsx
    import React from 'react';
    import { useParams, Link, useNavigate } from 'react-router-dom';
    import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
    import { getPost, deletePost } from '../api/api';

    function PostDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const { data, isLoading, isError, error } = useQuery({
        queryKey: ['post', id],
        queryFn: () => getPost(id),
    });

    const deleteMutation = useMutation({
        mutationFn: () => deletePost(id),
        onSuccess: () => {
        queryClient.invalidateQueries(['posts']);
        navigate('/');
        },
    });

    if (isLoading) return <div>Đang tải bài viết...</div>;
    if (isError) return <div>Lỗi: {error.message}</div>;

    return (
        <div>
        <h2>{data.title}</h2>
        <p>{data.body}</p>
        <Link to={`/posts/${id}/edit`}>Chỉnh sửa</Link> |{' '}
        <button onClick={() => deleteMutation.mutate()}>Xóa</button>
        </div>
    );
    }

    export default PostDetail;
