import { render, screen, waitFor, fireEvent, act } from '@testing-library/react';
import { vi } from 'vitest';
import Tasks from '../pages/Tasks';
import * as api from '../api/api';
import { BrowserRouter } from 'react-router-dom';

// Mock CSS Modules với default export
vi.mock('../styles/Tasks.module.css', () => ({
  default: {
    tasks: 'tasks',
    loading: 'loading',
    error: 'error',
    filters: 'filters',
    active: 'active',
  },
}));

// Mock TaskItem dựa trên mã nguồn thực tế
vi.mock('../components/TaskItem', () => ({
  default: ({ task, onEdit, onDelete }) => (
    <div data-testid={`task-${task.id}`}>
      {task.title}
      <button onClick={() => onEdit(task)} data-testid={`edit-${task.id}`}>
        Edit
      </button>
      <button onClick={() => onDelete(task.id)} data-testid={`delete-${task.id}`}>
        Delete
      </button>
    </div>
  ),
}));

// Mock TaskList để xử lý filterCompleted
vi.mock('../components/TaskList', () => ({
  default: ({ tasks, onEdit, onDelete, filterCompleted }) => {
    const TaskItem = ({ task, onEdit, onDelete }) => (
      <div data-testid={`task-${task.id}`}>
        {task.title}
        <button onClick={() => onEdit(task)} data-testid={`edit-${task.id}`}>
          Edit
        </button>
        <button onClick={() => onDelete(task.id)} data-testid={`delete-${task.id}`}>
          Delete
        </button>
      </div>
    );
    return (
      <div>
        {tasks
          .filter((task) => {
            if (filterCompleted === 'all') return true;
            if (filterCompleted === 'completed') return task.completed;
            if (filterCompleted === 'pending') return !task.completed;
            return true;
          })
          .map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
      </div>
    );
  },
}));

// Mock TaskForm
vi.mock('../components/TaskForm', () => ({
  default: ({ onSubmit }) => (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit({ title: 'New Task', completed: false });
      }}
    >
      <button type="submit" data-testid="submit-task">
        Add Task
      </button>
    </form>
  ),
}));

// Mock react-router-dom
const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: vi.fn(() => mockNavigate),
    Link: ({ to, children }) => <a href={to}>{children}</a>,
  };
});

describe('Thành phần Tasks', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockNavigate.mockClear();
  });

  it('hiển thị trạng thái đang tải ban đầu', async () => {
    vi.spyOn(api, 'getTasks').mockReturnValue(new Promise(() => {}));
    render(<BrowserRouter><Tasks /></BrowserRouter>);
    expect(screen.getByText(/Loading\.\.\./i)).toBeInTheDocument();
  });

  it('hiển thị thông báo lỗi nếu gọi API thất bại', async () => {
    vi.spyOn(api, 'getTasks').mockRejectedValueOnce(new Error('Lỗi server'));
    render(<BrowserRouter><Tasks /></BrowserRouter>);
    await waitFor(() => {
      expect(screen.getByText(/Failed to fetch tasks\./i)).toBeInTheDocument();
    });
  });

  it('hiển thị danh sách công việc nếu gọi API thành công', async () => {
    const mockTasks = [
      { id: 1, title: 'Công việc 1', completed: false },
      { id: 2, title: 'Công việc 2', completed: true },
    ];
    vi.spyOn(api, 'getTasks').mockResolvedValueOnce(mockTasks);
    render(<BrowserRouter><Tasks /></BrowserRouter>);
    await waitFor(() => {
      expect(screen.getByTestId('task-1')).toHaveTextContent('Công việc 1');
      expect(screen.getByTestId('task-2')).toHaveTextContent('Công việc 2');
    });
  });

  it('hiển thị tiêu đề và nút thêm công việc', async () => {
    vi.spyOn(api, 'getTasks').mockResolvedValueOnce([]);
    render(<BrowserRouter><Tasks /></BrowserRouter>);
    await waitFor(() => {
      expect(screen.getByText(/Todo App/i)).toBeInTheDocument();
      expect(screen.getByTestId('submit-task')).toHaveTextContent('Add Task');
    });
  });

  it('hiển thị các nút lọc và cập nhật bộ lọc khi nhấn', async () => {
    vi.spyOn(api, 'getTasks').mockResolvedValueOnce([
      { id: 1, title: 'Công việc 1', completed: false },
      { id: 2, title: 'Công việc 2', completed: true },
    ]);
    render(<BrowserRouter><Tasks /></BrowserRouter>);
    await waitFor(() => {
      const allButton = screen.getByRole('button', { name: /All/i });
      const completedButton = screen.getByRole('button', { name: /Completed/i });
      const pendingButton = screen.getByRole('button', { name: /Pending/i });
      expect(allButton).toHaveClass('active');
      expect(completedButton).not.toHaveClass('active');
      expect(pendingButton).not.toHaveClass('active');
      fireEvent.click(completedButton);
      expect(completedButton).toHaveClass('active');
      expect(allButton).not.toHaveClass('active');
      expect(pendingButton).not.toHaveClass('active');
      expect(screen.queryByTestId('task-1')).not.toBeInTheDocument();
      expect(screen.getByTestId('task-2')).toBeInTheDocument();
    });
  });

  it('gọi handleCreate khi gửi biểu mẫu thêm công việc', async () => {
    vi.spyOn(api, 'getTasks').mockResolvedValueOnce([]);
    const createTaskSpy = vi.spyOn(api, 'createTask').mockResolvedValueOnce({
      id: 1,
      title: 'New Task',
      completed: false,
    });
    render(<BrowserRouter><Tasks /></BrowserRouter>);
    await waitFor(() => {
      const submitButton = screen.getByTestId('submit-task');
      act(() => {
        fireEvent.click(submitButton);
      });
      expect(createTaskSpy).toHaveBeenCalledWith({ title: 'New Task', completed: false });
    });
  });

  it('gọi handleDelete khi nhấn nút xóa', async () => {
    const mockTasks = [{ id: 1, title: 'Công việc 1', completed: false }];
    vi.spyOn(api, 'getTasks').mockResolvedValueOnce(mockTasks);
    const deleteTaskSpy = vi.spyOn(api, 'deleteTask').mockResolvedValueOnce();
    render(<BrowserRouter><Tasks /></BrowserRouter>);
    await waitFor(() => {
      const deleteButton = screen.getByTestId('delete-1');
      act(() => {
        fireEvent.click(deleteButton);
      });
      expect(deleteTaskSpy).toHaveBeenCalledWith(1);
    });
  });

  it('gọi handleEdit và điều hướng khi nhấn nút chỉnh sửa', async () => {
    const mockTasks = [{ id: 1, title: 'Công việc 1', completed: false }];
    vi.spyOn(api, 'getTasks').mockResolvedValueOnce(mockTasks);
    mockNavigate.mockReset();
    render(<BrowserRouter><Tasks /></BrowserRouter>);
    await waitFor(() => {
      const editButton = screen.getByTestId('edit-1');
      act(() => {
        fireEvent.click(editButton);
      });
      expect(mockNavigate).toHaveBeenCalledWith('/tasks/1/edit');
    });
  });
});