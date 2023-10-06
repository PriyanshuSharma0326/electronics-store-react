import React from 'react';
import './category-item.styles.scss';
import { useNavigate } from 'react-router-dom';

function CategoryItem({ title, imageURL, products }) {
    const navigate = useNavigate();

    const routeHandler = (category) => {
        let formattedCategory = category.toLowerCase().split(' ').join('-');
        navigate(`/shop/${formattedCategory}`);
    }

    const priceArray = products.map(item => Number(item.price))?.sort((a, b) => a - b);

    return (
        <div 
            className='category-container' 
            onClick={() => routeHandler(title)} 
        >
            <div className="background-image-container">
                <img className="background-image" src={imageURL} alt={title} />
            </div>

            <div className="category-body-container">
                <h2 className='title'>{title}</h2>

                <h2 className='amount'>Starts from <span>${priceArray[0]}</span></h2>
            </div>
        </div>
    );
}

export default CategoryItem;
