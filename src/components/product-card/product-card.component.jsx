import React, { useContext } from 'react';
import './product-card.styles.scss';
import Button from '../button/button.component';
import { CartContext } from '../../context/cart-context';

function ProductCard({ product }) {
    const { name, imageURL, price } = product;

    const { addProductToCart } = useContext(CartContext);

    const addToCartButtonHandler = () => {
        addProductToCart(product);
    }

    return (
        <div className='product-card-container'>
            <h1>{name}</h1>

            <div className="product-image-container">
                <img src={imageURL} alt={name} />
            </div>

            <h2>Price: <span className='actual-price'>${price}</span></h2>

            <Button 
                buttonText='Add to cart' 
                type='button' 
                onClick={addToCartButtonHandler}
            />
        </div>
    )
}

export default ProductCard;
