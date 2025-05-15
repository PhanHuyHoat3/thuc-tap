    import { render, screen, waitFor, fireEvent } from '@testing-library/react';
    import { MemoryRouter, Route, Routes } from 'react-router-dom';
    import { describe, it, expect, vi, beforeEach } from 'vitest';
    import * as api from '../api/api';
    import TaskEdit from '../components/TaskEdit'; 

    vi.mock('../api/api');

    // Mock useNavigate
    const mockNavigate = vi.fn();
    vi.mock('react-router-dom', async () => {
    const actual = await vi.importActual('react-router-dom');
    return {
        ...actual,
        useParams: () => ({ id: '2' }),
        useNavigate: () => mockNavigate,
    };
    });

    describe('TaskEdit', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('hiển thị form chỉnh sửa sau khi fetch thành công', async () => {
        api.getTask.mockResolvedValue({ id: 2, title: 'quis ut nam facilis et officia quihjkjh', completed: false });

        render(
        <MemoryRouter initialEntries={['/tasks/2/edit']}>
            <Routes>
            <Route path="/tasks/:id/edit" element={<TaskEdit />} />
            </Routes>
        </MemoryRouter>
        );

        // Check input loaded with value
        expect(await screen.findByDisplayValue('quis ut nam facilis et officia quihjkjh')).toBeInTheDocument();
        expect(screen.getByText('Update Task')).toBeInTheDocument();
    });

    it('hiển thị trạng thái loading ban đầu', () => {
        api.getTask.mockReturnValue(new Promise(() => {})); // giữ pending

        render(
        <MemoryRouter initialEntries={['/tasks/2/edit']}>
            <Routes>
            <Route path="/tasks/:id/edit" element={<TaskEdit />} />
            </Routes>
        </MemoryRouter>
        );

        expect(screen.getByText('Loading...')).toBeInTheDocument();
    });

    it('submit form và gọi updateTask thành công', async () => {
        api.getTask.mockResolvedValue({ id: 2, title: 'quis ut nam facilis et officia quihjkjh', completed: false });
        api.updateTask = vi.fn().mockResolvedValue({});

        render(
        <MemoryRouter initialEntries={['/tasks/2/edit']}>
            <Routes>
            <Route path="/tasks/:id/edit" element={<TaskEdit />} />
            </Routes>
        </MemoryRouter>
        );

        const input = await screen.findByDisplayValue('quis ut nam facilis et officia quihjkjh');
        fireEvent.change(input, { target: { value: 'Updated Task' } });
        fireEvent.click(screen.getByText('Update Task'));

        await waitFor(() => {
        expect(api.updateTask).toHaveBeenCalledWith('2', {
            title: 'Updated Task',
            completed: false,
        });
        expect(mockNavigate).toHaveBeenCalledWith('/');
        });
    });
    });
