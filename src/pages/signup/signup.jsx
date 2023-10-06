import React, { useContext, useState } from 'react';
import './signup.styles.scss';
import { addImageToStorage, createUserEmailPasswordMethod } from '../../lib/utils/firebase.utils';
import { validateAddress, validateEmail, validatePassword, validatePhoneNumber } from '../../lib/utils/utils';
import { FormInput, Button } from '../../constants/index';
import { useNavigate } from 'react-router-dom';
import AddPhotoAlternateTwoToneIcon from '@mui/icons-material/AddPhotoAlternateTwoTone';
import { PulseLoader } from 'react-spinners';
import { UserContext } from '../../context/user-context';

function SignUp() {
    const navigate = useNavigate();

    const { loading } = useContext(UserContext);

    const handleClick = () => {
        navigate("/accounts/login");
    };

    const defaultFormFields = {
        firstName: '',
        lastName: '',
        email: '',
        address: '',
        phoneNumber: '',
        password: '',
        confirmPassword: ''
    };

    const defaultFormErrors = {
        firstName: '',
        lastName: '',
        email: '',
        address: '',
        phoneNumber: '',
        password: '',
        confirmPassword: '',
        image: ''
    };

    const [formInputs, setFormInputs] = useState(defaultFormFields);

    const [formErrors, setFormErrors] = useState(defaultFormErrors);

    const changeHandler = (e) => {
        const { name, value } = e.target;
        setFormInputs({...formInputs, [name]: value});
    }

    const submitHandler = async (e) => {
        e.preventDefault();

        const image = e.target[7].files[0];

        const validationErrors = {};

        if(!formInputs.firstName.trim()) {
            validationErrors.firstName = 'First name is required';
        }

        if(!formInputs.lastName.trim()) {
            validationErrors.lastName = 'Last name is required';
        }

        if(!formInputs.email.trim()) {
            validationErrors.email = 'Email is required';
        }
        else if(!validateEmail(formInputs.email.trim())) {
            validationErrors.email = 'Email is badly formatted';
        }

        if(!formInputs.phoneNumber.trim()) {
            validationErrors.phoneNumber = 'Phone number is required';
        }
        else if(!validatePhoneNumber(formInputs.phoneNumber.trim())) {
            validationErrors.phoneNumber = 'Invalid Phone number';
        }

        if(!formInputs.password.trim()) {
            validationErrors.password = 'Password is required';
        }
        else if(!validatePassword(formInputs.password.trim())) {
            validationErrors.password = 'Must be at least 6 or more characters';
        }

        if(!formInputs.confirmPassword.trim()) {
            validationErrors.confirmPassword = 'Password is required';
        }
        else if(formInputs.confirmPassword.trim() !== formInputs.password.trim()) {
            validationErrors.confirmPassword = 'Password doesn\'t match';
        }

        if(!formInputs.address.trim()) {
            validationErrors.address = 'Address is required';
        }
        else if(!validateAddress(formInputs.address.trim())) {
            validationErrors.address = 'Special characters not allowed';
        }

        if(!image) {
            validationErrors.image = '*Please select a profile image';
        }
        else if(image && image.size > 1000000) {
            validationErrors.image = '*Please select a file less than 1MB';
        }

        if(Object.keys(validationErrors).length > 0) {
            setFormErrors(validationErrors);
            return;
        }

        if(Object.keys(validationErrors).length === 0) {
            setFormErrors(defaultFormErrors);

            try {
                const { user } = await createUserEmailPasswordMethod(formInputs.email, formInputs.password);
                await addImageToStorage(image, formInputs, user);
            }
            catch(err) {
                if(err.code === 'auth/email-already-in-use') {
                    validationErrors.email = 'Email already in use!';
                    setFormErrors(validationErrors);
                    return;
                }
            }
        }
    }

    return (
        <div className="sign-up-container">
            <div className='sign-up-form-container'>
                <h2>Sign Up</h2>

                <form id='registeration-form' onSubmit={submitHandler}>
                    <FormInput 
                        labelText='First Name' 
                        errorText={formErrors.firstName} 
                        inputOptions={{
                            type: 'text',
                            id: 'firstName',
                            name: 'firstName',
                            onChange: changeHandler,
                            value: formInputs.firstName
                        }}
                    />

                    <FormInput 
                        labelText='Last Name' 
                        errorText={formErrors.lastName} 
                        inputOptions={{
                            type: 'text',
                            id: 'lastName',
                            name: 'lastName',
                            onChange: changeHandler,
                            value: formInputs.lastName
                        }}
                    />

                    <FormInput 
                        labelText='Email' 
                        errorText={formErrors.email} 
                        inputOptions={{
                            type: 'email',
                            id: 'email',
                            name: 'email',
                            onChange: changeHandler,
                            value: formInputs.email
                        }}
                    />

                    <FormInput 
                        labelText='Phone Number' 
                        errorText={formErrors.phoneNumber} 
                        inputOptions={{
                            type: 'number',
                            id: 'phoneNumber',
                            name: 'phoneNumber',
                            onChange: changeHandler,
                            value: formInputs.phoneNumber
                        }}
                    />

                    <FormInput 
                        labelText='Password' 
                        errorText={formErrors.password} 
                        inputOptions={{
                            type: 'password',
                            id: 'password',
                            name: 'password',
                            onChange: changeHandler,
                            value: formInputs.password
                        }}
                    />

                    <FormInput 
                        labelText='Confirm Password' 
                        errorText={formErrors.confirmPassword} 
                        inputOptions={{
                            type: 'password',
                            id: 'confirmPassword',
                            name: 'confirmPassword',
                            onChange: changeHandler,
                            value: formInputs.confirmPassword
                        }}
                    />

                    <FormInput 
                        labelText='Address' 
                        errorText={formErrors.address} 
                        inputOptions={{
                            type: 'text',
                            id: 'address',
                            name: 'address',
                            onChange: changeHandler,
                            value: formInputs.address
                        }}
                    />

                    <div className="image-input-group">
                        <div className="image-input-container">
                            <label htmlFor='image'>
                                <AddPhotoAlternateTwoToneIcon />
                                <span>Add an image</span>
                            </label>
                            <input 
                                className='image-input' 
                                type='file' 
                                id='image' 
                                name='image'
                            />
                            <span>*Max size: 1MB</span>
                        </div>
                        <span className="error">{formErrors.image}</span>
                    </div>
                </form>

                {loading ? 
                <div className="loader">
                    <PulseLoader size='6' color="#1DB954" />
                </div> : 
                <Button 
                    form='registeration-form'
                    buttonText='Sign Up' 
                    type='submit' 
                />}
            </div>

            <div className="go-to-login">
                <h2>Already have an account?
                    <span onClick={handleClick}> Sign In</span>
                </h2>
            </div>
        </div>
    )
}

export default SignUp;
