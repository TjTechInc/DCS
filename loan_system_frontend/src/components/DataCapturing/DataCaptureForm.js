import React, { useState, useEffect } from 'react';
import axios from 'axios';

import './styles/dataCapturing.css'; // Import your CSS file for styling

const DataCapturing = () => {
  const [formData, setFormData] = useState({
    GROWER_NO: '',
    SURNAME: '',
    NAME_INITIALS: '',
    NATIONAL_ID: '',
    TEL_NO: '',
    EMAIL: '',
    POSTAL_ADDRESS1: '',
    POSTAL_ADDRESS2: '',
    FARM_NAME: '',
    AREA_PROVINCE: '',
    CURRENT_REG: '',
    NEXT_REG: '',
    CONTRACTOR: '',
    HECTARES: '',
    PROVINCE: '',
    // Add other fields as needed
  });

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check user authentication status when the component mounts
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
    <div className="data-capturing-container">
      {isLoggedIn ? (
        <div className="data-capturing-form">
          <h2>Data Capturing Form</h2>
          <form onSubmit={handleSubmit}>
            {/* Repeat the input fields here */}
            <button type="submit">Capture Data</button>
          </form>
        </div>
      ) : (
        <div className="login-prompt">
          <p>Please log in to access the data capturing form.</p>
          <div className="auth-links">
            <a href="/login">Login</a>
            <span className="auth-divider">|</span>
            <a href="/register">Register</a>
          </div>
        </div>
      )}
    </div>
  );
};

export default DataCapturing;