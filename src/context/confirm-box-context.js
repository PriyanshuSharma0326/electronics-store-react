import { createContext, useState } from "react";

export const ConfirmBoxContext = createContext();

export const ConfirmBoxContextProvider = ({ children }) => {
    const [isBoxOpen, setIsBoxOpen] = useState(false);
    const [productToDelete, setProductToDelete] = useState({});

    const contextValue = {
        isBoxOpen,
        setIsBoxOpen,
        productToDelete,
        setProductToDelete,
    };

    return (
        <ConfirmBoxContext.Provider value={ contextValue }>
            { children }
        </ConfirmBoxContext.Provider>
    )
}
