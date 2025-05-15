    import React, { useState, useEffect, useCallback } from 'react';
    import { useNavigate } from 'react-router-dom';
    import TaskList from '../components/TaskList';
    import TaskForm from '../components/TaskForm';
    import { getTasks, createTask, deleteTask } from '../api/api';
    import styles from '../styles/Tasks.module.css';

    const Tasks = () => {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [filter, setFilter] = useState('all');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchTasks = async () => {
        setLoading(true);
        try {
            const data = await getTasks();
            setTasks(data);
        } catch (err) {
            setError('Failed to fetch tasks.');
        } finally {
            setLoading(false);
        }
        };
        fetchTasks();
    }, []);

    const handleCreate = async (task) => {
        try {
        const newTask = await createTask(task);
        setTasks([...tasks, newTask]);
        } catch (err) {
        setError('Failed to create task.');
        }
    };

    const handleDelete = useCallback(async (id) => {
        try {
        await deleteTask(id);
        setTasks(tasks.filter((task) => task.id !== id));
        } catch (err) {
        setError('Failed to delete task.');
        }
    }, [tasks]);

    const handleEdit = useCallback((task) => {
        navigate(`/tasks/${task.id}/edit`);
    }, [navigate]);

    if (loading) return <div className={styles.loading}>Loading...</div>;
    if (error) return <div className={styles.error}>{error}</div>;

    return (
        <div className={styles.tasks}>
        <h1>Todo App</h1>
        <TaskForm onSubmit={handleCreate} />
        <div className={styles.filters}>
            <button
            onClick={() => setFilter('all')}
            className={filter === 'all' ? styles.active : ''}
            >
            All
            </button>
            <button
            onClick={() => setFilter('completed')}
            className={filter === 'completed' ? styles.active : ''}
            >
            Completed
            </button>
            <button
            onClick={() => setFilter('pending')}
            className={filter === 'pending' ? styles.active : ''}
            >
            Pending
            </button>
        </div>
        <TaskList
            tasks={tasks}
            onEdit={handleEdit}
            onDelete={handleDelete}
            filterCompleted={filter}
        />
        </div>
    );
    };

    export default Tasks;