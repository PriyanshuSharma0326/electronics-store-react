import React, { useContext } from 'react';
import './cart.styles.scss';
import { CartContext } from '../../context/cart-context';
import { CartItem, Button } from '../../constants/index';

function Cart() {
    const { cartItems, cartCount, cartTotal, setCartItems } = useContext(CartContext);

    const clearCart = () => {
        setCartItems([]);
    }

    const total = (cartTotal).toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    });

    return (
        <div className='cart-page-container'>
            <div className="cart-container">
                <div className="cart-container-header">
                    <h1>Shopping Cart</h1>

                    {cartCount !== 0 && <Button 
                        buttonText='Deselect all items' 
                        buttonType='simple' 
                        onClick={clearCart} 
                    />}
                </div>

                {cartItems.map((item) => {
                    return (
                        <CartItem 
                            key={item.id} 
                            item={item} 
                            id={item.id} 
                        />
                    )
                })}

                <div className="cart-subtotal">
                    <h2>Subtotal &#40;{cartCount} item{cartCount > 1 ? 's' : ''}&#41;: <span>${total}</span></h2>
                </div>
            </div>

            <div className="subtotal-container">
                <h2>Subtotal &#40;{cartCount} item{cartCount > 1 ? 's' : ''}&#41;: <span>${total}</span></h2>

                <Button 
                    buttonText='Proceed to buy' 
                    type='button' 
                />
            </div>
        </div>
    );
}

export default Cart;
