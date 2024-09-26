// On importe `apiSlice` qui contient la base de la configuration pour les requêtes API.
import { apiSlice } from "./apiSlice";

// On crée ici des appels API pour récupérer et mettre à jour le profil de l'utilisateur.
export const profileApiSlice = apiSlice.injectEndpoints({
    // On définit les endpoints, c'est-à-dire les points d'accès à l'API pour exécuter les actions.
    endpoints: builder => ({
        // `getProfile` est une mutation qui permet de récupérer les informations du profil de l'utilisateur.
        getProfile: builder.mutation({
            // La requête associée à cette mutation.
            query: () => ({
                // Le point d'accès à l'API est `/user/profile`.
                url: "user/profile",
                // La méthode HTTP utilisée est POST.
                method: "POST",
                // Le corps de la requête est vide, car aucune donnée n'est envoyée pour cette requête.
                body: {},
            }),
        }),
        // `updateProfile` est une mutation qui permet de mettre à jour les informations du profil de l'utilisateur.
        updateProfile: builder.mutation({
            // La requête prend en paramètre les données utilisateur à mettre à jour.
            query: (userData) => ({
                // Le point d'accès à l'API pour la mise à jour du profil est `/user/profile`.
                url: "/user/profile",
                // La méthode HTTP utilisée est PUT, car on modifie des données existantes.
                method: "PUT",
                // Le corps de la requête contient les données utilisateur à mettre à jour.
                body: { ...userData }
            })
        })
    })
})

// On exporte les hooks pour ces mutations afin de les utiliser dans les composants.
// `useGetProfileMutation` est le hook pour récupérer les informations du profil utilisateur.
export const { useGetProfileMutation } = profileApiSlice;
// `useUpdateProfileMutation` est le hook pour mettre à jour le profil utilisateur.
export const { useUpdateProfileMutation } = profileApiSlice;
