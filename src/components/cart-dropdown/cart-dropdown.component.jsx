import React from 'react';
import './cart-dropdown.styles.scss';
import Button from '../button/button.component';
import { Link } from 'react-router-dom';

function CartDropdown() {
    return (
        <div className='cart-dropdown-container'>
            <div className="cart-dropdown-items"></div>
            
            <Link
                to='/checkout' 
                className='link'
            >
                <Button 
                    buttonText='Go to checkout' 
                    type='button' 
                />
            </Link>
        </div>
    )
}

export default CartDropdown;
