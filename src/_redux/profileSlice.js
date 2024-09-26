// Importation de createSlice depuis Redux Toolkit, qui permet de créer un slice Redux.
import { createSlice } from "@reduxjs/toolkit";

// Déclaration du slice pour le profil de l'utilisateur
// Création du profileSlice en utilisant createSlice.
// On définit le nom du slice comme "profile".
// On initialise l'état avec firstName et lastName à null.
const profileSlice = createSlice({
  name: "profile", // Nom du slice
  initialState: { firstName: null, lastName: null }, // État initial avec prénom et nom de famille
  reducers: {
    // Définition de l'action pour mettre à jour le profil
    // setProfile est une action (reducer) qui reçoit l'état actuel et une action en paramètre.
    // Elle extrait les informations du prénom et du nom depuis le payload de l'action et les
    // met à jour dans l'état.
    setProfile: (state, action) => {
      const { firstName, lastName } = action.payload; // Extraction du prénom et du nom du payload
      state.firstName = firstName; // Mise à jour du prénom dans l'état
      state.lastName = lastName; // Mise à jour du nom de famille dans l'état
    },
    // Définition de l'action pour réinitialiser le profil
    // unsetProfile est une autre action (reducer) qui réinitialise les valeurs de firstName
    // et lastName à null, effaçant ainsi les données du profil.
    unsetProfile: (state) => {
      state.firstName = null; // Réinitialisation du prénom
      state.lastName = null; // Réinitialisation du nom de famille
    }
  }
});

// Exportation des actions pour qu'elles puissent être dispatchées dans l'application.
// Les actions setProfile et unsetProfile sont exportées.
export const { setProfile, unsetProfile } = profileSlice.actions;

// Exportation du reducer pour l'intégrer dans le store Redux.
export default profileSlice.reducer;

// Création de deux sélecteurs pour récupérer les valeurs actuelles de firstName et lastName
// depuis l'état global de l'application. Ces sélecteurs permettent de lire l'état.
export const selectCurrentFirstName = (state) => state.profile.firstName; // Sélecteur pour firstName
export const selectCurrentLastName = (state) => state.profile.lastName; // Sélecteur pour lastName