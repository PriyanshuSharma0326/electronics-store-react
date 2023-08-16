import React from 'react';
import { createUserDoc, signUserIn } from '../../lib/config/firebase';

function SignIn() {
    const signInHandler = async () => {
        const { user } = await signUserIn()
        .catch((error) => {
            alert(error.message);
        });

        const result = await createUserDoc(user);
 
        console.log(result);
    }

    return (
        <div>
            <h1>Sign in here</h1>

            <button onClick={signInHandler}>Sign in with google</button>
        </div>
    );
}

export default SignIn;
