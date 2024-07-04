import React from 'react';
import { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../_redux/authSlice';
import { useLoginMutation } from '../_redux/authApiSlice';

const Form = () => {

    const userRef = useRef()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errMsg, setErrMsg] = useState('')
    const navigate = useNavigate()

    const [login, { isLoading }] = useLoginMutation()
    const dispatch = useDispatch()

    useEffect(() => {
        userRef.current.focus()
    }, [])

    useEffect(() => {
        setErrMsg('')
    }, [email, password])

    const handleSubmit = async (e) => {
        e.preventDefault()

        try{
            // sending credentials as payload through the authApiSlice
            const userData = await login({email, password}).unwrap()
            
            // getting the token
            const token = userData.body.token
            if (token) {
                dispatch(setCredentials({ token }))
            } 
            console.log(token)
            setEmail('')
            setPassword('')
            navigate('/user')
        } catch (err) {
                setErrMsg('This account does not exist')
        }
    }

    const handleUserInput = (e) => setEmail(e.target.value)

    const handlePasswordInput = (e) => setPassword(e.target.value)

    const content = isLoading ? <h1>Loading...</h1> : (
        <section>
            <p className={errMsg ? "errmsg" : "offscreen"}>{errMsg}</p>
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
                <div className="input-remember">
                    <input type="checkbox" id="remember-me" />
                    <label htmlFor="remember-me">Remember me</label>
                </div>
                <button className="sign-in-button">Sign In</button>
            </form>
        </section>
    )

    return content
}

export default Form;