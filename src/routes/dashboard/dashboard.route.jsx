import React from 'react';
import Dashboard from '../../pages/dashboard/dashboard';
import { Route, Routes } from 'react-router-dom';
import AddProduct from '../../pages/add-product/add-product';
import UpdateProduct from '../../pages/update-product/update-product';

function DashboardRoute() {
    return (
        <Routes>
            <Route 
                index 
                element={
                    <Dashboard />
                }
            />

            <Route 
                path='add-product' 
                element={<AddProduct />} 
            />

            <Route 
                path='update-product/:productID'
                element={<UpdateProduct />} 
            />
        </Routes>
    )
}

export default DashboardRoute;
