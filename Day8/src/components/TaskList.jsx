  import React, { useMemo } from 'react';
  import TaskItem from './TaskItem';
  import styles from '../styles/TaskList.module.css';

  const TaskList = ({ tasks, onEdit, onDelete, filterCompleted }) => {
    const filteredTasks = useMemo(() => {
      if (filterCompleted === 'all') return tasks;
      return tasks.filter((task) =>
        filterCompleted === 'completed' ? task.completed : !task.completed
      );
    }, [tasks, filterCompleted]);

    if (!filteredTasks.length) {
      return <p className={styles.empty}>No tasks available.</p>;
    }

    return (
      <div className={styles.taskList}>
        {filteredTasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </div>
    );
  };

  export default TaskList;