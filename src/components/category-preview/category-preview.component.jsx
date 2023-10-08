import React from 'react';
import './category-preview.styles.scss';
import ProductCard from '../product-card/product-card.component';
import { useNavigate } from 'react-router-dom';

function CategoryPreview({ title, products }) {
    const navigate = useNavigate();

    const routeHandler = (category) => {
        let formattedCategory = category.toLowerCase().split(' ').join('-');
        navigate(`/shop/${formattedCategory}`);
    }

    return (
        <div className='category-preview-container'>
            <div className='category-title'>
                <h1 onClick={() => routeHandler(title)}>{title}</h1>
            </div>

            <div className='category-preview-products'>
                {products?.slice(0, 4)
                    .map((product) => {
                        return (
                            <ProductCard 
                                key={product.id} 
                                product={product} 
                            />
                        );
                    })
                }
            </div>
        </div>
    );
}

export default CategoryPreview;
