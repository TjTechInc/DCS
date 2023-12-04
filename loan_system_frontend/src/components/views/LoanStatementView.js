// src/components/views/LoanStatementView.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './styles/LoanStatementView.css'; // Import your CSS

const LoanStatementView = () => {
  const [loanStatements, setLoanStatements] = useState([]);

  useEffect(() => {
    // Fetch data when the component mounts
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8000/loan-statements');
        setLoanStatements(response.data); // Assuming the response data is an array of loan statements
      } catch (error) {
        console.error('Error fetching loan statements:', error);
      }
    };

    fetchData();
  }, []); // The empty dependency array ensures the effect runs only once on mount

  return (
    <div className="loan-statement-view-container">
      <h2>Loan Statement View</h2>
      <ul>
        {loanStatements.map((loanStatement) => (
          <li key={loanStatement.id}>
            {/* Display relevant information from your loan statement */}
            <p>Loan Amount: {loanStatement.amount}</p>
            <p>Interest Rate: {loanStatement.interestRate}</p>
            {/* Add more fields as needed */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LoanStatementView;
