import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Book from './Book';
import { Link } from "react-router-dom";

const Bookmgmt = () => {
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    year: ''
  });

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
      setFilteredBooks(response.data); // Initialize filteredBooks with all books
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/book/deletebook/${id}`, {
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
      await axios.put(`http://localhost:3000/api/book/${updatedBook._id}`, updatedBook, {
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

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3000/api/book/adddata', formData, {
        headers: {
          "Content-Type": "application/json",
          "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjVmM2JhYTcwNDU5ZjM5M2VjMDZkOTk4In0sImlhdCI6MTcxMDQ3MTg0N30.vB2PuKc9cb2AiKZqRKdHPyRV2MwcZJNFs7EZ5oKkpv4"
        }
      });
      setFormData({ title: '', author: '', year: '' });
      fetchBooks();
    } catch (error) {
      console.error('Error adding book:', error);
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
    <>
      <div>
        {/* <h1>Books Management System</h1> */}
        <form className="search-form" onSubmit={(e) => e.preventDefault()}>
          <input
            type="text"
            placeholder="Search by title, author, or year"
            value={searchTerm}
            onChange={handleSearch}
          />
        </form>
        <form className='mt-3 m-lg-3' style={{"margin" : '11px'}} onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Title"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            style={{"marginLeft" : '2px'}}
          />
          <input
            type="text"
            placeholder="Author"
            name="author"
            value={formData.author}
            onChange={handleInputChange}
            style={{"marginLeft" : '2px'}}
          />
          <input
            type="number"
            placeholder="Year"
            name="year"
            value={formData.year}
            onChange={handleInputChange}
            style={{"marginLeft" : '2px'}}
          />
          <button type="submit" style={{"marginLeft" : '2px'}}>Add Book</button>
        </form>
        {filteredBooks.map((book) => (
          <Book
            key={book._id}
            book={book}
            onDelete={handleDelete}
            onUpdate={handleUpdate}
          />
        ))}
      </div>
    </>
  );
};

export default Bookmgmt;
