import { useState, useEffect } from 'react';
import axios from 'axios';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';

const API_URL = 'http://localhost:5000/api/todos'; // Trỏ về Node.js

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('all');


  const fetchTasks = async () => {
    const res = await axios.get(API_URL);
    setTasks(res.data.data);
  };

  const addTask = async (task) => {
    const res = await axios.post(API_URL, task);
    setTasks([...tasks, res.data.data]);
  };

  const deleteTask = async (id) => {
    await axios.delete(`${API_URL}/${id}`);
    if(confirm('Ban chac chan muon xoa?')) setTasks(tasks.filter((t) => t._id !== id));
  };

  const toggleTask = async (id) => {
    const task = tasks.find((t) => t._id === id);
    const updated = { ...task, completed: !task.completed };
    const res = await axios.put(`${API_URL}/${id}`, updated);
    setTasks(tasks.map((t) => (t._id === id ? res.data.data : t)));
  };

  useEffect(() => {
    fetchTasks();
  }, []);
    const filteredTasks = tasks.filter((task) => {
  if (filter === 'completed') return task.completed;
  if (filter === 'uncompleted') return !task.completed;
  return true; // all
});


  return (
    <div className="container">
      <h1>Quản lý công việc</h1>
      <form className='filter'>
  <select value={filter} onChange={(e) => setFilter(e.target.value)}>
    <option value="all">Tất cả</option>
    <option value="completed">Hoàn thành</option>
    <option value="uncompleted">Chưa hoàn thành</option>
  </select>
</form>

      <TaskForm onAdd={addTask} />
      <TaskList tasks={filteredTasks} onToggle={toggleTask} onDelete={deleteTask} />
    </div>
  );
}
