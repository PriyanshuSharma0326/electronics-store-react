import React from 'react';
import { Navbar } from '../../constants/index';
import { Outlet } from 'react-router-dom';
import { NavbarContextProvider } from '../../context/navbar-context';

function SharedLayout() {
    return (
        <>
            <NavbarContextProvider>
                <Navbar/>
            </NavbarContextProvider>

            <Outlet />
        </>
    )
}

export default SharedLayout;
