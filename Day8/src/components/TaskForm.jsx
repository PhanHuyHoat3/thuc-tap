    import React, { useState, useEffect } from 'react';
    import styles from '../styles/TaskForm.module.css';

    const TaskForm = ({ task, onSubmit, onCancel }) => {
    const [title, setTitle] = useState(task?.title || '');
    const [completed, setCompleted] = useState(task?.completed || false);

    useEffect(() => {
        if (task) {
        setTitle(task.title);
        setCompleted(task.completed);
        }
    }, [task]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!title.trim()) return;
        onSubmit({ title, completed });
        setTitle('');
        setCompleted(false);
    };

    return (
        <form onSubmit={handleSubmit} className={styles.taskForm}>
        <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Task title"
            className={styles.input}
        />
        <label className={styles.checkboxLabel}>
            <input
            type="checkbox"
            checked={completed}
            onChange={(e) => setCompleted(e.target.checked)}
            />
            Completed
        </label>
        <div className={styles.actions}>
            <button type="submit" className={styles.submitBtn}>
            {task ? 'Update' : 'Add'} Task
            </button>
            {onCancel && (
            <button
                type="button"
                onClick={onCancel}
                className={styles.cancelBtn}
            >
                Cancel
            </button>
            )}
        </div>
        </form>
    );
    };

    export default TaskForm;