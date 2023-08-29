import React, { useContext } from 'react';
import './cart-item.styles.scss';
import Button from '../button/button.component';
import { CartContext } from '../../context/cart-context';

function CartItem({ item }) {

    const {
        addProductToCart,
        removeProductFromCart,
        clearProductFromCart, 
    } = useContext(CartContext);

    const plusButtonHandler = () => {
        addProductToCart(item);
    }

    const minusButtonHandler = () => {
        removeProductFromCart(item);
    }

    return (
        <div className='cart-product-container'>
            <div className="product-image-container">
                <img src={item.imageURL} alt={item.name} />
            </div>

            <div className="cart-product-details">
                <h2 className='name'>{item.name}</h2>

                <h2 className='price'>${item.price}</h2>

                <h2 className='more-options'>
                    <Button 
                        buttonText='Delete' 
                        buttonType='simple' 
                        onClick={clearProductFromCart} 
                    />
                </h2>
            </div>

            <div className="product-quantity-selection">
                <Button 
                    buttonText='Plus' 
                    buttonType='simple' 
                    onClick={plusButtonHandler} 
                />
                <h2>{item.quantity}</h2>
                <Button 
                    buttonText='Minus' 
                    buttonType='simple' 
                    onClick={minusButtonHandler} 
                />
            </div>
        </div>
    )
}

export default CartItem;
