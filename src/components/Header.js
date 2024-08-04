import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/argentBankLogo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOut, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { logOut, selectCurrentToken } from '../_redux/authSlice';
import { selectCurrentFirstName, unsetProfile } from '../_redux/profileSlice';

const Header = () => {
    const [loggedIn, setLoggedIn] = useState(false);
    const [profileFirstName, setProfileFirstName] = useState('');

    // retieve user firstname and the token from the store
    const firstName = useSelector(selectCurrentFirstName);
    const token = useSelector(selectCurrentToken);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (firstName) {
            setProfileFirstName(firstName);
        }
        if (token) {
            setLoggedIn(true);
        } else {
            setLoggedIn(false);
        }
    }, [firstName, token]);

    const handleLogOut = () => {
        // call the logOut function
        dispatch(logOut());
        // clear the profile
        dispatch(unsetProfile());
        setProfileFirstName('');
        setLoggedIn(false);
        // send to the welcome page
        navigate('/');
    };

    return (
        <>
            <nav className="main-nav">
                <Link to="/">
                    <img
                        className="main-nav-logo-image"
                        src={logo}
                        alt="Argent Bank Logo"
                    />
                    <h1 className="sr-only">Argent Bank</h1>
                </Link>

                {!loggedIn ? (
                    <div>
                        <Link to="/login" className="main-nav-item">
                            <FontAwesomeIcon icon={faUserCircle} className="icon-sign"></FontAwesomeIcon>
                            Sign In
                        </Link>
                    </div>
                ) : (
                    <div className="accountLog">
                        <Link to="/user" className="profileName">
                            <FontAwesomeIcon icon={faUserCircle} className="icon-sign"></FontAwesomeIcon>
                            {profileFirstName}
                        </Link>
                        <div className="logOut main-nav-item" onClick={handleLogOut}>
                            <FontAwesomeIcon icon={faSignOut} className="icon-sign"></FontAwesomeIcon>
                            Sign Out
                        </div>
                    </div>
                )}
            </nav>
        </>
    );
};

export default Header;
