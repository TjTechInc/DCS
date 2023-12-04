import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { setAuthToken } from '../../utils/auth';
import './styles/login.css';
import { Link } from 'react-router-dom';
const LoginForm = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [loginError, setLoginError] = useState(null);

  // Access the history object
  // const history = useHistory();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoginError(null);

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/token/', formData);
      const token = response.data.token;
      setAuthToken(token);

      console.log('Login successful:', response.data);

      // Redirect to DataCapturing component
      // history.push('/data-capturing');
    } catch (error) {
      // Handle login errors
      if (error.response) {
        console.error('Login error:', error.response.data);
        setLoginError('Invalid username or password');
      } else if (error.request) {
        console.error('No response received:', error.request);
      } else {
        console.error('Error setting up the request:', error.message);
      }
    }
  };


// Inside your component



  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
  <label>
    Username:
    <input
      type="text"
      name="username"
      value={formData.username}
      onChange={handleChange}
    />
  </label>
  <label>
    Password:
    <input
      type="password"
      name="password"
      value={formData.password}
      onChange={handleChange}
    />
  </label>
  {/* Add other form inputs as needed */}
  <button type="submit">Login</button>
</form>

      {loginError && <p className="login-error">{loginError}</p>}
      <p>
       Don't have an account? <Link to="/register">Register here</Link>.
      </p>
    </div>
  );
};

export default LoginForm;
