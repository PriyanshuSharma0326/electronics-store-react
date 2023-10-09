import React, { useContext, useEffect } from 'react';
import './navigation-menu.style.scss';

import { Link } from 'react-router-dom';
import { NavbarContext } from '../../context/navbar-context';
import { UserContext } from '../../context/user-context';

function useOutsideAlerter(ref) {
    const { setMenu } = useContext(NavbarContext);

    useEffect(() => {
        function handleClickOutside(event) {
            if (ref.current && !ref.current.contains(event.target)) {
                setMenu(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [ref]);
}

function NavigationMenu() {
    const { setMenu, wrapperRef } = useContext(NavbarContext);

    const { userDoc } = useContext(UserContext);

    useOutsideAlerter(wrapperRef);

    const hideMenu = () => {
        setMenu(false);
    }

    return (
        <div className="nav-menu" ref={wrapperRef}>
            <div className="nav-menu-links">
                <Link 
                    to='/products' 
                    className='nav-menu-link' 
                    onClick={hideMenu} 
                    >
                    Products
                </Link>
                <Link 
                    to='/account' 
                    className='nav-menu-link' 
                    onClick={hideMenu} 
                    >
                    Account
                </Link>
                {userDoc?.admin && 
                    <Link 
                        to='/dashboard' 
                        className='nav-menu-link' 
                        onClick={hideMenu} 
                        >
                        Dashboard
                    </Link>
                }
                <Link 
                    to='/cart' 
                    className='nav-menu-link' 
                    onClick={hideMenu} 
                    >
                    Cart
                </Link>
            </div>
        </div>
    );
}

export default NavigationMenu;
