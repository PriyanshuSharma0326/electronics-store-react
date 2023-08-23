import React, { useState } from 'react';
import './signup.styles.scss';
import { createUserDoc, createUserEmailPasswordMethod } from '../../lib/config/firebase';
import FormInput from '../form-input/form-input.component';
import Button from '../button/button.component';

function SignUp() {
    const defaultFormFields = {
        displayName: '',
        email: '',
        password: '',
        confirmPassword: ''
    };

    const [formInputs, setFormInputs] = useState(defaultFormFields);

    const changeHandler = (e) => {
        const { name, value } = e.target;
        setFormInputs({...formInputs, [name]: value});
    }

    const submitHandler = async (e) => {
        e.preventDefault();

        // Validation ->

        // UserName Length
        // Email Format
        // Passwords Match
        // Email Existence

        if(formInputs.displayName && formInputs.email && formInputs.password && formInputs.confirmPassword) {
            if(formInputs.password === formInputs.confirmPassword) {
                try {
                    const { user } = await createUserEmailPasswordMethod(formInputs.email, formInputs.password);

                    const result = await createUserDoc({...user, displayName: formInputs.displayName});

                    setFormInputs(defaultFormFields);
                }
                catch(err) {
                    if(err.code === 'auth/invalid-email') {
                        alert('Invalid email format!');
                        return;
                    }
                    else if(err.code === 'auth/email-already-in-use') {
                        alert('Email already exists!');
                        return;
                    }
                    else {
                        console.log('Error while creating user', err.message);
                    }
                }
            }
            else {
                alert('Passwords do not match!');
                return;
            }
        }
        else {
            alert('All form fields are mandatory!');
            return;
        }
    }

    return (
        <>
            <h1>Sign Up with Email and Password</h1>

            <form onSubmit={submitHandler}>
                <FormInput 
                    labelText='Display Name' 
                    inputOptions={{
                        type: 'text',
                        required: true,
                        id: 'displayName',
                        name: 'displayName',
                        onChange: changeHandler,
                        value: formInputs.displayName
                    }}
                />

                <FormInput 
                    labelText='Email' 
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
                    inputOptions={{
                        type: 'password',
                        required: true,
                        id: 'password',
                        name: 'password',
                        onChange: changeHandler,
                        value: formInputs.password
                    }}
                />

                <FormInput 
                    labelText='Confirm Password' 
                    inputOptions={{
                        type: 'password',
                        required: true,
                        id: 'confirmPassword',
                        name: 'confirmPassword',
                        onChange: changeHandler,
                        value: formInputs.confirmPassword
                    }}
                />

                <Button 
                    buttonText='Sign Up' 
                    type='submit'
                />
            </form>
        </>
    )
}

export default SignUp;
