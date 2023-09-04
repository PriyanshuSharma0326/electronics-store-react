import React from 'react';
import './shop.styles.scss';
import { ShopCategories } from '../../constants';
import { Route, Routes } from 'react-router-dom';
import CategoryBasedProducts from '../category-based-products/category-based-products.route';

function Shop() {
    return (
        <Routes>
            <Route 
                index 
                element={
                    <ShopCategories />
                }
            />

            <Route 
                path=':category' 
                element={<CategoryBasedProducts />}
            />
        </Routes>
    )
}

export default Shop;
