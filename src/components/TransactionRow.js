import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';

const TransactionRow = ({ transaction }) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleToggle = () => setIsOpen(!isOpen);

    return (
        <>
            <tr onClick={handleToggle}>
                <td>
                    <span className={`chevron ${isOpen ? 'open' : ''}`}>&#x25BC;</span>
                    {transaction.date}
                </td>
                <td>{transaction.description}</td>
                <td>{transaction.amount}</td>
                <td>{transaction.balance}</td>
            </tr>
            {isOpen && (
                <tr>
                    <td colSpan="4" className="details">
                        <div><strong>Transaction Type:</strong> Electronic</div>
                        <div><strong>Category:</strong> {transaction.category} <FontAwesomeIcon icon={faPen} /></div>
                        <div><strong>Notes:</strong> {transaction.notes} <FontAwesomeIcon icon={faPen} /></div>
                    </td>
                </tr>
            )}
        </>
    );
};

export default TransactionRow;


