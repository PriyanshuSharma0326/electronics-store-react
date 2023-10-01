import React, { useState } from 'react';
import './signin.styles.scss';
import { createUserDoc, googlePopupSignIn, signInUserEmailPasswordMethod } from '../../lib/utils/firebase.utils';
import FormInput from '../form-input/form-input.component';
import Button from '../button/button.component';
import { useNavigate } from 'react-router-dom';
import { validateEmail } from '../../lib/utils/utils';

function SignIn() {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate("/accounts/register");
    };

    const defaultFormFields = {
        email: '',
        password: ''
    };

    const defaultFormErrors = {
        email: '',
        password: '',
    };

    const [formInputs, setFormInputs] = useState(defaultFormFields);

    const [formErrors, setFormErrors] = useState(defaultFormErrors);

    const changeHandler = (e) => {
        const { name, value } = e.target;
        setFormInputs({...formInputs, [name]: value});
    }

    const submitHandler = async (e) => {
        e.preventDefault();

        const validationErrors = {};

        if(!formInputs.email.trim()) {
            validationErrors.email = 'Email is required';
        }
        else if(!validateEmail(formInputs.email.trim())) {
            validationErrors.email = 'Email is badly formatted';
        }

        if(!formInputs.password.trim()) {
            validationErrors.password = 'Password is required';
        }

        if(Object.keys(validationErrors).length > 0) {
            setFormErrors(validationErrors);
            return;
        }

        if(Object.keys(validationErrors).length === 0) {
            try {
                await signInUserEmailPasswordMethod(formInputs.email, formInputs.password);
            }
            catch(err) {
                if(err.code === 'auth/user-not-found') {
                    validationErrors.email = 'No user found with this email';
                    setFormErrors(validationErrors);
                    return;
                }
                if(err.code === 'auth/invalid-login-credentials') {
                    validationErrors.email = 'Invalid Login Credentials';
                    validationErrors.password = 'Invalid Login Credentials';
                    setFormErrors(validationErrors);
                    return;
                }
                else if(err.code === 'auth/wrong-password') {
                    validationErrors.password = 'Incorrect password';
                    setFormErrors(validationErrors);
                    return;
                }
            }
        }
    }

    const googleSignInHandler = async () => {
        const { user } = await googlePopupSignIn()
        .catch((error) => {
            alert(error.message);
        });

        await createUserDoc(user);
    }

    return (
        <div className='sign-in-container'>
            <div className='sign-in-form-container'>
                <h2>Sign In</h2>

                <form onSubmit={submitHandler}>
                    <FormInput 
                        labelText='Email' 
                        errorText={formErrors.email} 
                        inputOptions={{
                            type: 'email',
                            required: true,
                            id: 'email',
                            name: 'email',
                            onChange: changeHandler,
                            value: formInputs.email
                        }}
                    />

                    <FormInput 
                        labelText='Password' 
                        errorText={formErrors.password} 
                        inputOptions={{
                            type: 'password',
                            required: true,
                            id: 'password',
                            name: 'password',
                            onChange: changeHandler,
                            value: formInputs.password
                        }}
                    />

                    <div className="buttons-container">
                        <Button 
                            buttonType='submit' 
                            buttonText='Sign In' 
                            onClick={submitHandler}
                        />

                        <div className='divider'>
                            <hr />
                            <span>OR</span>
                            <hr />
                        </div>

                        <Button 
                            type='button' 
                            buttonType='google' 
                            buttonText='Sign In With Google' 
                            onClick={googleSignInHandler} 
                        />
                    </div>
                </form>
            </div>

            <div className="go-to-register">
                <h2>Don't have an account? 
                    <span onClick={handleClick}> Sign Up</span>
                </h2>
            </div>
        </div>
    );
}

export default SignIn;
