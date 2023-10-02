import React, { useContext } from 'react';
import './shop-categories.styles.scss';
import { CategoryPreview } from '../../constants';
import { ShopContext } from '../../context/shop-context';

function ShopCategories() {
    const { shop } = useContext(ShopContext);

    return (
        <div className='shop-categories-container'>
            {shop.sort((a, b) => a.id - b.id).map(shopCategory => {
                return (
                    <CategoryPreview 
                        key={shopCategory.id} 
                        title={shopCategory.title} 
                        products={shopCategory.products} 
                        sale={shopCategory.saleAmount} 
                    />
                )
            })}
        </div>
    );
}

export default ShopCategories;
