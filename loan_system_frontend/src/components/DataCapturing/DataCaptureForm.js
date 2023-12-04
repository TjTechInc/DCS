// DataCapturing.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './styles/dataCapturing.css'; // Import the CSS file

const DataCapturing = () => {
  const [formData, setFormData] = useState({
    GROWER_NO: '',
    SURNAME: '',
    // Add other fields as needed
  });

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check user authentication status when the component mounts
    // You may need to adjust the authentication check based on your actual authentication mechanism
    const checkAuthentication = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/check-auth/');
        setIsLoggedIn(response.data.is_authenticated);
      } catch (error) {
        console.error('Error checking authentication status', error);
      }
    };

    checkAuthentication();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8000/api/capture/', formData);
      // Handle the response as needed
      console.log('Data captured successfully', response.data);
    } catch (error) {
      // Handle errors
      console.error('Error capturing data', error);
    }
  };

  return (
    <div className="container">
      {isLoggedIn ? (
        <div className="form-box">
          <h2>Data Capturing Form</h2>
          <form onSubmit={handleSubmit}>
            <label>
              GROWER_NO:
              <input type="text" name="GROWER_NO" value={formData.GROWER_NO} onChange={handleInputChange} />
            </label>
            {/* Add other form fields here */}
            <button type="submit">Capture Data</button>
          </form>
        </div>
      ) : (
        <div className="form-box">
          <h2>Login</h2>
          <form>
            {/* Login form fields go here */}
            <button type="submit">Login</button>
          </form>
          <p>Don't have an account? <a href="/register">Register</a></p>
        </div>
      )}
    </div>
  );
};

export default DataCapturing;
