import React, { useContext } from 'react';
import './shop.styles.scss';
import { ProductsContext } from '../../context/products-context';
import { ProductCard } from '../../constants';

function Shop() {
    const { products } = useContext(ProductsContext);

    return (
        <div className='products-container'>
            {products.map((product) => {
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

export default Shop;
