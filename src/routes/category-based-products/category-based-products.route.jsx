import React, { useContext } from 'react';
import './category-based-products.styles.scss';
import { useParams } from 'react-router-dom';
import { CategoriesContext } from '../../context/categories-context';
import { ProductCard } from '../../constants';

function CategoryBasedProducts() {
    const { category } = useParams();

    const { shop } = useContext(CategoriesContext);

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
