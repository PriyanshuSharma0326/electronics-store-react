import React, { useContext } from 'react';
import './products.style.scss';
import { ShopContext } from '../../context/shop-context';
import ProductCard from '../../components/product-card/product-card.component';

function ProductsPage() {
    const { products } = useContext(ShopContext);

    return (
        <div className='products-page-container'>
            <div className="products-container">
                {products?.map((product) => {
                    return (
                        <ProductCard 
                            key={product.id} 
                            product={product} 
                        />
                    );
                })}
            </div>
        </div>
    )
}

export default ProductsPage;
