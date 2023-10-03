import React from 'react';
import Dashboard from '../../pages/dashboard/dashboard';
import { Route, Routes } from 'react-router-dom';
import AddProduct from '../../pages/add-product/add-product';
import UpdateProduct from '../../pages/update-product/update-product';
import { ConfirmBoxContextProvider } from '../../context/confirm-box-context';

function DashboardRoute() {
    return (
        <ConfirmBoxContextProvider>
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
        </ConfirmBoxContextProvider>
    )
}

export default DashboardRoute;
