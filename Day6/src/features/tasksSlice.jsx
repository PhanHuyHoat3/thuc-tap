    import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
    import axios from 'axios';
    const TASKS_API = 'http://localhost:3001/todos';
    export const fetchTasks = createAsyncThunk('tasks/fetchTasks', async () => {
    const response = await axios.get(`${TASKS_API}?_limit=10`);
    return response.data;
    });

    export const createTaskAsync = createAsyncThunk('tasks/createTaskAsync', async (task) => {
        const response = await axios.post(TASKS_API, task);
        return response.data; 
    });
    export const updateTaskAsync = createAsyncThunk('tasks/updateTaskAsync', async (task) => {
    const response = await axios.put(`${TASKS_API}/${task.id}`, task);
    return response.data;
    });

    export const deleteTaskAsync = createAsyncThunk('tasks/deleteTaskAsync', async (id) => {
    await axios.delete(`${TASKS_API}/${id}`);
    return id;
    });

    // Load tasks from localStorage
    const loadTasks = () => {
    const tasks = localStorage.getItem('tasks');
    return tasks ? JSON.parse(tasks) : [];
    };

    const tasksSlice = createSlice({
    name: 'tasks',
    initialState: {
        tasks: loadTasks(),
        loading: false,
        error: null,
    },
    reducers: {
        addTask: (state, action) => {
        state.tasks.push(action.payload);
        },
        updateTask: (state, action) => {
        const index = state.tasks.findIndex((task) => task.id === action.payload.id);
        if (index !== -1) {
            state.tasks[index] = action.payload;
        }
        },
        deleteTask: (state, action) => {
        state.tasks = state.tasks.filter((task) => task.id !== action.payload);
        },
    },
    extraReducers: (builder) => {
        builder
        .addCase(fetchTasks.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(fetchTasks.fulfilled, (state, action) => {
            state.loading = false;
            state.tasks = action.payload;
        })
        .addCase(fetchTasks.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        })
        .addCase(createTaskAsync.fulfilled, (state, action) => {
            state.tasks.push(action.payload);
        })
        .addCase(updateTaskAsync.fulfilled, (state, action) => {
            const index = state.tasks.findIndex((task) => task.id === action.payload.id);
            if (index !== -1) {
            state.tasks[index] = action.payload;
            }
        })
        .addCase(deleteTaskAsync.fulfilled, (state, action) => {
            state.tasks = state.tasks.filter((task) => task.id !== action.payload);
        });
    },
    });

    export const { addTask, updateTask, deleteTask } = tasksSlice.actions;
    export default tasksSlice.reducer;
