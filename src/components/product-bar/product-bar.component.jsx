import React from 'react';
import './product-bar.style.scss';
import Button from '../button/button.component';
import { faBucket, faPencil } from '@fortawesome/free-solid-svg-icons';

function ProductBar({ product }) {
    return (
        <div className='product-bar'>
            <div className="product-info">
                <div className="product-image-container">
                    <img src={product.imageURL} alt={product.name} />
                </div>

                <div className="product-details">
                    <h1>{product.name}</h1>
                    <h2>Price: <span>${product.price}</span></h2>
                </div>
            </div>

            <div className="buttons-container">
                <Button 
                    buttonType='icon' 
                    icon={faPencil} 
                />

                <Button 
                    buttonType='icon' 
                    icon={faBucket} 
                />
            </div>
        </div>
    )
}

export default ProductBar;
