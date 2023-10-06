import React, { useContext } from 'react'
import { Directory } from '../../constants/index';
import { ShopContext } from '../../context/shop-context';
import Footer from '../../components/footer/footer.component'

function Root() {
    const { shop } = useContext(ShopContext);

    return (
        <>
            <Directory 
                categories={shop} 
            />

            <Footer />
        </>
    )
}

export default Root;
