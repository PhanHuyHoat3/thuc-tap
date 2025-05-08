    export default function TaskItem({ task, onToggle, onDelete }) {
    return (
        <div className="task-item">
        <input
            type="checkbox"
            checked={task.completed}
            onChange={() => onToggle(task._id)}
        />
        <span style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
            {task.title}
        </span>
        <button onClick={() => onDelete(task._id)}>Xóa</button>
        </div>
    );
    }
