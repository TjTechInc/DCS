// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Home from './components/Home/Home';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import DataCaptureForm from './components/DataCapturing/DataCaptureForm';
import LoanStatementView from './components/views/LoanStatementView';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/capture" element={<DataCaptureForm />} />
        <Route path="/view" element={<LoanStatementView />} />
        {/* Add other routes as needed */}
      </Routes>
    </Router>
  );
};

export default App;

