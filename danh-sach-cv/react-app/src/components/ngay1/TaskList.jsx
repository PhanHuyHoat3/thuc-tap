    import TaskItem from './TaskItem';

    export default function TaskList({ tasks, onToggle, onDelete }) {
    return (
        <div>
        {tasks.map((task) => (
            <TaskItem
            key={task._id}
            task={task}
            onToggle={onToggle}
            onDelete={onDelete}
            />
        ))}
        </div>
    );
    }
