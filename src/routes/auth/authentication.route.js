import React, { useContext } from 'react';
import './authentication.styles.scss';
import { Outlet, useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/user-context';

function AuthPage() {
    const { currentUser } = useContext(UserContext);

    const navigate = useNavigate();

    if(currentUser) {
        navigate('/shop');
    }

    return (
        <div className='auth-page-container'>
            <Outlet />
        </div>
    );
}

export default AuthPage;
