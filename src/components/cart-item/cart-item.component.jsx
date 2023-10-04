import React, { useContext } from 'react';
import './cart-item.styles.scss';
import Button from '../button/button.component';

import { faBucket, faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import { decreaseQuantityOfProductInCart, deleteProductFromCart, increaseQuantityOfProductInCart } from '../../lib/utils/firebase.utils';
import { UserContext } from '../../context/user-context';

function CartItem({ item }) {
    const { currentUser } = useContext(UserContext);

    const plusButtonHandler = () => {
        increaseQuantityOfProductInCart(item, item.quantity, currentUser.uid);
    }

    const minusButtonHandler = () => {
        if(item.quantity > 1) {
            decreaseQuantityOfProductInCart(item, item.quantity, currentUser.uid);
        }
        else {
            deleteProductFromCart(item, currentUser.uid);
        }
    }

    const handleDeleteItemFromCart = () => {
        deleteProductFromCart(item, currentUser.uid);
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
                            onClick={handleDeleteItemFromCart} 
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
