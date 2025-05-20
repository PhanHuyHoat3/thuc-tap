import { getBlogs } from '@/api/api';
import PostItem from '@/compoment/PostItem';
import { Post } from '@/types/post';

export default async function PostsPage() {
  const blogs: Post[] = await getBlogs();

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6 text-center">Danh sách bài viết</h1>
      
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {blogs.map((post) => (
          <PostItem key={post.id} post={post} />
        ))}
      </ul>
    </div>
  );
}