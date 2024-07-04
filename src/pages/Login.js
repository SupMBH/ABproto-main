import React from 'react';


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import Form from '../components/Form';


const Login = () => {
    return (
        <>
            <main className="main bg-dark login">
                <section className="sign-in-content">
                    <FontAwesomeIcon icon={faUserCircle} className="sign-in-icon"></FontAwesomeIcon>
                    <h1>Sign In</h1>
                    <Form/>
                </section>
            </main> 
        </>
    );
};

export default Login;