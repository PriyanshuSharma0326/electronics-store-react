import React from 'react';
import './category-preview.styles.scss';
import ProductCard from '../product-card/product-card.component';

function CategoryPreview({ title, products, sale }) {
    return (
        <div className='category-preview-container'>
            <div>
                <h1>
                    {title}
                </h1>
            </div>

            <div className='category-preview-products'>
                {products?.slice(0, 4)
                .map((product) => {
                    return (
                        <ProductCard 
                            key={product.id} 
                            product={product} 
                            discount={sale} 
                        />
                    );
                })
            }
            </div>
        </div>
    );
}

export default CategoryPreview;
