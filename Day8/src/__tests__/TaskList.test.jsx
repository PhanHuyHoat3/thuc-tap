import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import TaskItem from '../components/TaskItem';
import { BrowserRouter } from 'react-router-dom';

describe('TaskItem', () => {
  const task = {
    id: 1,
    title: 'Công việc kiểm tra',
    completed: true,
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('hiển thị tiêu đề công việc và ô kiểm trạng thái hoàn thành', () => {
    render(
      <BrowserRouter>
        <TaskItem task={task} onEdit={vi.fn()} onDelete={vi.fn()} />
      </BrowserRouter>
    );

    expect(screen.getByText('Công việc kiểm tra')).toBeInTheDocument();
    expect(screen.getByRole('checkbox')).toBeChecked();
  });

  it('gọi hàm onEdit khi nhấn nút Sửa', () => {
    const mockEdit = vi.fn();

    render(
      <BrowserRouter>
        <TaskItem task={task} onEdit={mockEdit} onDelete={vi.fn()} />
      </BrowserRouter>
    );

    fireEvent.click(screen.getByRole('button', { name: /edit/i }));

    expect(mockEdit).toHaveBeenCalledWith(task);
  });

  it('gọi hàm onDelete khi nhấn nút Xóa', () => {
    const mockDelete = vi.fn();

    render(
      <BrowserRouter>
        <TaskItem task={task} onEdit={vi.fn()} onDelete={mockDelete} />
      </BrowserRouter>
    );

    fireEvent.click(screen.getByRole('button', { name: /delete/i }));

    expect(mockDelete).toHaveBeenCalledWith(1);
  });

  it('ngăn ô kiểm thay đổi trạng thái khi nhấn', () => {
    render(
      <BrowserRouter>
        <TaskItem task={task} onEdit={vi.fn()} onDelete={vi.fn()} />
      </BrowserRouter>
    );

    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeChecked();

    fireEvent.click(checkbox);
    expect(checkbox).toBeChecked(); // Vẫn giữ trạng thái đã chọn
  });
});