// On importe `createSlice` de Redux Toolkit, qui permet de créer un slice avec un état initial, des actions, et des reducers.
import { createSlice } from "@reduxjs/toolkit";

// On crée le slice auth qui gère l'état du token d'authentification.
const authSlice = createSlice({
    // Le nom du slice est 'auth', il sera utilisé pour identifier cette portion d'état dans le store Redux.
    name: 'auth',
    // L'état initial contient un token initialisé à null.
    initialState: { token: null },
    // On définit ici les reducers, ce sont des fonctions qui modifient l'état en fonction d'une action.
    reducers: {
        // `setCredentials` est un reducer qui est appelé lorsqu'on veut stocker le token après connexion.
        setCredentials: (state, action) => {
            // On extrait le token de l'action (payload) envoyée lors de l'appel de cette fonction.
            const { token } = action.payload;
            // On modifie l'état en assignant le token reçu à l'état global.
            state.token = token;
        },
        // `logOut` est un reducer qui est appelé lorsqu'on veut se déconnecter et supprimer le token.
        logOut: (state) => {
            // On remet le token à null pour indiquer que l'utilisateur est déconnecté.
            state.token = null;
        }
    }
})

// On exporte les actions `setCredentials` et `logOut` afin qu'elles puissent être utilisées dans d'autres fichiers pour dispatcher des actions.
export const { setCredentials, logOut } = authSlice.actions;

// On exporte le reducer par défaut, qui sera utilisé pour configurer le store Redux.
export default authSlice.reducer;

// On exporte un sélecteur `selectCurrentToken` qui permet de récupérer le token actuel de l'état Redux.
export const selectCurrentToken = (state) => state.auth.token;
