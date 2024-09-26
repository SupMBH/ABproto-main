import React from 'react';  
import { useSelector } from 'react-redux';  
import { Navigate, useLocation } from 'react-router-dom';  
import TransactionRow from '../components/TransactionRow';  

// Déclaration du composant Transactions
const Transactions = () => {  
    // Récupération du token d'authentification à partir de Redux
    const token = useSelector((state) => state.auth.token);  

    // Utilisation de `useLocation` pour récupérer l'état passé à travers la navigation
    const location = useLocation();  
    const { accountName, accountAmount } = location.state || { accountName: 'Argent Bank Checking (x8349)', accountAmount: '$2,082.79' };  

    // Données des transactions en dur (mock)
    const transactions = [  
        { date: 'June 20th, 2020', description: 'Golden Sun Bakery', amount: '$5.00', balance: '$2,082.79', category: 'Food', notes: '' },  
        { date: 'June 20th, 2020', description: 'Golden Sun Bakery', amount: '$10.00', balance: '$2,087.79', category: 'Food', notes: '' },  
        { date: 'June 20th, 2020', description: 'Golden Sun Bakery', amount: '$20.00', balance: '$2,097.79', category: 'Food', notes: '' },  
        { date: 'June 20th, 2020', description: 'Golden Sun Bakery', amount: '$30.00', balance: '$2,117.79', category: 'Food', notes: '' },  
        { date: 'June 20th, 2020', description: 'Golden Sun Bakery', amount: '$40.00', balance: '$2,147.79', category: 'Food', notes: '' },  
        { date: 'June 20th, 2020', description: 'Golden Sun Bakery', amount: '$50.00', balance: '$2,187.79', category: 'Food', notes: '' }  
    ];  

    // Si le token n'est pas présent (utilisateur non authentifié), on redirige vers la page de login
    if (!token) {  
        return <Navigate to="/login" />;  
    }  

    // Contenu de la page des transactions
    return (  
        <main className="main bg-light">  
            <h2 className="sr-only">Transactions</h2>  
            <section className="account">  
                <div className="account-content-wrapper">  
                    {/* Affichage du nom du compte et du montant passé via `useLocation` */}
                    <h3 className="account-title">{accountName}</h3>  
                    <p className="account-amount">{accountAmount}</p>  
                    <p className="account-amount-description">Available Balance</p>  
                </div>  
            </section>  
            <div className="transaction-table-container">  
                <div className="transaction-table-wrapper">  
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
                            {/* Boucle sur les transactions pour générer chaque ligne */}
                            {transactions.map((transaction, index) => (  
                                <TransactionRow key={index} transaction={transaction} />  
                            ))}  
                        </tbody>  
                    </table>  
                </div>  
            </div>  
        </main>  
    );  
};  

export default Transactions;  




