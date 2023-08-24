import React from 'react'
import { signOutUser } from '../../lib/utils/firebase.util'
import { useNavigate } from 'react-router-dom';

function Account() {
    const navigate = useNavigate();

    const signOutHandler = async () => {
        await signOutUser();
        navigate('/accounts');
    }

    return (
        <div>
            <h1>Your Account Info</h1>

            <button onClick={signOutHandler}>Sign Out</button>
        </div>
    )
}

export default Account