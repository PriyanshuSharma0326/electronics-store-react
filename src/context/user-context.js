import { createContext, useEffect, useState } from "react";
import { authStateChangeListener } from '../lib/utils/firebase.utils';

export const UserContext = createContext({
    currentUser: null,
    setCurrentUser: () => null,
});

export const UserContextProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(()=> {
        const unsubscribe = authStateChangeListener((user) => {
            if(user?.reloadUserInfo.providerUserInfo[0].providerId === 'password') {
                if(user?.photoURL) {
                    setCurrentUser(user);
                }
                else {
                    // setLoading(true);
                    setTimeout(() => {
                        setCurrentUser(user);
                        // setLoading(false);
                    }, 5000);
                }
            }
            else {
                setCurrentUser(user);
            }
        })

        return unsubscribe;
    }, []);

    const contextValue = {
        currentUser, setCurrentUser
    };

    return (
        <UserContext.Provider value={ contextValue }>
            { children }
        </UserContext.Provider>
    )
}
