    import { Todo } from '@/types/todo';

    interface TodoItemProps {
    todo: Todo;
    toggleTodo: (id: string) => void;
    deleteTodo: (id: string) => void;
    }

    export default function TodoItem({
    todo,
    toggleTodo,
    deleteTodo,
    }: TodoItemProps) {
    return (
        <div className="flex items-center justify-between p-4 border rounded hover:bg-gray-100">
        <div className="flex items-center space-x-2">
            <input
            type="checkbox"
            checked={todo.completed}
            onChange={() => toggleTodo(todo.id)}
            className="h-5 w-5"
            />
            <span className={todo.completed ? 'line-through text-gray-500' : ''}>
            {todo.title}
            </span>
        </div>
        <button
            onClick={() => deleteTodo(todo.id)}
            className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
        >
            Delete
        </button>
        </div>
    );
    }
