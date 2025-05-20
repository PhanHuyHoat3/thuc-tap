import axios from 'axios';
import { Post } from '@/types/post';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const getBlogs = async (): Promise<Post[]> => {
  const response = await fetch(`${API_URL}?_limit=10`, {
    cache: 'no-store',
  });
  return response.json();
};

export const getBlog = async (id: string | number): Promise<Post> => {
  const response = await axios.get<Post>(`${API_URL}/${id}`);
  return response.data;
};

export const createBlog = async (blog: Omit<Post, 'id'>): Promise<Post> => {
  const response = await axios.post<Post>(API_URL, blog);
  return response.data;
};

export const deleteBlog = async (id: string | number): Promise<void> => {
  await axios.delete(`${API_URL}/${id}`);
};