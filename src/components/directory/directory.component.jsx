import React from 'react';
import './directory.styles.scss';
import CategoryItem from '../category-item/category-item.component';
import Banner from '../banner/banner.component';

function Directory({ categories }) {
    return (
        <div className="categories-page-container">
            <Banner />

            <h1 className="page-title">Categories</h1>

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
        </div>
    );
}

export default Directory;
