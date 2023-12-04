// src/components/auth/LoginForm.js
import React, { useState } from 'react';
import axios from 'axios';
import { setAuthToken } from '../../utils/auth';
import './styles/login.css'; // Import your CSS

const LoginForm = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [loginError, setLoginError] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoginError(null); // Reset the login error on each submit attempt
  
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/token/', formData);
      const token = response.data.token;
  
      // Store the token securely
      setAuthToken(token);
  
      console.log('Login successful:', response.data);
      // Optionally, you can redirect the user to another page after successful login
    } catch (error) {
      if (error.response) {
        // The request was made, but the server responded with an error
        console.error('Login error:', error.response.data);
        setLoginError('Invalid username or password');
      } else if (error.request) {
        // The request was made, but no response was received
        console.error('No response received:', error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error('Error setting up the request:', error.message);
      }
    }
  };
  

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          placeholder="Username"
        />
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Password"
        />
        <button type="submit">Login</button>
      </form>
      {loginError && <p className="login-error">{loginError}</p>}
      <p>
        Don't have an account? <a href="/register">Register here</a>.
      </p>
    </div>
  );
};

export default LoginForm;
