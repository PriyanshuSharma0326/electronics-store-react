import { auth, db, provider } from "../config/firebase";
import { doc, getDoc, setDoc } from 'firebase/firestore';

import { 
    signInWithPopup,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
} from 'firebase/auth';

const createUserDoc = async (user) => {
    if(!user) return;

    const userDocRef = doc(db, 'users', user.uid);

    const userSnapshot = await getDoc(userDocRef);

    if(!userSnapshot.exists()) {
        const { displayName, email } = user;
        const createdAt = new Date();

        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt
            });
        }
        catch(err) {
            console.log(err);
        }
    }

    return userDocRef;
}

const googlePopupSignIn = () => signInWithPopup(auth, provider);

const createUserEmailPasswordMethod = async (email, password) => {
    if(!email || !password) {
        return;
    }

    return createUserWithEmailAndPassword(auth, email, password);
}

const signInUserEmailPasswordMethod = async (email, password) => {
    if(!email || !password) {
        return;
    }

    return signInWithEmailAndPassword(auth, email, password);
}

const signOutUser = () => signOut(auth);

const authStateChangeListener = (callback) => {
    onAuthStateChanged(auth, callback);
}

export {
    googlePopupSignIn,
    createUserDoc,
    createUserEmailPasswordMethod,
    signInUserEmailPasswordMethod,
    signOutUser,
    authStateChangeListener,
};
