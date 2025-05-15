    import React from 'react';
    import styles from '../styles/TaskItem.module.css';

    const TaskItem = ({ task, onEdit, onDelete }) => {
    return (
        <div className={styles.taskItem}>
        <input
            type="checkbox"
            checked={task.completed}
            readOnly
            className={styles.checkbox}
        />
        <h3 className={styles.title}>{task.title}</h3>
        <div className={styles.actions}>
            <button onClick={() => onEdit(task)} className={styles.editBtn}>
            Edit
            </button>
            <button onClick={() => onDelete(task.id)} className={styles.deleteBtn}>
            Delete
            </button>
        </div>
        </div>
    );
    };

    export default TaskItem;