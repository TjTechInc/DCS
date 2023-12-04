// src/components/auth/LogoutButton.js
import React from 'react';
import { removeAuthToken } from '../../utils/auth'; // Update the path based on your project structure

const LogoutButton = () => {
  const handleLogout = () => {
    // Remove the token from storage
    removeAuthToken();

    // Optionally, you can redirect the user to the login page or another page after logout
    console.log('Logout successful');
  };

  return (
    <button type="button" onClick={handleLogout}>
      Logout
    </button>
  );
};

export default LogoutButton;
