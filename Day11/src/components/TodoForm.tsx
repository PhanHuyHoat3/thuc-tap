    import { useState } from 'react';

    interface TodoFormProps {
    addTodo: (title: string) => void;
    }

    export default function TodoForm({ addTodo }: TodoFormProps) {
    const [title, setTitle] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (title.trim()) {
        addTodo(title);
        setTitle('');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex space-x-2 mb-4">
        <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Add a new todo"
            className="flex-1 p-2 border rounded"
        />
        <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
            Add
        </button>
        </form>
    );
    }
