import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/argentBankLogo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOut, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { logOut, selectCurrentToken } from '../_redux/authSlice';
import { selectCurrentFirstName, unsetProfile } from '../_redux/profileSlice';

// Composant Header, gérant l'affichage de la barre de navigation en fonction de l'état d'authentification
const Header = () => {

    // Gestion des états locaux pour savoir si l'utilisateur est connecté et stocker son prénom
    const [loggedIn, setLoggedIn] = useState(false);
    const [profileFirstName, setProfileFirstName] = useState('');

    // Récupération des données du store Redux: le prénom de l'utilisateur et son token d'authentification
    const firstName = useSelector(selectCurrentFirstName); // Sélectionne le prénom depuis le slice profile
    const token = useSelector(selectCurrentToken); // Sélectionne le token depuis le slice auth

    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Effet déclenché lors de la modification du prénom ou du token
    useEffect(() => {
        // Si le prénom est disponible, on le met à jour dans l'état local
        if (firstName) {
            setProfileFirstName(firstName);
        }
        // Si un token est présent, l'utilisateur est connecté
        if (token) {
            setLoggedIn(true);
        } else {
            setLoggedIn(false);
        }
    }, [firstName, token]); // Déclenchement de cet effet à chaque modification de firstName ou token

    // Gestion de la déconnexion de l'utilisateur
    const handleLogOut = () => {
        // Action de déconnexion via Redux
        dispatch(logOut());
        // Suppression du profil de l'utilisateur dans le store Redux
        dispatch(unsetProfile());
        // Réinitialisation de l'état local
        setProfileFirstName('');
        setLoggedIn(false);
        // Redirection vers la page d'accueil
        navigate('/');
    };

    // Rendu du composant Header avec un affichage conditionnel en fonction de l'état d'authentification
    return (
        <>
            <nav className="main-nav">
                {/* Logo de la banque renvoyant vers la page d'accueil */}
                <Link to="/">
                    <img
                        className="main-nav-logo-image"
                        src={logo}
                        alt="Argent Bank Logo"
                    />
                    <h1 className="sr-only">Argent Bank</h1>
                </Link>

                {/* Si l'utilisateur n'est pas connecté, afficher le lien de connexion */}
                {!loggedIn ? (
                    <div>
                        <Link to="/login" className="main-nav-item">
                            <FontAwesomeIcon icon={faUserCircle} className="icon-sign"></FontAwesomeIcon>
                            Sign In
                        </Link>
                    </div>
                ) : (
                    // Si l'utilisateur est connecté, afficher son prénom et le bouton de déconnexion
                    <div className="accountLog">
                        <Link to="/user" className="profileName">
                            <FontAwesomeIcon icon={faUserCircle} className="icon-sign"></FontAwesomeIcon>
                            {profileFirstName}
                        </Link>
                        <div className="logOut main-nav-item" onClick={handleLogOut}>
                            <FontAwesomeIcon icon={faSignOut} className="icon-sign"></FontAwesomeIcon>
                            Sign Out
                        </div>
                    </div>
                )}
            </nav>
        </>
    );
};

export default Header;
