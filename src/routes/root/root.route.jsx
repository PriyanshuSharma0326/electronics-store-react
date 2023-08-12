import React from 'react'
import { Directory, categories } from '../../constants/index';


function Root() {
    return (
        <Directory 
            categories={categories}
        />
    )
}

export default Root;
