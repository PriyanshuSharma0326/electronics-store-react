import { createContext, useRef, useState } from "react";

export const NavbarContext = createContext();

export const NavbarContextProvider = ({ children }) => {
    const [menu, setMenu] = useState(false);
    const wrapperRef = useRef(null);

    const contextValue = {
        menu, setMenu, wrapperRef
    };

    return (
        <NavbarContext.Provider value={ contextValue }>
            { children }
        </NavbarContext.Provider>
    )
}
