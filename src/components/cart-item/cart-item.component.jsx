import React, { useContext } from 'react';
import './cart-item.styles.scss';
import Button from '../button/button.component';
import { CartContext } from '../../context/cart-context';

import { faBucket, faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';

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

    const deleteItemFromCart = () => {
        clearProductFromCart(item);
    }

    return (
        <div className='cart-product-container'>
            <div className="cart-product-info">
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
                            onClick={deleteItemFromCart} 
                        />
                    </h2>
                </div>
            </div>

            <div className="product-quantity-selection">
                <Button 
                    buttonText='Plus' 
                    buttonType='icon' 
                    onClick={plusButtonHandler} 
                    icon={faPlus} 
                />
                <h2>{item.quantity}</h2>
                <Button 
                    buttonText='Minus' 
                    buttonType='icon' 
                    onClick={minusButtonHandler} 
                    icon={item.quantity > 1 ? faMinus : faBucket} 
                />
            </div>
        </div>
    )
}

export default CartItem;
