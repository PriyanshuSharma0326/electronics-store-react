import React from 'react';
import { signUserIn } from '../../constants/index';

function SignIn() {
    const signInHandler = async () => {
        const { user } = await signUserIn()
        .catch((error) => {
            alert(error.message);
        });

        console.log(user);
    }

    return (
        <div>
            <h1>Sign in here</h1>

            <button onClick={signInHandler}>Sign in with google</button>
        </div>
    );
}

export default SignIn;
