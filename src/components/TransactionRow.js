import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';

// Composant TransactionRow qui représente une ligne d'une transaction dans un tableau
const TransactionRow = ({ transaction }) => {
    // State local qui gère si les détails d'une transaction sont ouverts ou non
    const [isOpen, setIsOpen] = useState(false);

    // Fonction pour basculer l'état de visibilité des détails de la transaction
    const handleToggle = () => setIsOpen(!isOpen);

    return (
        <>
            {/* Ligne de la transaction principale qui, lorsqu'elle est cliquée, affiche ou cache les détails */}
            <tr onClick={handleToggle}>
                <td>
                    {/* Chevron qui change d'orientation selon l'état d'ouverture */}
                    <span className={`chevron ${isOpen ? 'open' : ''}`}>&#x25BC;</span>
                    {transaction.date}
                </td>
                <td>{transaction.description}</td>
                <td>{transaction.amount}</td>
                <td>{transaction.balance}</td>
            </tr>

            {/* Détails de la transaction qui s'affichent uniquement si isOpen est vrai */}
            {isOpen && (
                <tr>
                    {/* Détails de la transaction sur une ligne supplémentaire, occupant toute la largeur */}
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



