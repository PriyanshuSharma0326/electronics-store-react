import { initializeApp } from "firebase/app";
import { 
    GoogleAuthProvider,
    getAuth,
    signInWithPopup,
} from 'firebase/auth';

import {
    getFirestore,
    doc,
    getDoc,
    setDoc,
} from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyCHACtIVBKPI40JqmcipbLqfjRxOp2QoFo",
    authDomain: "electronics-store-react.firebaseapp.com",
    projectId: "electronics-store-react",
    storageBucket: "electronics-store-react.appspot.com",
    messagingSenderId: "587843776938",
    appId: "1:587843776938:web:8fad0a98d9fd55e50e7bd3"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const provider = new GoogleAuthProvider();

const db = getFirestore(app);

const signUserIn = () => signInWithPopup(auth, provider);

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

export {
    auth,
    provider,
    signUserIn,
    db,
    createUserDoc,
};
