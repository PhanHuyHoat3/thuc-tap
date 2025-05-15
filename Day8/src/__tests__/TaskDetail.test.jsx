    import { render, screen, waitFor } from "@testing-library/react";
    import { MemoryRouter, Route, Routes } from "react-router-dom";
    import { getTask } from "../api/api";
    import TaskDetail from "../pages/TaskDetail";
    import { vi } from "vitest";

    vi.mock("../api/api", () => ({
    getTask: vi.fn(),
    }));

    describe("TaskDetail", () => {
    const taskId = "1";

    test("Lấy chi tiết công việc và hiển thị", async () => {
        getTask.mockResolvedValue({ id: taskId, title: "Task 1", completed: false });

        render(
        <MemoryRouter initialEntries={[`/tasks/${taskId}`]}>
            <Routes>
            <Route path="/tasks/:id" element={<TaskDetail />} />
            </Routes>
        </MemoryRouter>
        );

        const taskTitle = await screen.findByText("Task 1");
        expect(taskTitle).toBeInTheDocument();
    });

    test("Hiển thị thông báo lỗi nếu không thể lấy chi tiết công việc", async () => {
        getTask.mockRejectedValue(new Error("Failed to fetch"));

        render(
        <MemoryRouter initialEntries={[`/tasks/${taskId}`]}>
            <Routes>
            <Route path="/tasks/:id" element={<TaskDetail />} />
            </Routes>
        </MemoryRouter>
        );

        const errorMessage = await screen.findByText("Failed to fetch task.");
        expect(errorMessage).toBeInTheDocument();
    });
    });
