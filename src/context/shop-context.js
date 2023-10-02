import { createContext, useEffect, useState } from "react";

import { getShopDataFromCollections } from '../lib/utils/firebase.utils';

export const ShopContext = createContext({
    shopData: [],
});

export const ShopContextProvider = ({ children }) => {
    const [shop, setShop] = useState([]);

    const [products, setProducts] = useState([]);

    useEffect(() => {
        const getShop = async () => {
            const shopData = await getShopDataFromCollections();
            setShop(shopData);
        }

        getShop();
    }, []);

    useEffect(() => {
        try {
            let productsList = [];
            for (const shopItem of shop) {
                for (const product of shopItem.products) {
                    productsList.push(product);
                }
            }
            setProducts(productsList);
        }
        catch(err) {
            console.log(err);
        }
    }, [shop]);

    const contextValue = {
        shop,
        setShop,
        products,
    };

    return (
        <ShopContext.Provider value={ contextValue }>
            { children }
        </ShopContext.Provider>
    )
}
