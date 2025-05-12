    import { useState } from 'react';
    import { useDispatch } from 'react-redux';
    import { createTaskAsync } from '../features/tasksSlice';


    const TaskForm = () => {
    const [title, setTitle] = useState('');
    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (title.trim()) {
        dispatch(createTaskAsync({ title, completed: false }));
        setTitle('');
        }
    };

        return (
            <form className="task-form" onSubmit={handleSubmit}>
            <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter task"
                aria-label="Enter a new task"
            />
            <button type="submit" disabled={!title.trim()}>
                Add Task
            </button>
            </form>
        );
        };

        export default TaskForm;