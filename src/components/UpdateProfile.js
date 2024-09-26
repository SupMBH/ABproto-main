import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useUpdateProfileMutation } from '../_redux/profileApiSlice';
import { selectCurrentFirstName, selectCurrentLastName, setProfile } from '../_redux/profileSlice';

// Composant UpdateProfile pour modifier les informations du profil utilisateur
const UpdateProfile = ({ setEditMode }) => {

    // Récupération du prénom et nom actuel dans le store Redux
    const currentFirstName = useSelector(selectCurrentFirstName)
    const currentLastName = useSelector(selectCurrentLastName)

    // Hook de mutation pour la mise à jour du profil via Redux Toolkit Query
    const [updateProfile, { isLoading }] = useUpdateProfileMutation()
    const dispatch = useDispatch()

    // Références pour accéder aux champs d'entrée et aux messages d'erreur
    const nameRef = useRef()
    const errRef = useRef()

    // États pour gérer les champs de formulaire et les messages d'erreur
    const [firstName, setFirstName] = useState(currentFirstName)
    const [lastName, setLastName] = useState(currentLastName)
    const [errMsg, setErrMsg] = useState('')

    // Mettre le focus automatiquement sur le champ prénom au montage du composant
    useEffect(() => {
        nameRef.current.focus()
    }, [])

    // Réinitialisation du message d'erreur à chaque fois que les valeurs changent
    useEffect(() => {
        setErrMsg('')
    }, [firstName, lastName])

    // Fonction pour gérer la soumission du formulaire
    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            // Envoi des nouvelles données de profil via la mutation
            const data = await updateProfile({
                firstName,
                lastName,
            }).unwrap()

            if (data) {
                // Mise à jour du store Redux avec les nouvelles informations du profil
                const userData = {
                    firstName: data.body.firstName,
                    lastName: data.body.lastName,
                }
                dispatch(setProfile({ ...userData, userData }))
                // Désactiver le mode édition une fois que les modifications sont enregistrées
                setEditMode(false)
            }
        } catch (err) {
            // Affichage d'un message d'erreur si les champs sont vides
            if (firstName === '' || firstName === 0) {
                setErrMsg('Please fill your first and last name')
            }
            // Mettre le focus sur le message d'erreur
            errRef.current.focus()
        }
    }

    // Fonctions pour mettre à jour les valeurs des champs de formulaire
    const firstNameInput = (e) => setFirstName(e.target.value)
    const lastNameInput = (e) => setLastName(e.target.value)

    // Affichage du formulaire ou d'un message de chargement si l'API est en cours de traitement
    const content = isLoading ? (
        <h2>Loading...</h2>
    ) : (
        <>
            <div className='input-group'>
                <div className='input-wrapper'>
                    <label className='sr-only' htmlFor='firstNameInput'>First name</label>
                    <input
                        ref={nameRef}
                        onChange={firstNameInput}
                        type="text"
                        id='firstNameInput'
                        value={firstName}
                        required
                    />
                </div>
                <div className='input-wrapper'>
                    <label className='sr-only' htmlFor='lastNameInput'>Last name</label>
                    <input
                        onChange={lastNameInput}
                        type="text"
                        id='lastNameInput'
                        value={lastName}
                        required
                    />
                </div>
            </div>
            <div className='editButtons'>
                {/* Boutons pour enregistrer ou annuler la modification */}
                <button className='edit-button save' onClick={handleSubmit}>Save</button>
                <button className='edit-button' onClick={() => setEditMode(false)}>Cancel</button>
            </div>
            {/* Affichage du message d'erreur si nécessaire */}
            <p ref={errRef} className={errMsg ? "errMsg" : "offscreen"}>{errMsg}</p>
        </>
    )

    return content
};

export default UpdateProfile;
