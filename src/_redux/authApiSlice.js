// On importe `apiSlice` qui a été créé dans le fichier apiSlice.js pour injecter de nouveaux endpoints.
import { apiSlice } from "./apiSlice";

// On crée une API pour gérer l'authentification en injectant un endpoint dans l'apiSlice existant.
export const authApiSlice = apiSlice.injectEndpoints({
    // On définit un endpoint pour gérer la connexion de l'utilisateur.
    endpoints: builder => ({
        // La mutation `login` est définie pour envoyer les informations d'identification (credentials) lors de la connexion.
        login: builder.mutation({
            // La fonction `query` retourne la configuration de la requête HTTP.
            query: (credentials) => ({
                // L'URL de l'API pour la connexion est définie ici, elle cible `/user/login`.
                url: '/user/login',
                // La méthode HTTP utilisée est POST, car on envoie des données (les informations de connexion).
                method: 'POST',
                // Le corps de la requête contient les informations d'identification fournies par l'utilisateur.
                body: { ...credentials }
            })
        })
    })
});

// On exporte la mutation `useLoginMutation` pour pouvoir l'utiliser dans d'autres composants afin de déclencher la requête de connexion.
export const {
    useLoginMutation
} = authApiSlice;
