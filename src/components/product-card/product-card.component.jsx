import React from 'react';
import './product-card.styles.scss';
import Button from '../button/button.component';

function ProductCard({ name, imageURL, price }) {
    return (
        <div className='product-card-container'>
            <h1>{name}</h1>

            <div className="product-image-container">
                <img src={imageURL} alt={name} />
            </div>

            <h2>Effective Price: <span>${price}</span></h2>

            <Button 
                buttonText='Add to cart' 
                type='button' 
            />
        </div>
    )
}

export default ProductCard;
