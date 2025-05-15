import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Tasks from './pages/Tasks';
import TaskForm from './components/TaskForm';
import TaskEdit from './components/TaskEdit';

const TaskDetail = lazy(() => import('./pages/TaskDetail'));

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Tasks />} />
          <Route path="/tasks/new" element={<TaskForm />} />
          <Route path="/tasks/:id/edit" element={<TaskEdit />} />
          <Route path="/tasks/:id" element={<TaskDetail />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;