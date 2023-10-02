import React, { useContext } from 'react'
import { Directory } from '../../constants/index';
import { ShopContext } from '../../context/shop-context';

function Root() {
    const { shop } = useContext(ShopContext);

    return (
        <Directory 
            categories={shop} 
        />
    )
}

export default Root;
