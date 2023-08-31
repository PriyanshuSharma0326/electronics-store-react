import { createContext, useState } from "react";
import shopData from '../constants/shop_data';

export const CategoriesContext = createContext({
    shopData: [],
});

export const CategoriesContextProvider = ({ children }) => {
    const [shop, setShop] = useState(shopData);

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
