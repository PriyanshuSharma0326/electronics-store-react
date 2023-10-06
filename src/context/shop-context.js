import { createContext, useContext, useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../lib/config/firebase";
import { UserContext } from "./user-context";

export const ShopContext = createContext({
    shopData: [],
});

export const ShopContextProvider = ({ children }) => {
    const { userDoc } = useContext(UserContext);

    const [shop, setShop] = useState([]);

    const [products, setProducts] = useState([]);

    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const getShop = async () => {
            const shopDocRef = collection(db, 'categories');

            const unsub = onSnapshot(shopDocRef, (doc) => {
                if(doc) {
                    const data = doc.docs.map(docSnapshot => {
                        return docSnapshot.data();
                    });

                    setShop(data);
                }
            });

            return unsub;
        }

        getShop();
        setShop([]);
    }, []);

    useEffect(() => {
        const getOrders = async () => {
            const ordersDocRef = collection(db, 'orders');

            const unsub = onSnapshot(ordersDocRef, (doc) => {
                if(doc) {
                    const data = doc.docs.map(docSnapshot => {
                        return docSnapshot.data();
                    });

                    setOrders(data);
                }
            });

            return unsub;
        }

        userDoc && getOrders();
        setOrders([]);
    }, [userDoc]);

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
        orders,
    };

    return (
        <ShopContext.Provider value={ contextValue }>
            { children }
        </ShopContext.Provider>
    )
}
