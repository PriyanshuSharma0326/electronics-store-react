import React from 'react';
import './category-item.styles.scss';

function CategoryItem({ title, imageURL, amount, saleAmount }) {
    return (
        <div className='category-container'>
            <img className="background-image" src={imageURL} alt={title} />

            <div className="category-body-container">
                <h2 className='title'>{title}</h2>

                <h2 className='amount'>Starts from <span>${amount}</span></h2>

                <div className="sale">
                    <h2>Sale {saleAmount}% off</h2>
                </div>
            </div>
        </div>
    );
}

export default CategoryItem;
