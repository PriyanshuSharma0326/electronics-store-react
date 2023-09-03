import React from 'react';
import './category-item.styles.scss';
import { useNavigate } from 'react-router-dom';

function CategoryItem({ title, imageURL, minAmount, saleAmount }) {
    const navigate = useNavigate();

    const routeHandler = (category) => {
        let formattedCategory = category.toLowerCase().split(' ').join('-');
        navigate(`/shop/${formattedCategory}`);
    }

    return (
        <div 
            className='category-container' 
            onClick={() => routeHandler(title)} 
        >
            <img className="background-image" src={imageURL} alt={title} />

            <div className="category-body-container">
                <h2 className='title'>{title}</h2>

                <h2 className='amount'>Starts from <span>${minAmount}</span></h2>
            </div>
        </div>
    );
}

export default CategoryItem;
