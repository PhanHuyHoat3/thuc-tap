    import React, { useState, useEffect } from 'react';
    import { useParams, useNavigate } from 'react-router-dom';
    import { getTask } from '../api/api';
    import styles from '../styles/TaskDetail.module.css';

    const TaskDetail = () => {
    const { id } = useParams();
    const [task, setTask] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

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

    if (loading) return <div className={styles.loading}>Loading...</div>;
    if (error) return <div className={styles.error}>{error}</div>;
    if (!task) return null;

    return (
        <div className={styles.taskDetail}>
        <h1>Task Details</h1>
        <h2>{task.title}</h2>
        <p>Status: {task.completed ? 'Completed' : 'Pending'}</p>
        <button
            onClick={() => navigate(`/tasks/${task.id}/edit`)}
            className={styles.editBtn}
        >
            Edit Task
        </button>
        <button
            onClick={() => navigate('/')}
            className={styles.backBtn}
        >
            Back
        </button>
        </div>
    );
    };

    export default TaskDetail;