import { initializeApp } from "firebase/app";
import { 
    GoogleAuthProvider,
    getAuth,
    signInWithPopup,
} from 'firebase/auth';

// import {
//     getFirestore,
//     doc,
//     getDoc,
//     setDoc,
// } from 'firebase/firestore';

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

// const db = getFirestore(app);

const signUserIn = () => signInWithPopup(auth, provider);

export {
    auth,
    provider,
    signUserIn
};

// export default db;
