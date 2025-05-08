    import { useState } from 'react';

    export default function TaskForm({ onAdd }) {
    const [title, setTitle] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!title.trim()) return;

        onAdd({ title, completed: false });
        setTitle('');
    };

    return (
        <form onSubmit={handleSubmit} className="task-form">
        <input
            type="text"
            placeholder="Thêm công việc mới..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
        />
        <button type="submit">Thêm</button>
        </form>
    );
    }
