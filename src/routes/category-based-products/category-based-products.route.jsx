import React from 'react';
import './category-based-products.styles.scss';
import { useParams } from 'react-router-dom';

function CategoryBasedProducts() {
    const { category } = useParams();

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

            Category Based Products - {category}
        </div>
    )
}

export default CategoryBasedProducts