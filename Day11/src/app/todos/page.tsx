'use client';

import { useState, useEffect } from 'react';
import TodoForm from '@/components/TodoForm';
import TodoItem from '@/components/TodoItem';
import { Todo } from '@/types/todo';

export default function Todos() {
  const [todos, setTodos] = useState<Todo[]>([]);

  // Load todos từ localStorage khi khởi động
  useEffect(() => {
    const storedTodos = localStorage.getItem('todos');
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos));
    }
  }, []);

  // Lưu todos vào localStorage khi thay đổi
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  // Hàm thêm công việc
  const addTodo = (title: string) => {
    const newTodo: Todo = {
      id: crypto.randomUUID(),
      title,
      completed: false,
    };
    setTodos([...todos, newTodo]);
  };

  // Hàm hoàn thành công việc
  const toggleTodo = (id: string) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  // Hàm xóa công việc
  const deleteTodo = (id: string) => {
    if (confirm('Bạn có muốn xóa ko')) {
      setTodos(todos.filter((todo) => todo.id !== id));
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Todo List</h1>
      <TodoForm addTodo={addTodo} />
      <div className="space-y-2">
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            toggleTodo={toggleTodo}
            deleteTodo={deleteTodo}
          />
        ))}
      </div>
    </div>
  );
}
