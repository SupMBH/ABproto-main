import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ProfileHeader from '../components/ProfileHeader';
import { useGetProfileMutation } from '../_redux/profileApiSlice';
import { setProfile } from '../_redux/profileSlice';

const Profile = () => {
    const [profile, { isLoading }] = useGetProfileMutation();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            const data = await profile().unwrap();

            if (data) {
                const userData = {
                    firstName: data.body.firstName,
                    lastName: data.body.lastName,
                };
                dispatch(setProfile({ ...userData, userData }));
            }
        };

        fetchData();
    }, []);

    const handleViewTransactions = (accountName, accountAmount) => {
        navigate('/transactions', { state: { accountName, accountAmount } });
    };

    const content = isLoading ? (
        <h1>Loading...</h1>
    ) : (
        <>
            <main className="main bg-dark profile">
                <ProfileHeader />
                <h2 className="sr-only">Accounts</h2>
                <section className="account">
                    <div className="account-content-wrapper">
                        <h3 className="account-title">Argent Bank Checking (x8349)</h3>
                        <p className="account-amount">$2,082.79</p>
                        <p className="account-amount-description">Available Balance</p>
                    </div>
                    <div className="account-content-wrapper cta">
                        <button 
                            className="transaction-button" 
                            onClick={() => handleViewTransactions('Argent Bank Checking (x8349)', '$2,082.79')}
                        >
                            View transactions
                        </button>
                    </div>
                </section>
                <section className="account">
                    <div className="account-content-wrapper">
                        <h3 className="account-title">Argent Bank Savings (x6712)</h3>
                        <p className="account-amount">$10,928.42</p>
                        <p className="account-amount-description">Available Balance</p>
                    </div>
                    <div className="account-content-wrapper cta">
                        <button 
                            className="transaction-button" 
                            onClick={() => handleViewTransactions('Argent Bank Savings (x6712)', '$10,928.42')}
                        >
                            View transactions
                        </button>
                    </div>
                </section>
                <section className="account">
                    <div className="account-content-wrapper">
                        <h3 className="account-title">Argent Bank Credit Card (x8349)</h3>
                        <p className="account-amount">$184.30</p>
                        <p className="account-amount-description">Current Balance</p>
                    </div>
                    <div className="account-content-wrapper cta">
                        <button 
                            className="transaction-button" 
                            onClick={() => handleViewTransactions('Argent Bank Credit Card (x8349)', '$184.30')}
                        >
                            View transactions
                        </button>
                    </div>
                </section>
            </main>
        </>
    );

    return content;
};

export default Profile;


