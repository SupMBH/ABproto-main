import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useUpdateProfileMutation } from '../_redux/profileApiSlice';
import { selectCurrentFirstName, selectCurrentLastName, setProfile } from '../_redux/profileSlice';

const UpdateProfile = ({setEditMode}) => {

    const currentFirstName = useSelector(selectCurrentFirstName)
    const currentLastName = useSelector(selectCurrentLastName)

    const [updateProfile, { isLoading }] = useUpdateProfileMutation()
    const dispatch = useDispatch()

    const nameRef = useRef()
    const errRef = useRef()
    const [firstName, setFirstName] = useState(currentFirstName)
    const [lastName, setLastName] = useState(currentLastName)
    const [errMsg, setErrMsg] = useState('')

    useEffect(() => {
        nameRef.current.focus()
    }, [])

    useEffect(() => {
        setErrMsg('')
    }, [firstName, lastName])

    const handleSubmit = async (e) => {
        e.preventDefault()

        try{
            const data = await updateProfile({
                firstName,
                lastName,
            }).unwrap()

            if (data) {
                const userData = {
                    firstName: data.body.firstName,
                    lastName: data.body.lastName,
                }
                dispatch(setProfile({ ...userData, userData }))
                setEditMode(false)
            }
        } catch(err) {
            if( firstName === '' || firstName === 0){
                setErrMsg('Please fill your first and last name')
            }
            
            errRef.current.focus()
        }
    }
    
    const firstNameInput = (e) => setFirstName(e.target.value)
    const lastNameInput = (e) => setLastName(e.target.value)

    const content = isLoading ? (
        <h2>Loading...</h2>
    ) : (
        <>
            <div className='input-group'>
                <div className='inpu-wrapper'>
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
                <div className='inpu-wrapper'>
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
                <button className='edit-button save' onClick={handleSubmit}>Save</button>
                <button className='edit-button' onClick={() => setEditMode(false)}>Cancel</button>
            </div>
            <p ref={errRef} className={errMsg ? "errMsg" : "offscreen"}>{errMsg}</p>
        </>
    )

    return content
};

export default UpdateProfile;