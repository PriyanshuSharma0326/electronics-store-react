import React, { useContext } from 'react';
import './navbar.styles.scss';
import { Link } from 'react-router-dom';
import { UserContext } from '../../context/user-context';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartShopping } from '@fortawesome/free-solid-svg-icons'
import { CartContext } from '../../context/cart-context';
import CartDropdown from '../cart-dropdown/cart-dropdown.component';

function Navbar() {
    const { currentUser, userList } = useContext(UserContext);

    const currentUserInfo = userList?.find(user => user?.uid === currentUser?.uid)

    const { isCartOpen, setIsCartOpen, cartCount } = useContext(CartContext);

    const cartButtonHandler = () => {
        setIsCartOpen(!isCartOpen);
    }

    return (
        <nav className='navbar'>
            <Link 
                to='/' 
                className='nav-link' 
            >
                <img className='nav-logo' src="https://purepng.com/public/uploads/large/google-stadia-logo-3cx.png" alt="Logo" />
                <h1 className='nav-title'>CircuitCart</h1>
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

                {currentUserInfo?.admin && <li>
                    <Link 
                        to='/dashboard' 
                        className='nav-link' 
                    >
                    Dashboard
                    </Link>
                </li>}

                <li>
                    <div className="cart-icon-container" onClick={cartButtonHandler}>
                        <FontAwesomeIcon className='icon' icon={faCartShopping} />
                        <span>{cartCount}</span>
                    </div>
                </li>
            </ul>

            {isCartOpen && <CartDropdown />}
        </nav>
    )
}

export default Navbar;
