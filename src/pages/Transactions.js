import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const Transactions = () => {
    const token = useSelector((state) => state.auth.token);

    if (!token) {
        return <Navigate to="/login" />;
    }

    return (
        <main className="main bg-dark">
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
                    <tr>
                        <td>June 20th, 2020</td>
                        <td>Golden Sun Bakery</td>
                        <td>$5.00</td>
                        <td>$2,082.79</td>
                    </tr>
                    <tr>
                        <td>June 20th, 2020</td>
                        <td>Golden Sun Bakery</td>
                        <td>$10.00</td>
                        <td>$2,087.79</td>
                    </tr>
                    <tr>
                        <td>June 20th, 2020</td>
                        <td>Golden Sun Bakery</td>
                        <td>$20.00</td>
                        <td>$2,097.79</td>
                    </tr>
                    <tr>
                        <td>June 20th, 2020</td>
                        <td>Golden Sun Bakery</td>
                        <td>$30.00</td>
                        <td>$2,117.79</td>
                    </tr>
                    <tr>
                        <td>June 20th, 2020</td>
                        <td>Golden Sun Bakery</td>
                        <td>$40.00</td>
                        <td>$2,147.79</td>
                    </tr>
                    <tr>
                        <td>June 20th, 2020</td>
                        <td>Golden Sun Bakery</td>
                        <td>$50.00</td>
                        <td>$2,187.79</td>
                    </tr>
                </tbody>
            </table>
        </main>
    );
};

export default Transactions;

