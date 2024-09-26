import React, { useEffect } from 'react';  
import { useDispatch } from 'react-redux';  
import { useNavigate } from 'react-router-dom';  
import ProfileHeader from '../components/ProfileHeader';  
import { useGetProfileMutation } from '../_redux/profileApiSlice';  
import { setProfile } from '../_redux/profileSlice';  

// Déclaration du composant Profile
const Profile = () => {  
    // On utilise Redux Toolkit Query pour récupérer la mutation qui va permettre de charger le profil de l'utilisateur
    const [profile, { isLoading }] = useGetProfileMutation();  
    // Utilisation de `useDispatch` pour dispatcher des actions vers le store Redux
    const dispatch = useDispatch();  
    // `useNavigate` permet de naviguer entre différentes pages
    const navigate = useNavigate();  

    // Utilisation du hook useEffect pour charger les données du profil de l'utilisateur lorsque le composant est monté
    useEffect(() => {  
        const fetchData = async () => {  
            // Appel à l'API pour récupérer les informations de profil
            const data = await profile().unwrap();  

            // Si les données sont présentes, on les stocke dans Redux via `setProfile`
            if (data) {  
                const userData = {  
                    firstName: data.body.firstName,  
                    lastName: data.body.lastName,  
                };  
                dispatch(setProfile({ ...userData, userData }));  
            }  
        };  

        // Appel à la fonction pour charger les données
        fetchData();  
    // On désactive ESLint pour ignorer l'avertissement sur les dépendances du hook useEffect
    // eslint-disable-next-line react-hooks/exhaustive-deps  
    }, []);  

    // Fonction pour gérer la navigation vers la page des transactions lorsque l'utilisateur clique sur "View transactions"
    const handleViewTransactions = (accountName, accountAmount) => {  
        // On passe les informations du compte en tant que paramètres via `state`
        navigate('/transactions', { state: { accountName, accountAmount } });  
    };  

    // Contenu affiché lorsque les données sont encore en train d'être chargées
    const content = isLoading ? (  
        <h1>Loading...</h1>  
    ) : (  
        <>  
            {/* Structure HTML du profil */}
            <main className="main bg-dark profile">  
                <ProfileHeader />  
                <h2 className="sr-only">Accounts</h2>  

                {/* Premier compte bancaire */}
                <section className="account">  
                    <div className="account-content-wrapper">  
                        <h3 className="account-title">Argent Bank Checking (x8349)</h3>  
                        <p className="account-amount">$2,082.79</p>  
                        <p className="account-amount-description">Available Balance</p>  
                    </div>  
                    <div className="account-content-wrapper cta">  
                        {/* Bouton qui permet de naviguer vers la page des transactions pour ce compte */}
                        <button  
                            className="transaction-button"  
                            onClick={() => handleViewTransactions('Argent Bank Checking (x8349)', '$2,082.79')}  
                        >  
                            View transactions  
                        </button>  
                    </div>  
                </section>  

                {/* Deuxième compte bancaire */}
                <section className="account">  
                    <div className="account-content-wrapper">  
                        <h3 className="account-title">Argent Bank Savings (x6712)</h3>  
                        <p className="account-amount">$10,928.42</p>  
                        <p className="account-amount-description">Available Balance</p>  
                    </div>  
                    <div className="account-content-wrapper cta">  
                        {/* Navigation vers la page des transactions pour le compte épargne */}
                        <button  
                            className="transaction-button"  
                            onClick={() => handleViewTransactions('Argent Bank Savings (x6712)', '$10,928.42')}  
                        >  
                            View transactions  
                        </button>  
                    </div>  
                </section>  

                {/* Troisième compte : carte de crédit */}
                <section className="account">  
                    <div className="account-content-wrapper">  
                        <h3 className="account-title">Argent Bank Credit Card (x8349)</h3>  
                        <p className="account-amount">$184.30</p>  
                        <p className="account-amount-description">Current Balance</p>  
                    </div>  
                    <div className="account-content-wrapper cta">  
                        {/* Navigation vers la page des transactions pour la carte de crédit */}
                        <button  
                            className="transaction-button"  
                            onClick={() => handleViewTransactions('Argent Bank Credit Card (x8349)', '$184.30')}  
                        >  
                            View transactions  
                        </button>  
                    </div>  
                </section>  
            </main>  
        </>  
    );  

    return content;  
};  

export default Profile;  



