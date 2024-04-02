// Book.js

import React, { useState } from 'react';
import axios from 'axios';

const Book = ({ book, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    title: book.title,
    author: book.author,
    year: book.year
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`http://localhost:3000/api/book/updatebook/${book._id}`, formData,{
        headers: {
          "Content-Type": "application/json",
          "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjVmM2JhYTcwNDU5ZjM5M2VjMDZkOTk4In0sImlhdCI6MTcxMDQ3MTg0N30.vB2PuKc9cb2AiKZqRKdHPyRV2MwcZJNFs7EZ5oKkpv4"
        }
      });
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating book:', error);
    }
  };

  return (
    <div className="book">
      {isEditing ? (
        <div>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="author"
            value={formData.author}
            onChange={handleInputChange}
          />
          <input
            type="number"
            name="year"
            value={formData.year}
            onChange={handleInputChange}
          />
          <button onClick={handleUpdate}>Save</button>
        </div>
      ) : (
        <div>
          <h3>{book.title}</h3>
          <p>Author: {book.author}</p>
          <p>Year: {book.year}</p>
          <button onClick={() => setIsEditing(true)}>Edit</button>
          <button onClick={() => onDelete(book._id)}>Delete</button>
        </div>
      )}
    </div>
  );
};

export default Book;
