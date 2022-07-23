import "./App.css";
import { useState, useEffect } from "react";
import HomePage from "./components/HomePage";
import Search from "./components/Search";
import { Route, Routes } from "react-router-dom";
import * as BooksAPI from "./BooksAPI";
import NotFound from "./components/NotFound";

function App() {

  const [books, setBooks] = useState([]);

  useEffect(() => {
    const getBooks = async () => {
      const res = await BooksAPI.getAll();
      setBooks(res);
    }
    getBooks();
  }, []);

  const updateShelf = async (id, shelf) => {
    await BooksAPI.update(id, shelf);
    const updatedShelf = books.map(b => {
      if (b.id === id) b.shelf = shelf;
      return b;
    });
    setBooks(updatedShelf);
  }

  const addBook = async (id, shelf) => {
    !books.find(b => b.id === id) && await BooksAPI.get(id).then(res => {
      res.shelf = shelf;
      setBooks([...books, res])
    });
  }

  return (
    <Routes>
      <Route path="/" element={<HomePage books={books} updateShelf={updateShelf} />} />
      <Route path="/search" element={<Search addBook={addBook} updateShelf={updateShelf} books={books} />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default App;
