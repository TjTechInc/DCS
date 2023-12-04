// src/components/auth/RegistrationForm.js
import React, { useState } from 'react';
import axios from 'axios';
import './styles/registration.css'; // Import your CSS

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: '',
    email: '',
  });

  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Password validation
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/register/', formData);
      console.log('Registration successful:', response.data);
      // Optionally, you can redirect the user to another page after successful registration
    } catch (error) {
      console.error('Registration error:', error); // Log the entire error object
      setError('Registration error: ' + error.message); // Use the error message property
    }
  };

  return (
    <div className="registration-container">
      <h2>Registration</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username</label>
        <input type="text" name="username" value={formData.username} onChange={handleChange} />

        <label htmlFor="password">Password</label>
        <input type="password" name="password" value={formData.password} onChange={handleChange} />

        <label htmlFor="confirmPassword">Confirm Password</label>
        <input
          type="password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
        />

        <label htmlFor="email">Email</label>
        <input type="email" name="email" value={formData.email} onChange={handleChange} />

        {error && <p className="error">{error}</p>}

        <button type="submit">Register</button>
      </form>
    </div>
  );

  
};

export default RegistrationForm;
