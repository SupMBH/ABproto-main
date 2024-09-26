// On importe les méthodes `createApi` et `fetchBaseQuery` depuis le package Redux Toolkit Query pour définir une API et gérer les requêtes.
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react' 

// On configure la récupération des headers pour les requêtes API.
const baseQuery = fetchBaseQuery({
    // Définition de l'URL de base pour toutes les requêtes API. Ici, l'URL pointe vers l'API en local sur le port 3001.
    baseUrl: 'http://localhost:3001/api/v1', 
    // Cette option permet d'envoyer les cookies de la même origine avec chaque requête pour maintenir la session.
    credentials: 'same-origin', 

    // Cette fonction prépare les headers avant d'envoyer chaque requête. Elle permet d'ajouter le token d'authentification aux headers.
    prepareHeaders: (headers, { getState }) => { 
        // Récupération du token d'authentification depuis le state global Redux, plus précisément dans le slice `auth`.
        const token = getState().auth.token 

        // Si un token existe, on l'ajoute dans le header `Authorization` sous la forme `Bearer <token>` pour sécuriser la requête.
        if (token) {
            headers.set('Authorization', `Bearer ${token}`) 
        }

        // On définit le type de contenu des requêtes en tant que JSON, car l'API traite des données au format JSON.
        headers.set('Content-Type', 'application/json') 

        // On retourne les headers avec le token et le type de contenu configurés.
        return headers 
    }
})
// Fin de la configuration de base pour toutes les requêtes API, comprenant l'URL de base et les headers.

// On crée l'API en utilisant la méthode `createApi`.
export const apiSlice = createApi({
    // On associe la configuration de base des requêtes (baseQuery) définie ci-dessus à l'API.
    baseQuery, 

    // On crée les différents endpoints de l'API. Pour l'instant, cette section est vide, mais c'est ici qu'on définira des mutations ou des queries.
    endpoints: (builder) => ({}) 
})
// On exporte `apiSlice` pour pouvoir l'utiliser dans le projet afin de gérer les requêtes vers l'API.
