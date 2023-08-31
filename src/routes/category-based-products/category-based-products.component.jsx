import React from 'react';
import './category-based-products.styles.scss';

function CategoryBasedProducts() {
    return (
        <div className='category-based-products-container'>
            {/* {shop.map((shopCategory) => {
                return (
                    <CategoryPreview 
                        key={shopCategory.id} 
                        title={shopCategory.title} 
                        products={shopCategory.products} 
                        sale={shopCategory.saleAmount} 
                    />
                )
            } */}

            Category Based Products
        </div>
    )
}

export default CategoryBasedProducts