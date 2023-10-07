import React from 'react';
import { ShopCategories } from '../../constants';
import { Route, Routes } from 'react-router-dom';
import CategoryBasedProducts from '../category-based-products/category-based-products.route';
import Footer from '../../components/footer/footer.component';

function Shop() {
    return (
        <>
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

            <Footer />
        </>
    )
}

export default Shop;
