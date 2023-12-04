// src/components/Home/Home.js
import React from 'react';
import { Link } from 'react-router-dom';
import './styles/Home.css';
// Import your background image
import backgroundImg from './styles/4844228.jpg';

const Home = () => {
  return (
    <div className="home-container" style={{ backgroundImage: `url(${backgroundImg})` }}>
      <div className="home-header">
        <div className="home-auth-links">
          <Link to="/login" className="home-auth-link">
            Login
          </Link>
          <Link to="/register" className="home-auth-link">
            Register
          </Link>
        </div>
      </div>

      <div className="home-content-container">
        <h2 className="home-title">Welcome to the Loan System!</h2>
        <p className="home-content">
          Our loan system helps you manage and track loans for growers efficiently.
        </p>
        <p className="home-content">
          Get started by registering or logging in to access the full functionality of the system.
        </p>
        <div className="home-link-container">
          <Link to="/capture" className="home-link">
            Go to Data Capture
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
