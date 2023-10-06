import React from 'react';
import './shared-layout.scss';
import { Navbar } from '../../constants/index';
import { Outlet, useLocation } from 'react-router-dom';
import Footer from '../../components/footer/footer.component';

function SharedLayout() {
    const location = useLocation();

    const excludedPaths = ['/cart', '/contact'];

    const isFooterExcluded = excludedPaths.includes(location.pathname);

    return (
        <>
            <Navbar/>

            <Outlet />

            {!isFooterExcluded && <Footer />}
        </>
    )
}

export default SharedLayout;
