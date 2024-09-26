import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { selectCurrentToken } from '../_redux/authSlice';

// Composant RequireAuth qui vérifie si l'utilisateur est authentifié pour accéder à certaines pages
const RequireAuth = () => {

    // Récupère le token de l'utilisateur depuis le store Redux
    const token = useSelector(selectCurrentToken)

    // Récupère l'objet location qui contient l'URL actuelle de l'utilisateur
    const location = useLocation()

    // Si l'utilisateur est authentifié (c'est-à-dire qu'un token existe), il est autorisé à accéder aux composants enfants via Outlet
    // Sinon, il est redirigé vers la page de connexion, avec l'URL d'origine stockée dans l'état location
    return token ? (
        <Outlet/>
    ) : (
        // Redirection vers la page de connexion si l'utilisateur n'est pas connecté
        <Navigate to="/login" state={{ from: location }} replace />
    )
};

export default RequireAuth;
