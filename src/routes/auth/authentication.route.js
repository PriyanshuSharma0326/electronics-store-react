import React from 'react';
import './authentication.styles.scss';
import { Outlet } from 'react-router-dom';

function AuthPage() {
    return (
        <div className='auth-page-container'>
            <Outlet />
        </div>
    );
}

export default AuthPage;
