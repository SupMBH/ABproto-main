import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectCurrentFirstName, selectCurrentLastName } from '../_redux/profileSlice';
import UpdateProfile from './UpdateProfile';


const ProfileHeader = () => {

    const[editMode, setEditMode] = useState(false)
    const userFirstName = useSelector(selectCurrentFirstName)
    const userLastName = useSelector(selectCurrentLastName)

    return (
        <>
            <h1 className='accountHeader'>
                Welcome back
                {!editMode ? (
                    <div className='userName'>{userFirstName} {userLastName}!</div>
                ) : (
                    ""
                )}
            </h1>
            
            {!editMode ? (
                <button onClick={() => setEditMode(!editMode)} className="edit-button">Edit Name</button>
            ) : (
                ""
            )}

            {editMode ? <UpdateProfile setEditMode={setEditMode} /> : ""}
        </>
    );
};

export default ProfileHeader;