import React, { useContext } from 'react';
import './navbar.styles.scss';
import { Link } from 'react-router-dom';
import { UserContext } from '../../context/user-context';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartShopping } from '@fortawesome/free-solid-svg-icons'
import { CartContext } from '../../context/cart-context';
import CartDropdown from '../cart-dropdown/cart-dropdown.component';

function Navbar() {
    const { currentUser, userDoc } = useContext(UserContext);

    const {
        isCartOpen,
        setIsCartOpen,
        userCart
    } = useContext(CartContext);

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
                        to='/products' 
                        className='nav-link' 
                    >
                    Products
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

                {userDoc?.admin && <li>
                    <Link 
                        to='/dashboard' 
                        className='nav-link' 
                    >
                    Dashboard
                    </Link>
                </li>}

                <li>
                    <Link 
                        to='/cart' 
                        className='nav-link' 
                    >
                    Cart
                    </Link>
                </li>

                <li>
                    <div className="cart-icon-container" onClick={cartButtonHandler}>
                        <FontAwesomeIcon className='icon' icon={faCartShopping} />
                        <span>{userCart?.reduce((prev, curr) => prev + Number(curr.quantity), 0)}</span>
                    </div>
                </li>
            </ul>

            {isCartOpen && <CartDropdown />}
        </nav>
    )
}

export default Navbar;
