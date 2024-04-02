// BookTable.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Book from './Book';

const BookTable = () => {
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredBooks, setFilteredBooks] = useState([]);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/book/fetchallbook', {
        headers: {
          "Content-Type": "application/json",
          "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjVmM2JhYTcwNDU5ZjM5M2VjMDZkOTk4In0sImlhdCI6MTcxMDQ3MTg0N30.vB2PuKc9cb2AiKZqRKdHPyRV2MwcZJNFs7EZ5oKkpv4"
        }
      });
      setBooks(response.data);
      console.log(response.data)
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  };
  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/book/${id}`, {
        headers: {
          "Content-Type": "application/json",
          "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjVmM2JhYTcwNDU5ZjM5M2VjMDZkOTk4In0sImlhdCI6MTcxMDQ3MTg0N30.vB2PuKc9cb2AiKZqRKdHPyRV2MwcZJNFs7EZ5oKkpv4"
        }
      });
      fetchBooks();
    } catch (error) {
      console.error('Error deleting book:', error);
    }
  };
  
  const handleUpdate = async (updatedBook) => {
    try {
      await axios.put(`/api/book/${updatedBook._id}`, updatedBook, {
        headers: {
          "Content-Type": "application/json",
          "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjVmM2JhYTcwNDU5ZjM5M2VjMDZkOTk4In0sImlhdCI6MTcxMDQ3MTg0N30.vB2PuKc9cb2AiKZqRKdHPyRV2MwcZJNFs7EZ5oKkpv4"
        }
      });
      fetchBooks();
    } catch (error) {
      console.error('Error updating book:', error);
    }
  };
  

  const handleSearch = (e) => {
    const searchTerm = e.target.value;
    setSearchTerm(searchTerm);
    const filteredBooks = books.filter(
      (book) =>
        book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
        String(book.year).includes(searchTerm)
    );
    setFilteredBooks(filteredBooks);
  };

  return (
    <div>
      <h1>Book Management</h1>
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={handleSearch}
      />
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Year</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredBooks.map((book) => (
            <Book key={book._id} book={book} onDelete={handleDelete} />
          ))}
        </tbody>
      </table>
      <button>Add Book</button>
    </div>
  );
};

export default BookTable;
