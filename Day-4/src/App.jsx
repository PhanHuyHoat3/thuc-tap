import { useState } from 'react'
import { BrowserRouter, Route, Router, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Notes from './pages/Notes'
import NoteDetail from './pages/NoteDetail'
import Navbar from './components/Navbar'
import ProtectedRoute from './components/ProtectedRoute'

function App() {
  const [note, setNote] = useState([])
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = () => {
    setIsAuthenticated(true);
  }

  const addNote = (Note) => {
    setNote((prev) => [...prev, { ...Note, id: Date.now() }]);
  };

  const editNote = (updatedNote) => {
    setNote((prev) =>
      prev.map((not) => (not.id === updatedNote.id ? updatedNote : not))
    );
  };

  const deleteNote = (id) => {
    setNote((prev) => {
      if (confirm('Bạn có chắc chắn muốn xóa ghi chú này?')) {
        return prev.filter((not) => not.id !== id);
      }
      return prev;
    });    
  };

  return (
      <BrowserRouter>
      <Navbar isAuthenticated={isAuthenticated} onLogout={() => setIsAuthenticated(false)} />
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/login" element={<Login onLogin={handleLogin}/>}/>
          <Route path="/notes" element={<ProtectedRoute isAuthenticated={isAuthenticated}>
                                          <Notes notes={note}
                                            addNote={addNote}
                                            editNote={editNote}
                                            deleteNote={deleteNote}/>
                                        </ProtectedRoute>}/>
          <Route path="/notes/:id" element={<ProtectedRoute isAuthenticated={isAuthenticated}>
                                                <NoteDetail notes={note}/>    
                                            </ProtectedRoute>}/>
        </Routes>
      </BrowserRouter>
  )
}

export default App
