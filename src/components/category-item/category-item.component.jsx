import React from 'react';
import './category-item.styles.scss';

function CategoryItem({ title, imageURL }) {
    return (
        <div className='category-container'>
            <img className="background-image" src={imageURL} alt={title} />

            <div className="category-body-container">
                <h2>{title}</h2>
            </div>
        </div>
    );
}

export default CategoryItem;
