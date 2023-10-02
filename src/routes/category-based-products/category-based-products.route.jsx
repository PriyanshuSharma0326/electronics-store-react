import React, { useContext } from 'react';
import './category-based-products.styles.scss';
import { useParams } from 'react-router-dom';
import { ProductCard } from '../../constants';
import { ShopContext } from '../../context/shop-context';

function CategoryBasedProducts() {
    const { category } = useParams();

    const { shop } = useContext(ShopContext);

    const productsBasedOncategory = shop.filter(shopCategory => shopCategory.title.toLowerCase().split(' ').join('-') === category)[0].products;

    return (
        <div className='category-based-products-container'>
            {productsBasedOncategory.map(product => {
                return (
                    <ProductCard 
                        key={product.id} 
                        product={product} 
                    />
                )
            })}
        </div>
    )
}

export default CategoryBasedProducts;
