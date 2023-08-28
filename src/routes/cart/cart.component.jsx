import React, { useContext } from 'react';
import './cart.styles.scss';
import { CartContext } from '../../context/cart-context';
import { CartItem, Button } from '../../constants/index';

function Cart() {
    const { cartItems, cartCount, cartTotal } = useContext(CartContext);

    return (
        <div className='cart-page-container'>
            <div className="cart-container">
                <h1>Shopping Cart</h1>

                {cartItems.map((item) => {
                    return (
                        <CartItem 
                            key={item.id} 
                            item={item} 
                        />
                    )
                })}

                <div className="cart-subtotal">
                    <h2>Subtotal &#40;{cartCount} item{cartCount > 1 ? 's' : ''}&#41;: <span>${cartTotal.toFixed(2)}</span></h2>
                </div>
            </div>

            <div className="subtotal-container">
                <h2>Subtotal &#40;{cartCount} item{cartCount > 1 ? 's' : ''}&#41;: <span>${cartTotal.toFixed(2)}</span></h2>

                <Button 
                    buttonText='Proceed to buy' 
                    type='button' 
                />
            </div>
        </div>
    );
}

export default Cart;
