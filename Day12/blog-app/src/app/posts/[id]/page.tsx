import { getBlog } from '@/api/api';
import { Post } from '@/types/post';
import Link from 'next/link';

interface PostDetailPageProps {
  params: {
    id: string;
  };
}

export default async function PostDetailPage({ params }: PostDetailPageProps) {
  const post: Post = await getBlog(params.id);

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-2">{post.title}</h1>
        <p className="text-sm text-gray-500">Mã bài viết: <span className="font-medium">{post.id}</span></p>
      </div>

      <div className="prose max-w-none prose-lg text-gray-800 mb-8">
        <p>{post.body}</p>
      </div>

      <div>
        <Link
          href="/posts"
          className="inline-block bg-blue-600 text-white px-5 py-2 rounded-md hover:bg-blue-700 transition-colors duration-200"
        >
          ← Quay lại danh sách bài viết
        </Link>
      </div>
    </div>
  );
}
