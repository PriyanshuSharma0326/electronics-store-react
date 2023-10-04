import React, { useContext } from 'react';
import './cart.styles.scss';
import { CartContext } from '../../context/cart-context';
import { CartItem, Button } from '../../constants/index';
import { clearUserCart } from '../../lib/utils/firebase.utils';
import { UserContext } from '../../context/user-context';

function Cart() {
    const { userCart } = useContext(CartContext);

    const { currentUser } = useContext(UserContext);

    const clearCart = () => {
        clearUserCart(currentUser.uid);
    }

    let total = userCart.reduce((prev, curr) => prev + Number(curr.price)*Number(curr.quantity), 0).toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    });

    return (
        <div className='cart-page-container'>
            <div className="cart-container">
                <div className="cart-container-header">
                    <h1>Shopping Cart</h1>

                    {userCart.length !== 0 && <Button 
                        buttonText='Deselect all items' 
                        buttonType='simple' 
                        onClick={clearCart} 
                    />}
                </div>

                {userCart.map((item) => {
                    return (
                        <CartItem 
                            key={item.id} 
                            item={item} 
                            id={item.id} 
                        />
                    )
                })}

                <div className="cart-subtotal">
                    <h2>Subtotal &#40;{userCart.reduce((prev, curr) => prev + Number(curr.quantity), 0)} item{userCart.length > 1 ? 's' : ''}&#41;: <span>${total}</span></h2>
                </div>
            </div>

            <div className="subtotal-container">
                <h2>Subtotal &#40;{userCart.reduce((prev, curr) => prev + Number(curr.quantity), 0)} item{userCart.length > 1 ? 's' : ''}&#41;: <span>${total}</span></h2>

                <Button 
                    buttonText='Proceed to buy' 
                    type='button' 
                />
            </div>
        </div>
    );
}

export default Cart;
