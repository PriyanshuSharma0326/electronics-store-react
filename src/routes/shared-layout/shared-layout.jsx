import React from 'react';
import './shared-layout.scss';
import { Navbar } from '../../constants/index';
import { Outlet } from 'react-router-dom';

function SharedLayout() {
    return (
        <div>
            <Navbar/>

            <Outlet />

            {/* Footer */}
        </div>
    )
}

export default SharedLayout;
