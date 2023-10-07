import React from 'react';
import { Navbar } from '../../constants/index';
import { Outlet } from 'react-router-dom';

function SharedLayout() {
    return (
        <>
            <Navbar/>

            <Outlet />
        </>
    )
}

export default SharedLayout;
