import React, { useContext } from 'react'
import { Directory } from '../../constants/index';
import { CategoriesContext } from '../../context/categories-context';

function Root() {
    const { shop } = useContext(CategoriesContext);

    return (
        <Directory 
            categories={shop} 
        />
    )
}

export default Root;
