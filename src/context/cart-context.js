import { createContext, useEffect, useState } from "react";

export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => null,
});

const addItem = (cartItems, item) => {
    const itemSnapshot = cartItems.find((cartItem) => cartItem.id === item.id);

    // console.log(itemSnapshot);

    if(itemSnapshot) {
        return cartItems.map((cartItem) => {
            // console.log(cartItem);
            if(cartItem.id === item.id) {
                return {...cartItem, quantity: cartItem.quantity + 1}
            }
            else {
                return cartItem;
            }
        })
    }
    else {
        return [...cartItems, {...item, quantity: 1}];
    }
};

const removeItem = (cartItems, item) => {};

const clearItem = (cartItems, item) => {
    return cartItems.filter((cartItem) => cartItem.id !== item.id);
};

export const CartContextProvider = ({ children }) => {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [cartCount, setCartCount] = useState(0);
    const [cartTotal, setCartTotal] = useState(0);

    const addProductToCart = (item) => {
        setCartItems(addItem(cartItems, item));
    }

    const removeProductFromCart = (item) => {
        setCartItems(removeItem(cartItems, item));
    }

    const clearProductFromCart = (item) => {
        setCartItems(clearItem(cartItems, item));
    }

    useEffect(() => {
        let count = cartItems.reduce((prev, curr) => prev + curr.quantity, 0);
        setCartCount(count);

        let total = cartItems.reduce((prev, curr) => prev + (curr.quantity * curr.price), 0);
        setCartTotal(total);
    }, [cartItems]);

    const contextValue = {
        isCartOpen,
        setIsCartOpen,
        cartItems,
        setCartItems,
        cartCount,
        setCartCount,
        cartTotal,
        setCartTotal,

        addProductToCart,
        removeProductFromCart,
        clearProductFromCart,
    };

    return (
        <CartContext.Provider value={ contextValue }>
            { children }
        </CartContext.Provider>
    )
}
