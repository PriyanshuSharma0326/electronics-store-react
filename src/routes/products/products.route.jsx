import React from 'react'
import { Route, Routes } from 'react-router-dom';
import ProductsPage from '../../pages/products/products';
import Footer from '../../components/footer/footer.component';
import ProductInfo from '../../pages/product-info/product-info';

function ProductsRoute() {
    return (
        <>
            <Routes>
                <Route 
                    index 
                    element={
                        <ProductsPage />
                    }
                />

                <Route 
                    path=':productID' 
                    element={<ProductInfo />} 
                />
            </Routes>

            <Footer />
        </>
    )
}

export default ProductsRoute;
