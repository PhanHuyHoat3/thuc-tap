    import { Todo } from '@/types/todo';
    import { notFound } from 'next/navigation';

    export default function TodoDetail({ params }: { params: { id: string } }) {
    // Lấy todos từ localStorage
    const todos: Todo[] = JSON.parse(localStorage.getItem('todos') || '[]');
    const todo = todos.find((t) => t.id === params.id);

    if (!todo) {
        notFound();
    }

    return (
        <div className="max-w-2xl mx-auto p-4">
        <h1 className="text-3xl font-bold mb-4">Todo Details</h1>
        <div className="border p-4 rounded">
            <h2 className="text-xl font-semibold">{todo.title}</h2>
            <p className="text-gray-600">
            Status: {todo.completed ? 'Completed' : 'Pending'}
            </p>
        </div>
        </div>
    );
    }