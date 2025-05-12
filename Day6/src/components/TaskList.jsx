    import React, { useEffect } from 'react';
    import { useSelector, useDispatch } from 'react-redux';
    import { fetchTasks } from '../features/tasksSlice';
    import TaskItem from './TaskItem';

    const TaskList = () => {
    const dispatch = useDispatch();
    const { tasks, loading, error } = useSelector((state) => state.tasks);

    useEffect(() => {
        dispatch(fetchTasks());
    }, [dispatch]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className="task-list">
        {tasks.length === 0 ? (
            <p>No tasks available</p>
        ) : (
            tasks.map((task) => <TaskItem key={task.id} task={task} />)
        )}
        </div>
    );
    
    };

    export default TaskList;
