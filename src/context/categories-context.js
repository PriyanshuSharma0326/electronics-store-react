import { createContext, useEffect, useState } from "react";

import { getShopDataFromCollections } from '../lib/utils/firebase.utils';

export const CategoriesContext = createContext({
    shopData: [],
});

export const CategoriesContextProvider = ({ children }) => {
    const [shop, setShop] = useState([]);

    useEffect(() => {
        const getShop = async () => {
            const shopData = await getShopDataFromCollections();
            setShop(shopData);
        }

        getShop();
    }, []);

    const contextValue = {
        shop,
        setShop
    };

    return (
        <CategoriesContext.Provider value={ contextValue }>
            { children }
        </CategoriesContext.Provider>
    )
}
