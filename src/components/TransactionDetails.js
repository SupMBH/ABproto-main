// src/components/TransactionDetails.js
import React from 'react';

const TransactionDetails = ({ transaction, onClose }) => {
    return (
        <div className="transaction-details">
            <h3>Transaction Details</h3>
            <p><strong>Date:</strong> {transaction.date}</p>
            <p><strong>Description:</strong> {transaction.description}</p>
            <p><strong>Amount:</strong> {transaction.amount}</p>
            <p><strong>Balance:</strong> {transaction.balance}</p>
            <p><strong>Category:</strong> {transaction.category} <button>Edit</button></p>
            <p><strong>Notes:</strong> {transaction.notes} <button>Edit</button></p>
            <button onClick={onClose}>Close</button>
        </div>
    );
};

export default TransactionDetails;
