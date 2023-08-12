import React from 'react';

import './directory.styles.scss';
import { CategoryItem } from '../../constants';

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
