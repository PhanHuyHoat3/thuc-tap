import { useDispatch } from 'react-redux';
import { updateTaskAsync, deleteTaskAsync } from '../features/tasksSlice';

const TaskItem = ({ task }) => {
  const dispatch = useDispatch();

  const handleToggle = () => {
    dispatch(updateTaskAsync({ ...task, completed: !task.completed }));
  };

  const handleDelete = () => {
    dispatch(deleteTaskAsync(task.id));
  };

    return (
        <div className="task-item">
        <input
            type="checkbox"
            checked={task.completed}
            onChange={handleToggle}
        />
        <span className={task.completed ? 'completed' : ''}>{task.title}</span>
        <button onClick={handleDelete}>Delete</button>
        </div>
    );
    };

    export default TaskItem;
