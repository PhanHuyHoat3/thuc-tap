        import React from 'react'
        import { useMutation, useQueryClient } from '@tanstack/react-query'
        import { Link } from 'react-router-dom'
        import { deletePost } from '../api/api'
    function PostItem({ post }) {
    const queryClient = useQueryClient();
    const deleteMutation = useMutation({
        mutationFn: () => deletePost(post.id),
        onSuccess: () => {
        queryClient.invalidateQueries(['posts']);
        },
    });

    return (
        <div className='card'>
        <h3>{post.title}</h3>
        <p>{post.body.substring(0, 100)}...</p>
        <div className='action'>
            <Link to={`/posts/${post.id}`}>Xem chi tiết</Link>
            <Link to={`/posts/${post.id}/edit`}>Chỉnh sửa</Link>
            <button onClick={() => deleteMutation.mutate()}>Xóa</button>
        </div>
        </div>
    );
    }

        export default PostItem
