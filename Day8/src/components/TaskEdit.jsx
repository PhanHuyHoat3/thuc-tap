    import React, { useState, useEffect } from 'react';
    import { useParams, useNavigate } from 'react-router-dom';
    import { getTask, updateTask } from '../api/api';
    import TaskForm from '../components/TaskForm';
    import styles from '../styles/TaskEdit.module.css';

    const TaskEdit = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [task, setTask] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTask = async () => {
        setLoading(true);
        try {
            const data = await getTask(id);
            setTask(data);
        } catch (err) {
            setError('Failed to fetch task.');
        } finally {
            setLoading(false);
        }
        };
        fetchTask();
    }, [id]);

    const handleSubmit = async (updatedTask) => {
        try {
        await updateTask(id, updatedTask);
        navigate('/'); // Quay lại danh sách task sau khi update
        } catch (err) {
        setError('Failed to update task.');
        }
    };

    const handleCancel = () => {
        navigate('/'); // Quay lại danh sách task
    };

    if (loading) return <div className={styles.loading}>Loading...</div>;
    if (error) return <div className={styles.error}>{error}</div>;
    if (!task) return null;

    return (
        <div className={styles.taskEdit}>
        <h1>Edit Task</h1>
        <TaskForm task={task} onSubmit={handleSubmit} onCancel={handleCancel} />
        </div>
    );
    };

    export default TaskEdit;