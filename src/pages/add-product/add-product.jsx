import React, { useState } from 'react';
import './add-product.style.scss';
import { addProductToCollection } from '../../lib/utils/firebase.utils';
import { FormInput, Button } from '../../constants/index';
import categories from '../../constants/categories';
import { useNavigate } from 'react-router-dom';
import AddPhotoAlternateTwoToneIcon from '@mui/icons-material/AddPhotoAlternateTwoTone';
import { PulseLoader } from 'react-spinners';

function AddProduct() {
    const navigate = useNavigate();

    const [isOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const defaultFormFields = {
        productName: '',
        productPrice: '',
        productDescription: '',
        category: ''
    };

    const defaultFormErrors = {
        productName: '',
        productPrice: '',
        productDescription: '',
        category: '',
        image: ''
    };

    const [formInputs, setFormInputs] = useState(defaultFormFields);

    const [formErrors, setFormErrors] = useState(defaultFormErrors);

    const changeHandler = (e) => {
        const { name, value } = e.target;
        setFormInputs({...formInputs, [name]: value});
    }

    const handleOptionClick = (item) => {
        setFormInputs({ ...formInputs, category: item.category });
        setIsOpen(false);
    }

    const submitHandler = async (e) => {
        e.preventDefault();

        const image = e.target[3].files[0];

        const validationErrors = {};

        if(!formInputs.productName.trim()) {
            validationErrors.productName = 'Product name is required';
        }

        if(!formInputs.productPrice.trim()) {
            validationErrors.productPrice = 'Product price is required';
        }

        if(!formInputs.productDescription.trim()) {
            validationErrors.productDescription = 'Product description is required';
        }

        if(!formInputs.category.trim()) {
            validationErrors.category = 'Category is required';
        }

        if(image === null || image === undefined) {
            validationErrors.image = '*No file selected';
        }
        else if(image.size > 1000000) {
            validationErrors.image = '*Please select a file less than 1MB';
        }

        if(Object.keys(validationErrors).length > 0) {
            setFormErrors(validationErrors);
            return;
        }

        if(Object.keys(validationErrors).length === 0) {
            setFormErrors(defaultFormErrors);
            setIsLoading(true);
            try {
                await addProductToCollection({ ...formInputs, image});
            }
            catch(err) {
                alert("Can't add product to collection!");
            }
        }

        setIsLoading(false);
        navigate('/dashboard')
    }

    return (
        <div className="add-product-page-container">
            <div className='product-form-container'>
                <h2>Product Form</h2>

                <form id='product-registeration-form' onSubmit={submitHandler}>
                    <FormInput 
                        labelText='Product Name' 
                        errorText={formErrors.productName} 
                        inputOptions={{
                            type: 'text',
                            id: 'productName',
                            name: 'productName',
                            onChange: changeHandler,
                            value: formInputs.productName
                        }}
                    />

                    <FormInput 
                        labelText='Product Price' 
                        errorText={formErrors.productPrice} 
                        inputOptions={{
                            type: 'number',
                            id: 'productPrice',
                            name: 'productPrice',
                            onChange: changeHandler,
                            value: formInputs.productPrice
                        }}
                    />

                    <FormInput 
                        labelText='Product Description' 
                        errorText={formErrors.productDescription} 
                        inputOptions={{
                            type: 'text',
                            id: 'productDescription',
                            name: 'productDescription',
                            onChange: changeHandler,
                            value: formInputs.productDescription
                        }}
                    />

                    <div className="form-dropdown-input">
                        <div 
                            className='dropdown-button' 
                            type='button' 
                            onClick={() => setIsOpen(!isOpen)} 
                        >{formInputs.category.length ? formInputs.category : 'Select Category'}
                        </div>
                        {isOpen && <ul className="dropdown-options">
                            {categories.map(category => (
                                <li 
                                    key={category.id} 
                                    className="dropdown-option"
                                    onClick={() => handleOptionClick(category)} 
                                >
                                    <p>{category.category}</p>
                                </li>
                            ))}
                        </ul>}
                        <span className="error">{formErrors.category}</span>
                    </div>

                    <div className="image-input-group">
                        <div className="image-input-container">
                            <label htmlFor='image'>
                                <AddPhotoAlternateTwoToneIcon />
                                <span>Add a product image</span>
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

                {isLoading ? 
                <div className="loader">
                    <PulseLoader size='6' color="#1DB954" />
                </div> : 
                <Button 
                    form='product-registeration-form' 
                    buttonText='Add product' 
                    type='submit' 
                />}
            </div>
        </div>
    )
}

export default AddProduct;
