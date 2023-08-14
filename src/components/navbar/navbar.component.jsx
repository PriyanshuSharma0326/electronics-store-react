import React from 'react';
import './navbar.styles.scss';
import { Link } from 'react-router-dom';

function Navbar() {
    return (
        <nav className='navbar'>
            <img className='nav-logo' src="https://pbs.twimg.com/profile_images/1052173628140212225/6NW8tCxY_400x400.png" alt="Logo" />
            <h1 className='nav-title'>G-Electronics</h1>

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

                <li>
                    <Link 
                        to='/signin' 
                        className='nav-link' 
                    >
                    Signin
                    </Link>
                </li>

                <li>
                    <Link 
                        to='/cart' 
                        className='nav-link' 
                    >
                    Cart
                    </Link>
                </li>
            </ul>
        </nav>
    )
}

export default Navbar;
