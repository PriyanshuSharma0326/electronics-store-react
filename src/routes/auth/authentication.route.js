import React from 'react';
import './authentication.styles.scss';
import { SignIn, SignUp } from '../../constants';

function AuthPage() {
    return (
        <div>
            <SignIn />

            <SignUp />
        </div>
    );
}

export default AuthPage;
