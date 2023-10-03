import { auth, db, provider, storage } from "../config/firebase";

import { 
    arrayRemove,
    arrayUnion,
    collection,
    doc,
    getDoc,
    getDocs,
    query,
    setDoc,
    updateDoc,
} from 'firebase/firestore';

import { 
    signInWithPopup,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    updateProfile,
} from 'firebase/auth';

import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

import { v4 as uuidv4 } from 'uuid';

// Method to Users Info from collection
const getUsers = async () => {
    const collectionRef = collection(db, 'users');

    const q = query(collectionRef);

    const querySnapshot = await getDocs(q);

    const users = querySnapshot.docs.map(docSnapshot => {
        return docSnapshot.data();
    });

    return users;
}

// Method to Create User Doc to collections
const createUserDoc = async (user, formData, imageURL) => {
    const {
        firstName,
        lastName,
        address,
        phoneNumber,
    } = formData;

    if(!user) return;

    const userDocRef = doc(db, 'users', user.uid);

    const userSnapshot = await getDoc(userDocRef);

    if(!userSnapshot.exists()) {
        const { email, uid } = user;

        try {
            await setDoc(userDocRef, {
                uid,
                displayName: firstName + ' ' + lastName,
                email,
                photoURL: imageURL,
                address,
                phoneNumber,
                admin: false,
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

const addImageToStorage = async (file, formData, user) => {
    const {
        firstName,
        lastName,
        phoneNumber,
    } = formData;
    const { uid } = user;

    const storageRef = ref(storage, uid);

    await uploadBytesResumable(storageRef, file)
    .then(() => {
        getDownloadURL(storageRef).then(async (downloadURL) => {
            try {
                await updateProfile(user, {
                    displayName: firstName + ' ' + lastName,
                    photoURL: downloadURL,
                    phoneNumber: phoneNumber,
                });
                await createUserDoc(user, formData, downloadURL);
            }
            catch (err) {
                console.log(err);
            }
        });
    });
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

// Add Product to Collection
const addProductToCollection = async (productDoc) => {
    const { productName, productPrice, category, image } = productDoc;

    const categoriesDocRef = doc(db, 'categories', category);

    const storageRef = ref(storage, productName);

    await uploadBytesResumable(storageRef, image)
    .then(() => {
        getDownloadURL(storageRef).then(async (downloadURL) => {
            try {
                await updateDoc(categoriesDocRef, {
                    products: arrayUnion({
                        id: uuidv4(),
                        imageURL: downloadURL,
                        name: productName,
                        price: productPrice
                    })
                })
            }
            catch (err) {
                console.log(err);
            }
        });
    });
}

const updateProductInCollection = async (defaultProductInfo, productDoc, imageFile, id) => {
    const {
        productName,
        productPrice,
        productImageURL,
        category
    } = productDoc;

    const {
        defaultProductName,
        defaultProductPrice,
        defaultProductImageURL,
    } = defaultProductInfo;

    const categoriesDocRef = doc(db, 'categories', category);

    const storageRef = ref(storage, productName);

    if(imageFile) {
        await uploadBytesResumable(storageRef, imageFile)
        .then(() => {
            getDownloadURL(storageRef).then(async (downloadURL) => {
                try {
                    await updateDoc(categoriesDocRef, {
                        products: arrayRemove({
                            id: id,
                            imageURL: defaultProductImageURL,
                            name: defaultProductName,
                            price: defaultProductPrice
                        })
                    })
                    await updateDoc(categoriesDocRef, {
                        products: arrayUnion({
                            id: uuidv4(),
                            imageURL: downloadURL,
                            name: productName,
                            price: productPrice
                        })
                    })
                }
                catch (err) {
                    console.log(err);
                }
            });
        });
    }
    else {
        try {
            await updateDoc(categoriesDocRef, {
                products: arrayRemove({
                    id: id,
                    imageURL: defaultProductImageURL,
                    name: defaultProductName,
                    price: defaultProductPrice
                })
            })
            await updateDoc(categoriesDocRef, {
                products: arrayUnion({
                    id: uuidv4(),
                    imageURL: defaultProductImageURL,
                    name: productName,
                    price: productPrice
                })
            })
        }
        catch (err) {
            console.log(err);
        }
    }
}

const deleteProductFromCollection = async (productDoc) => {
    const {
        productID,
        productName,
        productPrice,
        productImageURL,
        category
    } = productDoc;

    const categoriesDocRef = doc(db, 'categories', category);

    try {
        await updateDoc(categoriesDocRef, {
            products: arrayRemove({
                id: productID,
                imageURL: productImageURL,
                name: productName,
                price: productPrice
            })
        })
    }
    catch(err) {
        console.log(err);
    }
}

export {
    getUsers,
    googlePopupSignIn,
    createUserDoc,
    createUserEmailPasswordMethod,
    signInUserEmailPasswordMethod,
    signOutUser,
    authStateChangeListener,
    getShopDataFromCollections,
    addProductToCollection,
    addImageToStorage,
    updateProductInCollection,
    deleteProductFromCollection,
}
