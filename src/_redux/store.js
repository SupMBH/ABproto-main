// Importation de configureStore depuis Redux Toolkit, qui permet de configurer le store Redux.
import { configureStore } from "@reduxjs/toolkit";

// Importation de l'apiSlice, authReducer et profileReducer pour les intégrer dans le store.
import { apiSlice } from "./apiSlice";
import authReducer from '../_redux/authSlice';
import profileReducer from '../_redux/profileSlice';

// Configuration et création du store Redux.
export const store = configureStore({
  // Définition des réducteurs utilisés dans le store.
  reducer: {
    // Utilisation du reducer de l'apiSlice pour gérer les appels d'API
    [apiSlice.reducerPath]: apiSlice.reducer, 
    // Reducer pour gérer l'authentification (connexion/déconnexion, token)
    auth: authReducer, 
    // Reducer pour gérer le profil utilisateur (prénom, nom)
    profile: profileReducer,
  },
  // Configuration du middleware utilisé dans Redux.
  middleware: (getDefaultMiddleware) =>
    // Ajout du middleware par défaut et concaténation avec le middleware de l'apiSlice.
    getDefaultMiddleware().concat(apiSlice.middleware), 
  // Activation des Redux DevTools pour faciliter le débogage.
  devTools: true,
})
