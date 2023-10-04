import { createContext, useEffect, useState } from "react";
import { authStateChangeListener, getUserDocFromCollection, getUsers } from '../lib/utils/firebase.utils';

export const UserContext = createContext({
    currentUser: null,
    setCurrentUser: () => null,
});

export const UserContextProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [userList, setUserList] = useState([]);

    const [userDoc, setUserDoc] = useState({});

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

    useEffect(() => {
        try {
            const getUserList = async () => {
                const users = await getUsers();
                setUserList(users);
            }

            getUserList();
        }
        catch(err) {
            console.log(err);
        }
    }, []);

    useEffect(() => {
        try {
            const getUserDoc = async () => {
                const user = await getUserDocFromCollection(currentUser.uid);
                setUserDoc(user.data());
            }

            currentUser && getUserDoc();
        }
        catch(err) {
            console.log(err);
        }
    }, [currentUser]);

    const contextValue = {
        currentUser,
        setCurrentUser,
        userList,
        setUserList,
        userDoc,
        setUserDoc,
    };

    return (
        <UserContext.Provider value={ contextValue }>
            { children }
        </UserContext.Provider>
    )
}
