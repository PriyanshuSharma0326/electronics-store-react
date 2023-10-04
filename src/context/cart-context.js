import { createContext, useContext, useEffect, useState } from "react";
import { UserContext } from "./user-context";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../lib/config/firebase";

export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => null,
});

export const CartContextProvider = ({ children }) => {
    const [isCartOpen, setIsCartOpen] = useState(false);

    const { currentUser } = useContext(UserContext);
    const [userCart, setCart] = useState([]);

    useEffect(() => {
        const getUserCartContents = () => {
            const userCartDocRef = doc(db, 'users', currentUser.uid);

            const unsub = onSnapshot(userCartDocRef, (doc) => {
                if(doc) {
                    setCart(doc.data().cart);
                }
            });

            return unsub;
        }

        currentUser?.uid && getUserCartContents();
        setCart([]);
    }, [currentUser]);

    const contextValue = {
        isCartOpen,
        setIsCartOpen,

        userCart,
    };

    return (
        <CartContext.Provider value={ contextValue }>
            { children }
        </CartContext.Provider>
    )
}
