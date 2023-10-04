import { createContext, useState } from "react";

export const DashboardContext = createContext();

export const DashboardContextProvider = ({ children }) => {
    const [isBoxOpen, setIsBoxOpen] = useState(false);
    const [selectedStat, setSelectedStat] = useState('Users');
    const [productToDelete, setProductToDelete] = useState({});

    const contextValue = {
        isBoxOpen,
        setIsBoxOpen,
        productToDelete,
        setProductToDelete,
        selectedStat,
        setSelectedStat
    };

    return (
        <DashboardContext.Provider value={ contextValue }>
            { children }
        </DashboardContext.Provider>
    )
}
