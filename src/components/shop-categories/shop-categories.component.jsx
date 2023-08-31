import React, { useContext } from 'react';
import './shop-categories.styles.scss';
import { CategoryPreview } from '../../constants';
import { CategoriesContext } from '../../context/categories-context';

function ShopCategories() {
    const { shop } = useContext(CategoriesContext);

    return (
        <div className='shop-categories-container'>
            {shop.map(shopCategory => {
                return (<CategoryPreview 
                    title={shopCategory.title} 
                    products={shopCategory.products} 
                    sale={shopCategory.saleAmount} 
                />)
            })}
        </div>
    );
}

export default ShopCategories;
