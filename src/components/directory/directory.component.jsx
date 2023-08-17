import React from 'react';
import './directory.styles.scss';
import CategoryItem from '../category-item/category-item.component';

function Directory({ categories }) {
    return (
        <div className="categories-container">
            {categories.map(item => {
                return (
                    <CategoryItem 
                        key={item.id} 
                        {...item} 
                    />
                );
            })}
        </div>
    );
}

export default Directory;
