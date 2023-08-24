import React, { useState } from 'react';
import './signin.styles.scss';
import { createUserDoc, signUserIn } from '../../lib/config/firebase';
import FormInput from '../form-input/form-input.component';
import Button from '../button/button.component';
import { useNavigate } from 'react-router-dom';

function SignIn() {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate("/accounts/register");
    };

    const defaultFormFields = {
        email: '',
        password: ''
    };

    const [formInputs, setFormInputs] = useState(defaultFormFields);

    const changeHandler = (e) => {
        const { name, value } = e.target;
        setFormInputs({...formInputs, [name]: value});
    }

    const submitHandler = async (e) => {
        e.preventDefault();

        if(formInputs.email && formInputs.password) {
            // 
        }
        else {
            alert('All form fields are mandatory!');
            return;
        }
    }

    const signInHandler = async () => {
        const { user } = await signUserIn()
        .catch((error) => {
            alert(error.message);
        });

        const result = await createUserDoc(user);
 
        console.log(result);
    }

    return (
        <div className='sign-in-container'>
            <div className='sign-in-form-container'>
                <h2>Sign In</h2>

                <form onSubmit={submitHandler}>
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
                            onClick={signInHandler} 
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
