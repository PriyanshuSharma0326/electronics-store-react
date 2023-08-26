import { createContext, useState } from "react";

export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => null,
});

export const CartContextProvider = ({ children }) => {
    const [isCartOpen, setIsCartOpen] = useState(true);

    const contextValue = {
        isCartOpen,
        setIsCartOpen
    };

    return (
        <CartContext.Provider value={ contextValue }>
            { children }
        </CartContext.Provider>
    )
}
