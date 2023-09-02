import React from 'react';
import './shop.styles.scss';
import { ShopCategories } from '../../constants';
import { Route, Routes } from 'react-router-dom';
import CategoryBasedProducts from '../category-based-products/category-based-products.route';

function Shop() {
    return (
        // <div className='products-container'>
        //     {shop.map((shopCategory) => {
        //         return (
        //             <CategoryPreview 
        //                 key={shopCategory.id} 
        //                 title={shopCategory.title} 
        //                 products={shopCategory.products} 
        //                 sale={shopCategory.saleAmount} 
        //             />
        //         )
        //     })}
        // </div>

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
