import Link from 'next/link';
import { Post } from '@/types/post';

interface PostItemProps {
  post: Post;
}

export default function PostItem({ post }: PostItemProps) {
  return (
    <li className="bg-white p-4 rounded-lg shadow hover:shadow-md transition duration-300 border border-gray-200">
      <h2 className="text-xl font-semibold text-gray-800 mb-2">{post.title}</h2>
      <p className="text-gray-600 line-clamp-3">{post.body}</p>
      <Link
        href={`/posts/${post.id}`}
        className="inline-block mt-4 text-blue-600 font-medium hover:underline hover:text-blue-800 transition"
      >
        Xem chi tiết →
      </Link>
    </li>
  );
}