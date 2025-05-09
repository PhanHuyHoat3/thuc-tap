import { useQuery } from '@tanstack/react-query';
import { getPosts } from '../api/api';
import PostItem from '../components/PostItem';

    function Posts() {
    const { data, isLoading, isError, error } = useQuery({
        queryKey: ['posts'],
        queryFn: getPosts,
    });

    if (isLoading) return <div>Đang tải danh sách bài viết...</div>;
    if (isError) return <div>Lỗi: {error.message}</div>;

    return (
        <div>
        <h2>Danh sách bài viết</h2>
        {data.map((post) => (
            <PostItem key={post.id} post={post} />
        ))}
        </div>
    );
    }

    export default Posts;
