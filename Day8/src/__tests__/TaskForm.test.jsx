import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { vi } from 'vitest';
import * as api from '../api/api';
import TaskForm from '../components/TaskForm'; // <-- Đảm bảo đúng đường dẫn

// ✅ Mock API
vi.mock('../api/api');

// ✅ Mock useNavigate
const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe('TaskForm', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it('hiển thị biểu mẫu với tiêu đề, input, nút submit', () => {
    render(
      <MemoryRouter>
        <TaskForm onSubmit={vi.fn()} />
      </MemoryRouter>
    );

    expect(screen.getByPlaceholderText(/task title/i)).toBeInTheDocument();
    expect(screen.getByRole('checkbox')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /add task/i })).toBeInTheDocument();
  });

  it('gửi biểu mẫu với dữ liệu hợp lệ', async () => {
    const mockSubmit = vi.fn();

    render(
      <MemoryRouter>
        <TaskForm onSubmit={mockSubmit} />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByPlaceholderText(/task title/i), {
      target: { value: 'New Task' },
    });
    fireEvent.click(screen.getByRole('checkbox')); // chọn hoàn thành
    fireEvent.click(screen.getByRole('button', { name: /add task/i }));

    await waitFor(() => {
      expect(mockSubmit).toHaveBeenCalledWith({
        title: 'New Task',
        completed: true,
      });
    });
  });

  it('không gửi biểu mẫu nếu tiêu đề rỗng', async () => {
    const mockSubmit = vi.fn();

    render(
      <MemoryRouter>
        <TaskForm onSubmit={mockSubmit} />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByRole('button', { name: /add task/i }));

    await waitFor(() => {
      expect(mockSubmit).not.toHaveBeenCalled();
    });
  });

  it('hiển thị nút Cancel nếu có onCancel', () => {
    const mockCancel = vi.fn();

    render(
      <MemoryRouter>
        <TaskForm onSubmit={vi.fn()} onCancel={mockCancel} />
      </MemoryRouter>
    );

    const cancelButton = screen.getByRole('button', { name: /cancel/i });
    expect(cancelButton).toBeInTheDocument();

    fireEvent.click(cancelButton);
    expect(mockCancel).toHaveBeenCalled();
  });
});
