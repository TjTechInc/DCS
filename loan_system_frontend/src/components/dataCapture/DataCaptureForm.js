// src/components/dataCapture/DataCaptureForm.js
import React, { useState } from 'react';
import axios from 'axios';

const DataCaptureForm = () => {
  const [formData, setFormData] = useState({
    // Define your form fields here
    fieldName1: '',
    fieldName2: '',
    // Add more fields as needed
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Make a POST request to your Django backend to save the captured data
      const response = await axios.post('http://your-django-backend/api/capture/', formData);
      console.log('Data captured successfully:', response.data);
      // Optionally, you can perform additional actions after successful data capture
    } catch (error) {
      if (error.response) {
        // The request was made, but the server responded with a status code
        // other than 2xx (e.g., 404, 500).
        console.error('Server responded with an error:', error.response.data);
      } else if (error.request) {
        // The request was made, but no response was received.
        console.error('No response received from the server.');
      } else {
        // Something happened in setting up the request that triggered an Error.
        console.error('Error setting up the request:', error.message);
      }
    }
  };

  return (
    <div>
      {/* Your form content here */}
      <form onSubmit={handleSubmit}>
        {/* Your form fields go here */}
        <label>
          Field Name 1:
          <input type="text" name="fieldName1" value={formData.fieldName1} onChange={handleChange} />
        </label>

        <label>
          Field Name 2:
          <input type="text" name="fieldName2" value={formData.fieldName2} onChange={handleChange} />
        </label>

        {/* Add more form fields as needed */}
        
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default DataCaptureForm;
