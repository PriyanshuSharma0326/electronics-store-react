import React, { useContext } from 'react';
import './navbar.styles.scss';
import { Link } from 'react-router-dom';
import { UserContext } from '../../context/user-context';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartShopping } from '@fortawesome/free-solid-svg-icons'
import { CartContext } from '../../context/cart-context';
import CartDropdown from '../cart-dropdown/cart-dropdown.component';

function Navbar() {
    const { currentUser } = useContext(UserContext);

    const { isCartOpen, setIsCartOpen } = useContext(CartContext);

    const cartButtonHandler = () => {
        setIsCartOpen(!isCartOpen);
    }

    return (
        <nav className='navbar'>
            <Link 
                to='/' 
                className='nav-link' 
            >
                <img className='nav-logo' src="https://pbs.twimg.com/profile_images/1052173628140212225/6NW8tCxY_400x400.png" alt="Logo" />
                <h1 className='nav-title'>G-Electronics</h1>
            </Link>

            <ul className="nav-links-container">
                <li>
                    <Link 
                        to='/shop' 
                        className='nav-link' 
                    >
                    Shop
                    </Link>
                </li>

                <li>
                    <Link 
                        to='/contact' 
                        className='nav-link' 
                    >
                    Contact
                    </Link>
                </li>

                {!currentUser ? (
                    <li>
                        <Link 
                            to='/accounts' 
                            className='nav-link' 
                        >
                        Login
                        </Link>
                    </li>) : (
                    <li>
                        <Link 
                            to='/account' 
                            className='nav-link' 
                        >
                        Account
                        </Link>
                    </li>
                )}

                <li>
                    <div className="cart-icon-container" onClick={cartButtonHandler}>
                        <FontAwesomeIcon className='icon' icon={faCartShopping} />
                        <span>0</span>
                    </div>
                </li>
            </ul>

            {isCartOpen && <CartDropdown />}
        </nav>
    )
}

export default Navbar;
