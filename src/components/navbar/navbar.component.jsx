import React from 'react';
import './navbar.styles.scss';
import { Outlet } from 'react-router-dom';

function Navbar() {
    return (
        <div>
            <h1>Navbar</h1>

            <Outlet />
        </div>
    )
}

export default Navbar;
