import { auth, db, provider } from "../config/firebase";
import { 
    doc,
    getDoc,
    setDoc,
    collection,
    writeBatch,
    query,
    getDocs,
} from 'firebase/firestore';

import { 
    signInWithPopup,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
} from 'firebase/auth';

// Method to Create User Doc to collections
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

// Method to Sign User In with Google Popup
const googlePopupSignIn = () => signInWithPopup(auth, provider);

// Method to Sign User Up with Email and Password
const createUserEmailPasswordMethod = async (email, password) => {
    if(!email || !password) {
        return;
    }

    return createUserWithEmailAndPassword(auth, email, password);
}

// Method to Sign User In with Email and Password
const signInUserEmailPasswordMethod = async (email, password) => {
    if(!email || !password) {
        return;
    }

    return signInWithEmailAndPassword(auth, email, password);
}

// Method to Sign User Out
const signOutUser = () => signOut(auth);

// Method to Listen to Auth State Changes
const authStateChangeListener = (callback) => {
    onAuthStateChanged(auth, callback);
}

// Method to Add Shop Data to collections
const addCollectionAndDocuments = async (collectionKey, objectsToAdd, field = 'title') => {
    const collectionRef = collection(db, collectionKey);

    const batch = writeBatch(db);

    objectsToAdd.forEach(object => {
        const docRef = doc(collectionRef, object[field]);

        batch.set(docRef, object);
    });

    await batch.commit();
}

// Method to Get Shop Data from collections
const getShopDataFromCollections = async () => {
    const collectionRef = collection(db, 'categories');

    const q = query(collectionRef);

    const querySnapshot = await getDocs(q);

    const shopData = querySnapshot.docs.map(docSnapshot => {
        return docSnapshot.data();
    });

    return shopData;
}

export {
    googlePopupSignIn,
    createUserDoc,
    createUserEmailPasswordMethod,
    signInUserEmailPasswordMethod,
    signOutUser,
    authStateChangeListener,

    addCollectionAndDocuments,
    getShopDataFromCollections,
};
