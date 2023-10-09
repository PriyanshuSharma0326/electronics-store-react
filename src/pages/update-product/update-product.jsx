import React, { useContext, useEffect, useState } from 'react';
import './update-product.style.scss';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, FormInput } from '../../constants';
import AddPhotoAlternateTwoToneIcon from '@mui/icons-material/AddPhotoAlternateTwoTone';
import { PulseLoader } from 'react-spinners';
import { ShopContext } from '../../context/shop-context';
import { updateProductInCollection } from '../../lib/utils/firebase.utils';

function UpdateProduct() {
    const param = useParams();

    const navigate = useNavigate();

    const goToDashboard = () => {
        navigate('/dashboard');
    }

    const [formInputs, setFormInputs] = useState({
        productName: '',
        productPrice: '',
        productImageURL: '',
        productDescription: '',
        category: ''
    });

    const [defaultProductInfo, setDefaultProductInfo] = useState({
        defaultProductName: '',
        defaultProductPrice: '',
        defaultProductImageURL: '',
        defaultProductDescription: ''
    });

    const { shop } = useContext(ShopContext);

    useEffect(() => {
        try {
            let foundProduct = null;

            for (const category in shop) {
                for(const product of shop[category]?.products) {
                    if (product.id === param.productID) {
                        foundProduct = product;
                        setFormInputs({
                            productName: product.name,
                            productPrice: product.price,
                            productImageURL: product.imageURL,
                            productDescription: product.desc,
                            category: shop[category]?.title,
                        });
                        setDefaultProductInfo({
                            defaultProductName: product.name,
                            defaultProductPrice: product.price,
                            defaultProductImageURL: product.imageURL,
                            defaultProductDescription: product.desc,
                        });
                        break;
                    }
                }
                if(foundProduct) {
                    break;
                }
            }
        }
        catch(err) {
            console.log(err);
        }
    }, [])

    const [isLoading, setIsLoading] = useState(false);

    const defaultFormErrors = {
        productName: '',
        productPrice: '',
        productDescription: '',
        image: ''
    };

    const [formErrors, setFormErrors] = useState(defaultFormErrors);

    const changeHandler = (e) => {
        const { name, value } = e.target;
        setFormInputs({...formInputs, [name]: value});
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

        if(image && image.size > 1000000) {
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
                await updateProductInCollection(defaultProductInfo, formInputs, image, param.productID);
            }
            catch(err) {
                alert("Can't update product information!");
            }
        }

        setIsLoading(false);
        navigate('/dashboard');
    }

    return (
        <div className="update-product-page-container">
            <div className='product-form-container'>
                <h2>Product Form</h2>

                <div className="product-image-container">
                    <img src={formInputs.productImageURL} alt="" />
                </div>

                <form id='product-update-form' onSubmit={submitHandler}>
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

                    <div className="image-input-group">
                        <div className="image-input-container">
                            <label htmlFor='image'>
                                <AddPhotoAlternateTwoToneIcon />
                                <span>Change product image</span>
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
                <div className="buttons-container">
                    <Button 
                        buttonText='Cancel' 
                        type='button' 
                        buttonType='inverted' 
                        onClick={goToDashboard} 
                    />
                    <Button 
                        form='product-update-form' 
                        buttonText='Update' 
                        type='submit' 
                    />
                </div>}
            </div>
        </div>
    )
}

export default UpdateProduct;
