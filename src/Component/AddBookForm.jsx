// AddBookForm.js
import React, { useState } from 'react';
import axios from 'axios';

const AddBookForm = ({ onAdd }) => {
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    year: ''
  });

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
      // onAdd();
      setFormData({ title: '', author: '', year: '' });
    } catch (error) {
      console.error('Error adding book:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Title"
        name="title"
        value={formData.title}
        onChange={handleInputChange}
      />
      <input
        type="text"
        placeholder="Author"
        name="author"
        value={formData.author}
        onChange={handleInputChange}
      />
      <input
        type="number"
        placeholder="Year"
        name="year"
        value={formData.year}
        onChange={handleInputChange}
      />
      <button type="submit">Add Book</button>
    </form>
  );
};

export default AddBookForm;