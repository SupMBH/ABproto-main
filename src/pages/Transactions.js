import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import TransactionRow from '../components/TransactionRow';

const Transactions = () => {
    const token = useSelector((state) => state.auth.token);

    const transactions = [
        { date: 'June 20th, 2020', description: 'Golden Sun Bakery', amount: '$5.00', balance: '$2,082.79', category: 'Food', notes: '' },
        { date: 'June 20th, 2020', description: 'Golden Sun Bakery', amount: '$10.00', balance: '$2,087.79', category: 'Food', notes: '' },
        { date: 'June 20th, 2020', description: 'Golden Sun Bakery', amount: '$20.00', balance: '$2,097.79', category: 'Food', notes: '' },
        { date: 'June 20th, 2020', description: 'Golden Sun Bakery', amount: '$30.00', balance: '$2,117.79', category: 'Food', notes: '' },
        { date: 'June 20th, 2020', description: 'Golden Sun Bakery', amount: '$40.00', balance: '$2,147.79', category: 'Food', notes: '' },
        { date: 'June 20th, 2020', description: 'Golden Sun Bakery', amount: '$50.00', balance: '$2,187.79', category: 'Food', notes: '' }
    ];

    if (!token) {
        return <Navigate to="/login" />;
    }

    return (
        <main className="main bg-light">
            <h2 className="sr-only">Transactions</h2>
            <section className="account">
                <div className="account-content-wrapper">
                    <h3 className="account-title">Argent Bank Checking (x8349)</h3>
                    <p className="account-amount">$2,082.79</p>
                    <p className="account-amount-description">Available Balance</p>
                </div>
            </section>
            <table className="transaction-table">
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Description</th>
                        <th>Amount</th>
                        <th>Balance</th>
                    </tr>
                </thead>
                <tbody>
                    {transactions.map((transaction, index) => (
                        <TransactionRow key={index} transaction={transaction} />
                    ))}
                </tbody>
            </table>
        </main>
    );
};

export default Transactions;


