// src/App.jsx
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Posts from './pages/Posts';
import PostDetail from './pages/PostDetail';
import PostForm from './components/PostForm';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Posts />} />
        <Route path="/posts/new" element={<PostForm />} />
        <Route path="/posts/:id" element={<PostDetail />} />
        <Route path="/posts/:id/edit" element={<PostForm />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
