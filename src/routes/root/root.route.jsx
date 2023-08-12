import React from 'react'
import { Directory, categories } from '../../constants';


function Root() {
    return (
        <Directory 
            categories={categories}
        />
    )
}

export default Root;
