import React from 'react';
import { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../_redux/authSlice';
import { useLoginMutation } from '../_redux/authApiSlice';

// Déclaration du composant Form
const Form = () => {

    // useRef pour référencer l'élément input de l'email
    const userRef = useRef()
    
    // useState pour gérer les champs du formulaire (email, password, message d'erreur)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errMsg, setErrMsg] = useState('')

    // useNavigate permet de rediriger l'utilisateur après la soumission du formulaire
    const navigate = useNavigate()

    // useLoginMutation pour l'appel à l'API de connexion (provenant de authApiSlice)
    const [login, { isLoading }] = useLoginMutation()
    
    // useDispatch pour envoyer des actions à Redux (ici pour sauvegarder le token d'authentification)
    const dispatch = useDispatch()

    // useEffect pour focaliser automatiquement l'input du mail lors du chargement de la page
    useEffect(() => {
        userRef.current.focus()
    }, [])

    // useEffect pour réinitialiser le message d'erreur si l'utilisateur modifie l'email ou le mot de passe
    useEffect(() => {
        setErrMsg('')
    }, [email, password])

    // Fonction de soumission du formulaire
    const handleSubmit = async (e) => {
        e.preventDefault()

        try{
            // Envoie les identifiants à l'API via la mutation "login" 
            const userData = await login({email, password}).unwrap()
            
            // Récupère le token d'authentification de la réponse de l'API
            const token = userData.body.token
            if (token) {
                // Stocke le token dans Redux via l'action "setCredentials" dans authSlice
                dispatch(setCredentials({ token }))
            } 
            console.log(token)
            
            // Réinitialise les champs email et password après la connexion
            setEmail('')
            setPassword('')
            
            // Redirige l'utilisateur vers la page de profil '/user' après une connexion réussie
            navigate('/user')
        } catch (err) {
            // En cas d'erreur, affiche un message d'erreur spécifique
            setErrMsg('This account does not exist')
        }
    }

    // Fonction pour gérer la saisie de l'email
    const handleUserInput = (e) => setEmail(e.target.value)

    // Fonction pour gérer la saisie du mot de passe
    const handlePasswordInput = (e) => setPassword(e.target.value)

    // Si la requête est en cours, affiche un message de chargement, sinon affiche le formulaire
    const content = isLoading ? <h1>Loading...</h1> : (
        <section>
            {/* Affiche le message d'erreur si nécessaire */}
            <p className={errMsg ? "errmsg" : "offscreen"}>{errMsg}</p>

            {/* Formulaire de connexion */}
            <form onSubmit={handleSubmit}>
                <div className="input-wrapper">
                    <label htmlFor="username">Username</label>
                    <input 
                        type="text" 
                        id="username"
                        ref={userRef} 
                        value={email}
                        onChange={handleUserInput}
                        autoComplete="off"
                        required
                    />
                </div>
                <div className="input-wrapper">
                    <label htmlFor="password">Password</label>
                    <input 
                        type="password" 
                        id="password"
                        value={password}
                        onChange={handlePasswordInput}
                        required
                    />
                </div>

                {/* Checkbox pour se souvenir de l'utilisateur */}
                <div className="input-remember">
                    <input type="checkbox" id="remember-me" />
                    <label htmlFor="remember-me">Remember me</label>
                </div>

                {/* Bouton de soumission */}
                <button className="sign-in-button">Sign In</button>
            </form>
        </section>
    )

    return content
}

export default Form;
