    import React from 'react'
    import { useMutation, useQueryClient } from '@tanstack/react-query'
    import { Link } from 'react-router-dom'
    import { deletePost } from '../api/api'
    function PostItem({post}) {
        const queryClient = useQueryClient()
        const deleteMutation = useMutation({
            mutationFn: () => deletePost(post.id),
            onSuccess: () => {
                queryClient.invalidateQueries(['posts'])
            }
        })
    return (
        <div>
            <h3>{post.title}</h3>
            <p>{post.body.substring(0, 100)}....</p>
            <Link to={`/posts/${post.id}`}>Xem chi tiết</Link>
            <Link to={`/posts/${post.id}/edit`}>Chinh sua</Link>
            <button onClick={()=>deleteMutation.mutate()}>Xoa</button>
        </div>
    )
    }

    export default PostItem
