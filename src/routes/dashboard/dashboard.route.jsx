import React from 'react';
import Dashboard from '../../pages/dashboard/dashboard';
import { Route, Routes } from 'react-router-dom';
import AddProduct from '../../pages/add-product/add-product';
import UpdateProduct from '../../pages/update-product/update-product';
import { DashboardContextProvider } from '../../context/dashboard-context';

function DashboardRoute() {
    return (
        <DashboardContextProvider>
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
        </DashboardContextProvider>
    )
}

export default DashboardRoute;
