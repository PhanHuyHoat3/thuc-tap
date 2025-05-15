import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import TaskItem from '../components/TaskItem';

// Mock CSS Modules với default export
vi.mock('../styles/TaskItem.module.css', () => ({
  default: {
    taskItem: 'taskItem',
    checkbox: 'checkbox',
    title: 'title',
    actions: 'actions',
    editBtn: 'editBtn',
    deleteBtn: 'deleteBtn',
  },
}));

describe('Thành phần TaskItem', () => {
  const mockTask = { id: '2', title: 'quis ut nam facilis et officia quihjkjh', completed: false };
  const mockTaskCompleted = { id: '3', title: 'Công việc đã hoàn thành', completed: true };
  const onEdit = vi.fn();
  const onDelete = vi.fn();

  it('hiển thị tiêu đề công việc và checkbox không được chọn', () => {
    render(<TaskItem task={mockTask} onEdit={onEdit} onDelete={onDelete} />);
    expect(screen.getByText('quis ut nam facilis et officia quihjkjh')).toBeInTheDocument();
    expect(screen.getByRole('checkbox')).not.toBeChecked();
  });

  it('hiển thị checkbox được chọn khi công việc hoàn thành', () => {
    render(<TaskItem task={mockTaskCompleted} onEdit={onEdit} onDelete={onDelete} />);
    expect(screen.getByText('Công việc đã hoàn thành')).toBeInTheDocument();
    expect(screen.getByRole('checkbox')).toBeChecked();
  });

  it('gọi onEdit khi nhấn nút Edit', () => {
    render(<TaskItem task={mockTask} onEdit={onEdit} onDelete={onDelete} />);
    fireEvent.click(screen.getByText('Edit'));
    expect(onEdit).toHaveBeenCalledWith(mockTask);
  });

  it('gọi onDelete khi nhấn nút Delete', () => {
    render(<TaskItem task={mockTask} onEdit={onEdit} onDelete={onDelete} />);
    fireEvent.click(screen.getByText('Delete'));
    expect(onDelete).toHaveBeenCalledWith(mockTask.id);
  });

  it('render đúng các lớp CSS', () => {
    render(<TaskItem task={mockTask} onEdit={onEdit} onDelete={onDelete} />);
    const container = screen.getByText(mockTask.title).closest('div');
    expect(container).toHaveClass('taskItem');
    expect(screen.getByRole('checkbox')).toHaveClass('checkbox');
    expect(screen.getByText(mockTask.title)).toHaveClass('title');
    expect(screen.getByText('Edit')).toHaveClass('editBtn');
    expect(screen.getByText('Delete')).toHaveClass('deleteBtn');
  });
});