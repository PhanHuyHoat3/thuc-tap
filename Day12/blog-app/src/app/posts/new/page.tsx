'use client';

import { useRouter } from 'next/navigation';
import { createBlog } from '@/api/api';
import PostForm from '@/compoment/PostForm';

export default function NewPostPage() {
  const router = useRouter();

  const handleAddPost = async (data: { title: string; body: string }) => {
    try {
      await createBlog(data);
      router.push('/posts');
    } catch (error) {
      console.error('Lỗi khi tạo bài viết:', error);
      alert('Có lỗi xảy ra khi thêm bài viết.');
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <PostForm onSubmit={handleAddPost} />
    </div>
  );
}