import React, { useContext } from 'react';
import './cart-dropdown.styles.scss';
import Button from '../button/button.component';
import { Link } from 'react-router-dom';
import CartDropdownItem from '../cart-dropdown-item/cart-dropdown-item.component';
import { CartContext } from '../../context/cart-context';

function CartDropdown() {
    const { isCartOpen, setIsCartOpen, userCart } = useContext(CartContext);

    return (
        <div className='cart-dropdown-container'>
            <div className="cart-dropdown-items">
                {userCart.map(item => {
                    return (
                        <CartDropdownItem 
                            key={item.id} 
                            {...item} 
                        />
                    )
                })}
            </div>
            
            <Link
                to='/cart' 
                className='link'
            >
                <Button 
                    buttonText='Go to cart' 
                    type='button' 
                    onClick={() => setIsCartOpen(!isCartOpen)} 
                />
            </Link>
        </div>
    )
}

export default CartDropdown;
