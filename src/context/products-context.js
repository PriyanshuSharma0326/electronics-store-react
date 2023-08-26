import { createContext, useState } from "react";
import { productsList } from '../constants/index';

export const ProductsContext = createContext({
    products: [],
});

export const ProductsContextProvider = ({ children }) => {
    const [products, setProducts] = useState(productsList);

    const contextValue = {
        products,
        setProducts
    };

    return (
        <ProductsContext.Provider value={ contextValue }>
            { children }
        </ProductsContext.Provider>
    )
}
