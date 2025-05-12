// src/App.jsx
import React, { useContext } from 'react';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import { ThemeContext } from './context/ThemeContext';

const App = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <div className={`app ${theme}`}>
      <header>
        <h1>Todo App</h1>
        <button onClick={toggleTheme}>
          Switch to {theme === 'light' ? 'Dark' : 'Light'} Mode
        </button>
      </header>
      <TaskForm />
      <TaskList />
    </div>
  );
};

export default App;
 
