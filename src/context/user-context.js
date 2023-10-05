import { createContext, useEffect, useState } from "react";
import { authStateChangeListener, getUsers } from '../lib/utils/firebase.utils';
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../lib/config/firebase";

export const UserContext = createContext({
    currentUser: null,
    setCurrentUser: () => null,
});

export const UserContextProvider = ({ children }) => {
    const [loading, setLoading] = useState(false);

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
                    setLoading(true);
                    setTimeout(() => {
                        setCurrentUser(user);
                        setLoading(false);
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
                const UserDocRef = doc(db, 'users', currentUser.uid);
    
                const unsub = onSnapshot(UserDocRef, (doc) => {
                    if(doc) {
                        setUserDoc(doc.data());
                    }
                });
    
                return unsub;
            }
    
            currentUser && getUserDoc();
            setUserDoc([]);
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
        loading
    };

    return (
        <UserContext.Provider value={ contextValue }>
            { children }
        </UserContext.Provider>
    )
}
