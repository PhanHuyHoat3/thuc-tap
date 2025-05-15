import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, test, expect, vi, beforeEach } from 'vitest';

import PostItem from '../components/PostItem';

const mockNavigate = vi.fn();

vi.mock('react-router-dom', () => ({
  useNavigate: () => mockNavigate,
}));

const mockMutate = vi.fn();

vi.mock('@tanstack/react-query', () => ({
  useMutation: () => ({
    mutate: mockMutate,
    isLoading: false,
  }),
  useQueryClient: () => ({
    cancelQueries: vi.fn(),
    getQueryData: vi.fn(),
    setQueryData: vi.fn(),
  }),
}));

describe('PostItem', () => {
  const post = {
    id: 1,
    title: 'Tiêu đề bài viết',
    content: 'Đoạn trích nội dung bài viết',
    author: 'Nguyễn Văn A',
  };

  beforeEach(() => {
    vi.clearAllMocks();
    window.confirm = vi.fn();
  });

  test('hiển thị đúng tiêu đề, nội dung và tác giả', () => {
    render(<PostItem post={post} />);
    expect(screen.getByText(post.title)).toBeInTheDocument();
    expect(screen.getByText(post.content)).toBeInTheDocument();
    expect(screen.getByText(`Tác giả: ${post.author}`)).toBeInTheDocument();
  });

  test('điều hướng đến trang sửa khi nhấn "Sửa"', () => {
    render(<PostItem post={post} />);
    fireEvent.click(screen.getByText('Sửa'));
    expect(mockNavigate).toHaveBeenCalledWith(`/posts/${post.id}/edit`);
  });

  test('điều hướng đến trang chi tiết khi nhấn "Chi tiết"', () => {
    render(<PostItem post={post} />);
    fireEvent.click(screen.getByText('Chi tiết'));
    expect(mockNavigate).toHaveBeenCalledWith(`/posts/${post.id}`);
  });

  test('gọi mutate khi xác nhận xóa bài viết', () => {
    window.confirm.mockReturnValue(true);

    render(<PostItem post={post} />);
    fireEvent.click(screen.getByText('Xóa'));

    expect(window.confirm).toHaveBeenCalledWith('Bạn có chắc chắn muốn xóa bài viết này?');
    expect(mockMutate).toHaveBeenCalled();
  });

  test('không gọi mutate khi hủy xóa bài viết', () => {
    window.confirm.mockReturnValue(false);

    render(<PostItem post={post} />);
    fireEvent.click(screen.getByText('Xóa'));

    expect(window.confirm).toHaveBeenCalled();
    expect(mockMutate).not.toHaveBeenCalled();
  });
});