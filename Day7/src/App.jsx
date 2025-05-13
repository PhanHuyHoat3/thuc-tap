  // src/App.jsx
  import { BrowserRouter, Routes, Route } from 'react-router-dom';
  import Navbar from './components/Navbar';
  import Books from './pages/Books';
  import BookDetail from './pages/BookDetail';
  import BookForm from './components/BookForm';
  import './index.css';

  function App() {
    return (
      <BrowserRouter>
        <Navbar />
        <div className="container">
          <Routes>
            <Route path="/" element={<Books />} />
            <Route path="/books/:id" element={<BookDetail />} />
            <Route path="/books/new" element={<BookForm />} />
            <Route path="/books/:id/edit" element={<BookForm />} />
          </Routes>
        </div>
      </BrowserRouter>
    );
  }

  export default App;