import React from 'react';
import { signInMethod } from '../../constants/index';

function SignIn() {
    const SignInUser = () => {
        signInMethod();
    }

    return (
        <div>
            <h1>Sign in here</h1>

            <button onClick={SignInUser}>Sign in with google</button>
        </div>
    );
}

export default SignIn;
